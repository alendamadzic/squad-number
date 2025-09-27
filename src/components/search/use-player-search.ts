import { useEffect, useRef, useState } from 'react';
import { searchPlayers } from '@/lib/transfermarkt';
import type { Player } from '@/types';

export function usePlayerSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Player[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Debounced search effect
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    if (query.trim().length === 0) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const searchResults = await searchPlayers(query);
        setResults(searchResults);
        setIsOpen(searchResults.length > 0);
        setSelectedIndex(0);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
        setIsOpen(false);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [query]);

  const handleSearch = async () => {
    if (query.trim().length === 0) return;

    setIsLoading(true);
    try {
      const searchResults = await searchPlayers(query);
      if (searchResults.length === 1) {
        return searchResults[0];
      } else if (searchResults.length > 1) {
        setResults(searchResults);
        setIsOpen(true);
        setSelectedIndex(0);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  const navigateResults = (direction: 'up' | 'down') => {
    if (results.length === 0) return;

    setSelectedIndex((prev) => {
      if (direction === 'down') {
        return (prev + 1) % results.length;
      } else {
        return (prev - 1 + results.length) % results.length;
      }
    });
  };

  const setSelectedIndexValue = (index: number) => {
    setSelectedIndex(index);
  };

  const getSelectedPlayer = () => {
    return results[selectedIndex] || null;
  };

  const closeResults = () => {
    setIsOpen(false);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(0);
  };

  return {
    // State
    query,
    results,
    selectedIndex,
    isOpen,
    isLoading,

    // Actions
    setQuery,
    handleSearch,
    navigateResults,
    getSelectedPlayer,
    closeResults,
    clearSearch,
    setSelectedIndexValue,
  };
}
