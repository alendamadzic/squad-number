import { Suspense } from 'react';
import { PlayerCard, PlayerCardSkeleton } from './player-card';
import { PlayerHistory, PlayerHistorySkeleton } from './player-history';

export default async function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="flex flex-col">
      <Suspense fallback={<PlayerCardSkeleton />}>
        <PlayerCard playerId={params.then((params) => params.id)} />
      </Suspense>
      <h2 className="font-bold mt-12 mb-2">History</h2>
      <Suspense fallback={<PlayerHistorySkeleton />}>
        <PlayerHistory playerId={params.then((params) => params.id)} />
      </Suspense>
    </div>
  );
}
