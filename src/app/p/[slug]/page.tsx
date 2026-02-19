import { getProdutoBySlug } from '@/lib/api';
import ProductTabs from '@/components/product/ProductTabs';
import BrandCarousel from '@/components/brand/BrandCarousel';
import ProductInfo from '@/components/product/ProductInfo';
import ProductGallery from '@/components/product/ProductGallery';

// Importante: Defina o tipo do params como uma Promise
export default async function ProductPage(props: {
    params: Promise<{ slug: string }>
}) {
    // 1. Resolve a promise do params primeiro
    const resolvedParams = await props.params;
    const slug = resolvedParams.slug;

    if (!slug) 
        return <div>Erro: Slug não encontrado</div>;

    const produto = await getProdutoBySlug(slug);

    if (!produto) return (
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-xl font-bold">Produto não encontrado</h1>
        </div>
    );

    console.log('Produto encontrado:', produto);

    // Limpeza de dados para evitar erro de serialização (Plain Objects)
    const p = JSON.parse(JSON.stringify(produto));

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

            {/* Grid Principal: Galeria + Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

                {/* LADO ESQUERDO: Galeria de Imagens 
                    Passamos o ID principal e as fotos extras se houver */}
                <ProductGallery
                    productId={p.id}
                    alt={p.nome}
                    additionalImages={p.imagensAdicionais || []}
                />

                {/* LADO DIREITO: Informações e Compra */}
                <ProductInfo product={p} />

            </div>

            {/* Abas de Descrição / Especificações Técnicas */}
            <ProductTabs
                description={p.descricao_html || p.description}
                specs={p.especificacoes || p.specs || []}
            />

            {/* Seção de Marcas Relevantes (JSON que criamos no início) */}
            <div className="mt-20 border-t border-gray-100 pt-16">
                <BrandCarousel />
            </div>
        </main>
    );
}