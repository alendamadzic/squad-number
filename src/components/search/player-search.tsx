'use client';

import { useRouter } from 'next/navigation';
import type { KeyboardEvent } from 'react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import type { Player } from '@/types';
import { SearchResults } from './search-results';
import { Searchbar } from './searchbar';
import { usePlayerSearch } from './use-player-search';

export function PlayerSearch({ className }: { className?: string }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    query,
    results,
    selectedIndex,
    isOpen,
    isLoading,
    setQuery,
    handleSearch,
    navigateResults,
    getSelectedPlayer,
    closeResults,
    clearSearch,
    setSelectedIndexValue,
  } = usePlayerSearch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) {
      if (e.key === 'Enter' && query.trim()) {
        // If no results but user presses enter, try to search anyway
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        navigateResults('down');
        break;
      case 'ArrowUp':
        e.preventDefault();
        navigateResults('up');
        break;
      case 'Enter': {
        e.preventDefault();
        const selectedPlayer = getSelectedPlayer();
        if (selectedPlayer) {
          handlePlayerSelect(selectedPlayer);
        }
        break;
      }
      case 'Escape':
        closeResults();
        inputRef.current?.blur();
        break;
    }
  };

  const handlePlayerSelect = (player: Player) => {
    clearSearch();
    router.push(`/player/${player.id}`);
  };

  const handleInputFocus = () => {
    if (results.length > 0) {
      // Results will be shown automatically by the hook when results exist
    }
  };

  const handleInputBlur = () => {
    // Delay closing to allow clicks on results
    setTimeout(() => closeResults(), 150);
  };

  return (
    <div className={cn('relative', className)}>
      <Searchbar
        ref={inputRef}
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isLoading={isLoading}
      />

      {isOpen && (
        <SearchResults
          results={results}
          selectedIndex={selectedIndex}
          onPlayerSelect={handlePlayerSelect}
          onIndexChange={setSelectedIndexValue}
        />
      )}
    </div>
  );
}
