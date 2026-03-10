import { Suspense } from 'react';
import { PlayerCard, PlayerCardSkeleton } from './player-card';
import { PlayerHistory, PlayerHistorySkeleton } from './player-history-server';

export default function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="flex flex-col gap-10">
      <Suspense fallback={<PlayerCardSkeleton />}>
        <PlayerCardWrapper params={params} />
      </Suspense>

      <div>
        <Suspense fallback={<PlayerHistorySkeleton />}>
          <PlayerHistoryWrapper params={params} />
        </Suspense>
      </div>
    </div>
  );
}

async function PlayerCardWrapper({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PlayerCard playerId={id} />;
}

async function PlayerHistoryWrapper({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PlayerHistory playerId={id} />;
}
