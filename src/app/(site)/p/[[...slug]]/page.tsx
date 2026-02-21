import { getProdutoById } from '@/lib/produtos';
import ProductTabs from '@/components/product/ProductTabs';
import BrandCarousel from '@/components/brand/BrandCarousel';
import ProductInfo from '@/components/product/ProductInfo';
import ProductGallery from '@/components/product/ProductGallery';


export default async function ProductPage(props: {
    params: Promise<{ slug: string[] }>
}) {
    // 1. Resolve a promise do params primeiro
    const resolvedParams = await props.params;
    const slugs = resolvedParams.slug || [];

    console.log('Parâmetros recebidos:', resolvedParams);
    console.log('Slugs extraídos:', slugs);
    console.log('Quantidade de slugs:', slugs.length);

    if (slugs.length > 2) 
        return <div>Erro: Slug não encontrado</div>;    

    console.log('Buscando produto com slug:', slugs);

    const produto = await getProdutoById(slugs[0]);

    if (!produto) return (
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-xl font-bold">Produto não encontrado</h1>
        </div>
    );
 
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

            {/* Grid Principal: Galeria + Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

                {/* LADO ESQUERDO: Galeria de Imagens 
                    Passamos o ID principal e as fotos extras se houver */}
                <ProductGallery
                    productId={produto.id}
                    alt={produto.nome}
                />

                {/* LADO DIREITO: Informações e Compra */}
                <ProductInfo product={produto} />

            </div>

            {/* Abas de Descrição / Especificações Técnicas */}
            <ProductTabs
                description={produto.InfAdicionais || produto.InfAdicionais}
                specs={[]}
            />

            {/* Seção de Marcas Relevantes (JSON que criamos no início) */}
            {/* <div className="mt-20 border-t border-gray-100 pt-16">
                <BrandCarousel title={produto?.marca || 'Marcas'} />
            </div> */}
        </main>
    );
}