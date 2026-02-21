// components/layout/SearchFilters.tsx
import { Facet } from "@/types/Facet";

interface SearchFiltersProps {
  facets: Facet[];
  selectedFilters: string[];
  onFilterChange: (filter: string) => void;
}

export default function SearchFilters({ facets, selectedFilters, onFilterChange }: SearchFiltersProps) {
  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block">
      <h2 className="text-lg font-bold mb-6 border-b pb-2">Filtrar por</h2>
      
      {facets?.map((facet) => (
        <div key={facet.facet} className="mb-8">
          <h3 className="text-sm font-black uppercase tracking-wider text-gray-500 mb-4">
            {facet.facet}
          </h3>
          <div className="space-y-2">
            {facet.options.map((val) => (
              <label key={val.applyLink} className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.includes(val.applyLink)}
                  onChange={() => onFilterChange(val.applyLink)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="ml-3 text-sm text-gray-600 group-hover:text-blue-600 transition-colors">
                  {val.quantity} <span className="text-gray-400 text-xs">({val.quantity})</span>
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}