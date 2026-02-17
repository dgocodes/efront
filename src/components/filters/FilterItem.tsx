'use client';

interface FilterItemProps {
  label: string;
  count: number;
  id: string;
  checked: boolean;
  onChange: () => void;
}

export default function FilterItem({ label, count, id, checked, onChange }: FilterItemProps) {
  return (
    <label className="group flex items-center justify-between cursor-pointer py-2 px-1 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center">
          <input 
            type="checkbox" 
            id={id}
            checked={checked}   // <-- Controlado pela URL
            onChange={onChange} // <-- Dispara o router.push
            className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-md checked:bg-blue-600 checked:border-blue-600 transition-all duration-200 cursor-pointer"
          />
          <svg 
            className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" 
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        
        <span className={`text-sm transition-colors ${checked ? 'text-blue-600 font-bold' : 'text-gray-600 group-hover:text-gray-900'}`}>
          {label}
        </span>
      </div>

      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${checked ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600'}`}>
        {count}
      </span>
    </label>
  );
}