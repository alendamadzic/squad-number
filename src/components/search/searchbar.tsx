import { SearchIcon } from 'lucide-react';
import type { KeyboardEvent } from 'react';
import { forwardRef } from 'react';
import { Input } from '@/components/ui/input';

interface SearchbarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  isLoading: boolean;
  placeholder?: string;
}

export const Searchbar = forwardRef<HTMLInputElement, SearchbarProps>(
  ({ value, onChange, onKeyDown, onFocus, onBlur, isLoading, placeholder }, ref) => {
    return (
      <div className="relative">
        <Input
          ref={ref}
          type="search"
          placeholder={placeholder || "Enter a player's name..."}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          className="peer ps-9 pe-9"
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>
        {isLoading && (
          <div className="absolute inset-y-0 end-0 flex items-center pr-3">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground"></div>
          </div>
        )}
      </div>
    );
  },
);
