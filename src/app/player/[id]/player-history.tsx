import { Skeleton } from '@/components/ui/skeleton';
import { getNumberHistory } from '@/lib/transfermarkt';
import type { NumberHistory } from '@/types';

export async function PlayerHistory({ playerId }: { playerId: Promise<string> }) {
  const numberHistory = await getNumberHistory(await playerId);
  return (
    <div>
      {numberHistory.map((record) => (
        <HistoryItem key={`${record.season}-${record.club.name}-${record.jerseyNumber}`} record={record} />
      ))}
    </div>
  );
}

export function HistoryItem({ record }: { record: NumberHistory }) {
  return (
    <div className="flex flex-row gap-2 text-sm text-muted-foreground">
      <span className="w-12">{record.season}</span>
      <span className="w-12 font-bold">#{record.jerseyNumber}</span>
      <span>{record.club.name}</span>
    </div>
  );
}

export function PlayerHistorySkeleton() {
  return (
    <div className="flex flex-col gap-1">
      <HistoryItemSkeleton />
      <HistoryItemSkeleton />
      <HistoryItemSkeleton />
      <HistoryItemSkeleton />
      <HistoryItemSkeleton />
      <HistoryItemSkeleton />
    </div>
  );
}

function HistoryItemSkeleton() {
  return (
    <div className="flex flex-row gap-2 text-sm text-muted-foreground">
      <Skeleton className="w-12 h-8" />
      <Skeleton className="w-12 h-8" />
      <Skeleton className="w-48 h-8" />
    </div>
  );
}
