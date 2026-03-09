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
          'flex w-full cursor-pointer items-center justify-between gap-3 rounded-sm px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
          isSelected && 'bg-accent text-accent-foreground',
        )}
        onClick={() => onSelect(player)}
        onMouseEnter={onHover}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-medium truncate">{player.name}</span>
          {player.position && (
            <span className="text-xs text-muted-foreground shrink-0">{player.position}</span>
          )}
        </div>
        <span className="text-xs text-muted-foreground shrink-0 truncate max-w-[8rem]">{player.club.name}</span>
      </button>
    );
  },
);

SearchResultItem.displayName = 'SearchResultItem';
