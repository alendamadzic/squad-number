import { Suspense } from 'react';
import { PlayerCard, PlayerCardSkeleton } from './player-card';
import { PlayerHistory, PlayerHistorySkeleton } from './player-history-server';

export default function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const idPromise = params.then((p) => p.id);

  return (
    <div className="flex flex-col gap-10">
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
