import { HeroTitle } from '@/components/hero-title';
import { PlayerSearch } from '@/components/search/player-search';
import { cn } from '@/lib/utils';

export function Header({ className }: { className?: string }) {
  return (
    <header className={cn('flex flex-col gap-8', className)}>
      <HeroTitle />
      <PlayerSearch className="w-full" />
    </header>
  );
}
