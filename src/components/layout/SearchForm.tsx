"use client";

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchForm({ isMobile = false, closeMenu = () => {} }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

    useEffect(() => {
        setSearchTerm(searchParams.get('q') || '');
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (searchTerm.trim()) params.set('q', searchTerm.trim());
        else params.delete('q');
        params.set('page', '1'); 
        router.push(`/b?${params.toString()}`);
        closeMenu();
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar..."
                className="w-full bg-gray-100 rounded-full py-2 px-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </form>
    );
}