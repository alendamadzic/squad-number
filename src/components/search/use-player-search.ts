import { useEffect, useRef, useState } from 'react';
import { searchPlayers } from '@/lib/actions';
import type { Player } from '@/types';

export function usePlayerSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Player[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    clearTimeout(debounceRef.current);

    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const searchResults = await searchPlayers(query);
        setResults(searchResults);
        setIsOpen(searchResults.length > 0);
        setSelectedIndex(0);
      } catch {
        setResults([]);
        setIsOpen(false);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const navigateResults = (direction: 'up' | 'down') => {
    if (!results.length) return;
    setSelectedIndex((prev) =>
      direction === 'down' ? (prev + 1) % results.length : (prev - 1 + results.length) % results.length,
    );
  };

  const getSelectedPlayer = () => results[selectedIndex] ?? null;

  return {
    query,
    results,
    selectedIndex,
    isOpen,
    isLoading,
    setQuery,
    navigateResults,
    getSelectedPlayer,
    closeResults: () => setIsOpen(false),
    clearSearch: () => {
      setQuery('');
      setResults([]);
      setIsOpen(false);
      setSelectedIndex(0);
    },
    setSelectedIndexValue: (i: number) => setSelectedIndex(i),
  };
}
