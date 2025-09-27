import { PlayerSearch } from '@/components/search/player-search';
import { cn } from '@/lib/utils';

export function Header({ className }: { className?: string }) {
  return (
    <header className={cn('flex flex-col gap-4', className)}>
      <span className="block text-center text-primary font-bold">squad number.</span>
      <PlayerSearch className="w-full" />
    </header>
  );
}
