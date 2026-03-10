import Link from 'next/link';
import { PlayerSearch } from '@/components/search/player-search';
import { cn } from '@/lib/utils';

export function Header({ className }: { className?: string }) {
  return (
    <header className={cn('flex flex-col gap-4', className)}>
      <Link href="/">
        <span
          className="block text-center text-base font-black uppercase tracking-tight text-white font-mono"
          style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.2)' }}
        >
          squad number.
        </span>
      </Link>
      <PlayerSearch className="w-full" />
    </header>
  );
}
