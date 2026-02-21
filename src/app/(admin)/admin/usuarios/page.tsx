"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Loader2, X, Plus, Edit, Trash2 } from "lucide-react";
import { EUserType, RegisterUserCommand, usuarioService } from "@/lib/usuario";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novoUsuario, setNovoUsuario] = useState<RegisterUserCommand>({
    email: "",
    password: "",
    nome: "",
    erpId: "",
    tipo: EUserType.User,
  });

  // Função de busca memorizada para evitar re-renderizações infinitas
  const fetchUsuarios = useCallback(async () => {
    setLoading(true);
    try {
      const data = await usuarioService.getAll({ search, page, pageSize: 3 });
      setUsuarios(data.items || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchUsuarios();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [fetchUsuarios]);

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    try {
      await usuarioService.create(novoUsuario);
      setIsModalOpen(false);
      setNovoUsuario({
        email: "",
        password: "",
        nome: "",
        erpId: "",
        tipo: EUserType.User,
      });
      fetchUsuarios();
    } catch (error) {
      alert("Erro ao criar usuário");
    }
  }

  async function handleDeleteUser(id: string) {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;
    try {
      await usuarioService.delete(id);
      fetchUsuarios();
    } catch (error) {
      alert("Erro ao deletar usuário");
    }
  }

  return (
    <div className="w-full h-full space-y-6 animate-in fade-in duration-500 p-6">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Gerenciamento de Usuários
          </h1>
          <p className="text-slate-500 font-medium">
            Visualize e controle as permissões dos membros.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-96">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
              size={18}
            />
            <input
              type="text"
              placeholder="Buscar por nome ou email..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
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

      {/* TABELA */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  Nome do Usuário
                </th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  Email
                </th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">
                  Nível
                </th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">
                  Sessão Ativa
                </th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-20 text-center">
                    <Loader2
                      className="animate-spin mx-auto text-blue-500"
                      size={32}
                    />
                  </td>
                </tr>
              ) : usuarios.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-20 text-center text-slate-400">
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              ) : (
                usuarios.map((u: any) => (
                  <tr
                    key={u.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-8 py-5 font-bold text-slate-800">
                      {u.userName || "Sem Nome"}
                    </td>
                    <td className="px-8 py-5 text-slate-500 font-medium">
                      {u.email}
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span
                        className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                          u.type === "Admin"
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {u.type || "User"}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span
                        className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                          u.sessionActive === true ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {u.sessionActive === true ? "Ativa" : "Inativa"}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINAÇÃO */}
        <div className="px-8 py-5 bg-white border-t border-slate-50 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-400">
            Página <span className="text-slate-900">{page}</span> de{" "}
            {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold disabled:opacity-30 hover:bg-slate-50 transition-all"
            >
              Anterior
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold disabled:opacity-30 hover:bg-slate-50 transition-all"
            >
              Próxima
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-slate-900">
                Novo Cadastro
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateUser} className="space-y-4">
              {/* Campo Nome */}
              <input
                required
                placeholder="Nome Completo"
                className="w-full p-4 bg-slate-50 border-0 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                value={novoUsuario.nome}
                onChange={(e) =>
                  setNovoUsuario({ ...novoUsuario, nome: e.target.value })
                }
              />

              {/* Campo Email */}
              <input
                required
                type="email"
                placeholder="Email"
                className="w-full p-4 bg-slate-50 border-0 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                value={novoUsuario.email}
                onChange={(e) =>
                  setNovoUsuario({ ...novoUsuario, email: e.target.value })
                }
              />

              {/* Campo ERP ID (Opcional ou conforme seu Command) */}
              <input
                placeholder="ID no ERP"
                className="w-full p-4 bg-slate-50 border-0 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                value={novoUsuario.erpId}
                onChange={(e) =>
                  setNovoUsuario({ ...novoUsuario, erpId: e.target.value })
                }
              />

              {/* Dropdown de Tipo de Usuário */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">
                  Nível de Acesso
                </label>
                <select
                  className="w-full p-4 bg-slate-50 border-0 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                  value={novoUsuario.tipo}
                  onChange={(e) =>
                    setNovoUsuario({
                      ...novoUsuario,
                      tipo: Number(e.target.value),
                    })
                  }
                >
                  <option value={EUserType.User}>Usuário Comum</option>
                  <option value={EUserType.Admin}>Administrador</option>
                  {/* Adicione outros tipos se houver no seu Enum */}
                </select>
              </div>

              {/* Campo Senha */}
              <input
                required
                type="password"
                placeholder="Senha"
                className="w-full p-4 bg-slate-50 border-0 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                value={novoUsuario.password}
                onChange={(e) =>
                  setNovoUsuario({ ...novoUsuario, password: e.target.value })
                }
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all mt-4"
              >
                Salvar Usuário
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
