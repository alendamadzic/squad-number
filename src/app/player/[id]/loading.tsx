import { PlayerCardSkeleton } from './player-card';
import { PlayerHistorySkeleton } from './player-history-server';

export default function Loading() {
  return (
    <div className="flex flex-col gap-10">
      <PlayerCardSkeleton />
      <div>
        <PlayerHistorySkeleton />
      </div>
    </div>
  );
}
