import React from 'react';
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Twitter, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  ThumbsUp, 
  Send
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 font-sans">
      {/* --- SEÇÃO SUPERIOR: REDES SOCIAIS --- */}
      <div className="bg-[#f0f4f8] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 text-gray-500">
            <ThumbsUp size={24} className="text-gray-400" />
            <span className="font-bold text-sm uppercase tracking-wide">Conecte-se com a Reval</span>
            <div className="flex items-center gap-4 ml-4">
              <a href="#" className="hover:text-blue-600 transition-colors"><Facebook size={20} fill="currentColor" /></a>
              <a href="#" className="hover:text-blue-600 transition-colors"><MessageCircle size={20} fill="currentColor" /></a>
              <a href="#" className="hover:text-pink-600 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Twitter size={20} fill="currentColor" /></a>
              <a href="#" className="hover:text-red-600 transition-colors"><Youtube size={20} /></a>
              <a href="#" className="hover:text-red-500 transition-colors">
                <div className="font-bold text-xl italic leading-none">P</div>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[#00a5e4]">
            <div className="bg-[#25d366] p-1.5 rounded-full text-white">
              <Phone size={20} fill="currentColor" />
            </div>
            <span className="text-2xl font-black tabular-nums">0800 701 1811</span>
          </div>
        </div>
      </div>

      {/* --- SEÇÃO DO MEIO: LINKS E CONTATO --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {/* Coluna 1: Institucional */}
          <div>
            <h4 className="text-gray-900 font-black text-lg mb-6 relative">
              Institucional
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-600"></span>
            </h4>
            <ul className="space-y-2">
              {['Sobre a Empresa', 'Condições de Venda', 'SAC', 'Área do Candidato', 'Envie seu Currículo', 'Termo de Consentimento', 'Política de Privacidade', 'Relatório Transparência', 'Aviso Importante'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 hover:text-blue-600 text-[13px] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 2: Minha Conta */}
          <div>
            <h4 className="text-gray-900 font-black text-lg mb-6 relative">
              Minha Conta
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-600"></span>
            </h4>
            <ul className="space-y-2">
              {['Pedidos', 'Carrinho de Compras', 'Lista de Desejos', 'Lista de Favoritos', 'Boletos', 'Informações Bancárias', 'Download de Imagem'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 hover:text-blue-600 text-[13px] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Fale Conosco */}
          <div>
            <h4 className="text-gray-900 font-black text-lg mb-6 relative">
              Fale Conosco
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-600"></span>
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-blue-600 mt-1 shrink-0" />
                <p className="text-[13px] text-gray-500">
                  <span className="block text-gray-700 font-medium">Compre pelo telefone:</span>
                  0800 701 1811
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-blue-600 mt-1 shrink-0" />
                <p className="text-[13px] text-gray-500">
                  <span className="block text-gray-700 font-medium">Telefone:</span>
                  14 3664-9811
                </p>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle size={16} className="text-blue-600 mt-1 shrink-0" />
                <p className="text-[13px] text-gray-500">
                  <span className="block text-gray-700 font-medium">WhatsApp:</span>
                  0800 701 1811
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-blue-600 mt-1 shrink-0" />
                <p className="text-[13px] text-gray-500">
                  <span className="block text-gray-700 font-medium">Cotações e atendimento a clientes:</span>
                  cliente@reval.net
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Send size={16} className="text-blue-600 mt-1 shrink-0" />
                <p className="text-[13px] text-gray-500">
                  <span className="block text-gray-700 font-medium">Trocas, devoluções e assistências:</span>
                  sac@reval.net
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-blue-600 mt-1 shrink-0" />
                <p className="text-[13px] text-gray-500">
                  <span className="block text-gray-700 font-medium">Atendimento:</span>
                  segunda a sexta-feira, das 08h às 18h30
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- RODAPÉ FINAL --- */}
      {/* bg-white border-t border-gray-200 py-10 */}
      <div className="border-t border-gray-100 py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center lg:text-left">
          <p className="text-[11px] text-gray-400 leading-relaxed uppercase tracking-tighter">
            © {new Date().getFullYear()} Ecommerce - Todos os direitos reservados. 
            Proibida reprodução total ou parcial sem autorização prévia.
          </p>
        </div>
      </div>
    </footer>
  );
}