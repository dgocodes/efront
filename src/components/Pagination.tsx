// components/Pagination.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export default function Pagination({ totalPages, currentPage, hasNextPage, hasPreviousPage }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-10 pb-10">
      <button
        onClick={() => navigateToPage(currentPage - 1)}
        disabled={!hasPreviousPage}
        className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50"
      >
        Anterior
      </button>

      <span className="text-sm font-medium">
        Página {currentPage} de {totalPages}
      </span>

      <button
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={!hasNextPage}
        className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50"
      >
        Próxima
      </button>
    </div>
  );
}