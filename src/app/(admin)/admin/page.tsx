import { Users, DollarSign, Package, TrendingUp, ArrowUpRight } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header com Saudação */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Visão Geral</h1>
        <p className="text-slate-500">Bem-vindo de volta ao seu centro de controle.</p>
      </div>

      {/* Cartões de Estatísticas (Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Vendas Mensais" value="R$ 45.280,00" icon={<DollarSign className="text-blue-600" />} trend="+12.5%" color="blue" />
        <StatCard title="Novos Clientes" value="1.240" icon={<Users className="text-purple-600" />} trend="+5.2%" color="purple" />
        <StatCard title="Produtos Ativos" value="482" icon={<Package className="text-orange-600" />} trend="0%" color="orange" />
        <StatCard title="Taxa de Conversão" value="3.2%" icon={<TrendingUp className="text-green-600" />} trend="+2.1%" color="green" />
      </div>

      {/* Área de Conteúdo Principal (Tabela ou Gráfico) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 text-lg">Últimos Pedidos</h3>
          <button className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1">
            Ver tudo <ArrowUpRight size={16} />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4 font-medium">ID Pedido</th>
                <th className="p-4 font-medium">Cliente</th>
                <th className="p-4 font-medium">Data</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {[1, 2, 3].map((i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <td className="p-4 font-mono text-slate-600">#1293{i}</td>
                  <td className="p-4 font-semibold text-slate-800">Cliente Exemplo {i}</td>
                  <td className="p-4 text-slate-500">20/02/2026</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Concluído</span>
                  </td>
                  <td className="p-4 text-right font-bold text-slate-900">R$ 350,00</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Subcomponente para o Cartão de Status (pode criar no mesmo arquivo ou em /components)
function StatCard({ title, value, icon, trend, color }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl bg-${color}-50`}>{icon}</div>
        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">{trend}</span>
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
      </div>
    </div>
  );
}