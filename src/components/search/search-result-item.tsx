import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { Player } from '@/types';

interface SearchResultItemProps {
  player: Player;
  isSelected: boolean;
  onSelect: (player: Player) => void;
  onHover: () => void;
}

export const SearchResultItem = forwardRef<HTMLButtonElement, SearchResultItemProps>(
  ({ player, isSelected, onSelect, onHover }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'flex w-full cursor-pointer items-center gap-3 rounded-sm px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
          isSelected && 'bg-accent text-accent-foreground',
        )}
        onClick={() => onSelect(player)}
        onMouseEnter={onHover}
      >
        <div className="font-medium">{player.name}</div>
        <div className="text-xs text-muted-foreground">{player.club.name}</div>
      </button>
    );
  },
);
