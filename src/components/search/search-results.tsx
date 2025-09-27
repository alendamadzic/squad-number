import { useCallback, useRef } from 'react';
import type { Player } from '@/types';
import { SearchResultItem } from './search-result-item';

interface SearchResultsProps {
  results: Player[];
  selectedIndex: number;
  onPlayerSelect: (player: Player) => void;
  onIndexChange: (index: number) => void;
}

export function SearchResults({ results, selectedIndex, onPlayerSelect, onIndexChange }: SearchResultsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Callback ref to handle auto-scrolling when the selected item changes
  const selectedItemRef = useCallback((node: HTMLButtonElement | null) => {
    if (node && containerRef.current) {
      const container = containerRef.current;
      const itemRect = node.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Check if the selected item is outside the visible area
      const isAboveViewport = itemRect.top < containerRect.top;
      const isBelowViewport = itemRect.bottom > containerRect.bottom;

      if (isAboveViewport) {
        // Scroll up to show the selected item at the top
        node.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (isBelowViewport) {
        // Scroll down to show the selected item at the bottom
        node.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  }, []);

  if (results.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-popover p-1 shadow-md"
    >
      {results.map((player, index) => (
        <SearchResultItem
          key={player.id}
          ref={index === selectedIndex ? selectedItemRef : undefined}
          player={player}
          isSelected={index === selectedIndex}
          onSelect={onPlayerSelect}
          onHover={() => onIndexChange(index)}
        />
      ))}
    </div>
  );
}
