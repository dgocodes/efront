// "use client";

// import { useEffect, useState } from "react";
// import { User, Mail, Shield, Search, ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";

// export default function UsuariosPage() {
//   const [usuarios, setUsuarios] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
  
//   // Estado para o Modal de Novo Usuário
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [novoUsuario, setNovoUsuario] = useState({ userName: '', email: '', password: '', type: 'User' });

//   useEffect(() => {
//     const delayDebounce = setTimeout(() => fetchUsuarios(), 500);
//     return () => clearTimeout(delayDebounce);
//   }, [search, page]);

//   async function fetchUsuarios() {
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5080/api/users?search=${search}&page=${page}&pageSize=1`, { 
//         credentials: "include" 
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setUsuarios(data.usuarios || []);
//         setTotalPages(data.totalPages || 1);
//       }
//     } finally {
//       setLoading(false);
//     }
//   }

//   // Função para salvar novo usuário
//   async function handleCreateUser(e: React.FormEvent) {
//     e.preventDefault();
//     const response = await fetch("http://localhost:5080/api/auth/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(novoUsuario),
//     });

//     if (response.ok) {
//       setIsModalOpen(false);
//       fetchUsuarios(); // Recarrega a lista
//       setNovoUsuario({ userName: '', email: '', password: '', type: 'User' });
//     } else {
//       alert("Erro ao criar usuário");
//     }
//   }

//   return (
//     <div className="p-8 space-y-7 animate-in fade-in duration-500">
      
//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-extrabold text-slate-900">Usuários</h1>
//           <p className="text-slate-500">Administre as contas e acessos.</p>
//         </div>

//         <div className="flex items-center gap-3 w-full md:w-auto">
//           <div className="relative flex-1 md:w-80">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//             <input
//               type="text"
//               placeholder="Buscar..."
//               className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
//               value={search}
//               onChange={(e) => { setSearch(e.target.value); setPage(1); }}
//             />
//           </div>
//           <button 
//             onClick={() => setIsModalOpen(true)}
//             className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
//           >
//             + Novo
//           </button>
//         </div>
//       </div>

//       {/* TABELA */}
//       <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
//         <table className="w-full text-left">
//           <thead className="bg-slate-50 border-b border-slate-100">
//             <tr>
//               <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Usuário</th>
//               <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Acesso</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr><td colSpan={2} className="p-10 text-center"><Loader2 className="animate-spin mx-auto text-slate-300" /></td></tr>
//             ) : (
//               usuarios.map((u: any) => (
//                 <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50/50">
//                   <td className="px-6 py-4">
//                     <div className="font-bold text-slate-800">{u.userName}</div>
//                     <div className="text-sm text-slate-500">{u.email}</div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-blue-100">
//                       {u.tipo}
//                     </span>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>

//         {/* PAGINAÇÃO */}
//         <div className="p-4 flex items-center justify-between bg-slate-50/50">
//           <span className="text-sm text-slate-500">Página {page} de {totalPages}</span>
//           <div className="flex gap-2">
//             <button 
//               disabled={page === 1}
//               onClick={() => setPage(p => p - 1)}
//               className="p-2 border rounded-lg bg-white disabled:opacity-30 hover:bg-slate-100"
//             >
//               <ChevronLeft size={20} />
//             </button>
//             <button 
//               disabled={page === totalPages}
//               onClick={() => setPage(p => p + 1)}
//               className="p-2 border rounded-lg bg-white disabled:opacity-30 hover:bg-slate-100"
//             >
//               <ChevronRight size={20} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* MODAL DE NOVO USUÁRIO */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl animate-in zoom-in duration-200">
//             <div className="p-6 border-b flex justify-between items-center">
//               <h2 className="text-xl font-bold text-slate-800">Novo Usuário</h2>
//               <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X /></button>
//             </div>
//             <form onSubmit={handleCreateUser} className="p-6 space-y-4">
//               <div>
//                 <label className="text-sm font-bold text-slate-700">Nome de Usuário</label>
//                 <input required type="text" className="w-full border p-2 rounded-lg mt-1" 
//                   value={novoUsuario.userName} onChange={e => setNovoUsuario({...novoUsuario, userName: e.target.value})} />
//               </div>
//               <div>
//                 <label className="text-sm font-bold text-slate-700">E-mail</label>
//                 <input required type="email" className="w-full border p-2 rounded-lg mt-1" 
//                    value={novoUsuario.email} onChange={e => setNovoUsuario({...novoUsuario, email: e.target.value})} />
//               </div>
//               <div>
//                 <label className="text-sm font-bold text-slate-700">Senha</label>
//                 <input required type="password" className="w-full border p-2 rounded-lg mt-1" 
//                    value={novoUsuario.password} onChange={e => setNovoUsuario({...novoUsuario, password: e.target.value})} />
//               </div>
//               <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
//                 Criar Conta
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight, Loader2, X, Plus, Edit, Trash2, Mail, Shield } from "lucide-react";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Modais e Estados de Ação
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novoUsuario, setNovoUsuario] = useState({ userName: '', email: '', password: '', type: 'User' });

  useEffect(() => {
    const delayDebounce = setTimeout(() => fetchUsuarios(), 500);
    return () => clearTimeout(delayDebounce);
  }, [search, page]);

  async function fetchUsuarios() {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5080/api/users?search=${search}&page=${page}&pageSize=3`, { 
        credentials: "include" 
      });
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data.usuarios || []);
        setTotalPages(data.totalPages || 1);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    const response = await fetch("http://localhost:5080/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoUsuario),
    });
    if (response.ok) {
      setIsModalOpen(false);
      setNovoUsuario({ userName: '', email: '', password: '', type: 'User' });
      fetchUsuarios();
    }
  }

  return (
    <div className="w-full h-full space-y-6 animate-in fade-in duration-500">
      
      {/* HEADER - OCUPANDO A LARGURA TODA */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gerenciamento de Usuários</h1>
          <p className="text-slate-500 font-medium">Visualize e controle as permissões dos membros.</p>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input
              type="text"
              placeholder="Buscar por nome ou email..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
          >
            <Plus size={20} />
            <span className="hidden sm:block">Novo Usuário</span>
          </button>
        </div>
      </div>

      {/* TABELA - FULL WIDTH */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Nome do Usuário</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Email</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Nível</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan={4} className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-blue-500" size={32} /></td></tr>
              ) : usuarios.map((u: any) => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5 font-bold text-slate-800">{u.userName || "Sem Nome"}</td>
                  <td className="px-8 py-5 text-slate-500 font-medium">{u.email}</td>
                  <td className="px-8 py-5 text-center">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                      u.tipo === 'Admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {u.tipo}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                        <Edit size={18} />
                      </button>
                      <button className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINAÇÃO DE VOLTA */}
        <div className="px-8 py-5 bg-white border-t border-slate-50 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-400">
            Página <span className="text-slate-900">{page}</span> de {totalPages}
          </p>
          <div className="flex gap-2">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold disabled:opacity-30 hover:bg-slate-50 transition-all"
            >
              Anterior
            </button>
            <button 
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold disabled:opacity-30 hover:bg-slate-50 transition-all"
            >
              Próxima
            </button>
          </div>
        </div>
      </div>

      {/* MODAL DE NOVO USUÁRIO DE VOLTA */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-slate-900">Novo Cadastro</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200"><X size={20}/></button>
            </div>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <input required placeholder="Username" className="w-full p-4 bg-slate-50 border-0 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                value={novoUsuario.userName} onChange={e => setNovoUsuario({...novoUsuario, userName: e.target.value})} />
              <input required type="email" placeholder="Email" className="w-full p-4 bg-slate-50 border-0 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                value={novoUsuario.email} onChange={e => setNovoUsuario({...novoUsuario, email: e.target.value})} />
              <input required type="password" placeholder="Senha" className="w-full p-4 bg-slate-50 border-0 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                value={novoUsuario.password} onChange={e => setNovoUsuario({...novoUsuario, password: e.target.value})} />
              <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all mt-4">
                Salvar Usuário
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}