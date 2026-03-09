import Link from 'next/link';
import { Suspense } from 'react';
import { ChevronLeft } from 'lucide-react';
import { PlayerCard, PlayerCardSkeleton } from './player-card';
import { PlayerHistory, PlayerHistorySkeleton } from './player-history';

export default function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const idPromise = params.then((p) => p.id);

  return (
    <div className="flex flex-col gap-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit -mt-6"
      >
        <ChevronLeft size={14} />
        Search
      </Link>

      <Suspense fallback={<PlayerCardSkeleton />}>
        <PlayerCard playerId={idPromise} />
      </Suspense>

      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">History</h2>
        <Suspense fallback={<PlayerHistorySkeleton />}>
          <PlayerHistory playerId={idPromise} />
        </Suspense>
      </div>
    </div>
  );
}
