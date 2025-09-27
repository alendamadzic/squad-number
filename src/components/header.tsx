import Link from 'next/link';
import { PlayerSearch } from '@/components/search/player-search';
import { cn } from '@/lib/utils';

export function Header({ className }: { className?: string }) {
  return (
    <header className={cn('flex flex-col gap-4', className)}>
      <Link href="/">
        <span className="block text-center text-primary font-bold">squad number.</span>
      </Link>
      <PlayerSearch className="w-full" />
    </header>
  );
}
