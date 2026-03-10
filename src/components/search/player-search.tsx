'use client';

import { useRouter } from 'next/navigation';
import type { KeyboardEvent } from 'react';
import { useEffect, useRef, useTransition } from 'react';
import { cn } from '@/lib/utils';
import type { Player } from '@/types';
import { SearchResults } from './search-results';
import { Searchbar } from './searchbar';
import { usePlayerSearch } from './use-player-search';

export function PlayerSearch({ className }: { className?: string }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  const {
    query,
    results,
    selectedIndex,
    isOpen,
    isLoading,
    setQuery,
    navigateResults,
    getSelectedPlayer,
    closeResults,
    clearSearch,
    setSelectedIndexValue,
  } = usePlayerSearch();

  // Press "/" anywhere to focus the search input
  useEffect(() => {
    const handleGlobalKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === '/' && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleGlobalKey);
    return () => document.removeEventListener('keydown', handleGlobalKey);
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || !results.length) {
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
        const selected = getSelectedPlayer();
        if (selected) handlePlayerSelect(selected);
        break;
      }
      case 'Escape':
        closeResults();
        inputRef.current?.blur();
        break;
    }
  };

  // Prefetch all visible results as soon as the dropdown opens
  useEffect(() => {
    if (isOpen && results.length > 0) {
      for (const player of results) {
        router.prefetch(`/player/${player.id}`);
      }
    }
  }, [results, isOpen, router]);

  const handlePlayerSelect = (player: Player) => {
    clearSearch();
    startTransition(() => {
      router.push(`/player/${player.id}`);
    });
  };

  return (
    <div className={cn('relative', className)}>
      <Searchbar
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => setTimeout(closeResults, 150)}
        isLoading={isLoading || isPending}
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
