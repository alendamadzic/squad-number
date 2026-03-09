import { Skeleton } from '@/components/ui/skeleton';
import { getNumberHistory } from '@/lib/transfermarkt';
import type { NumberHistory } from '@/types';

export async function PlayerHistory({ playerId }: { playerId: Promise<string> }) {
  const numberHistory = await getNumberHistory(await playerId);

  if (numberHistory.length === 0) {
    return <p className="text-sm text-muted-foreground">No history available.</p>;
  }

  return (
    <div className="flex flex-col divide-y divide-border rounded-[--radius-lg] border border-border overflow-hidden">
      {numberHistory.map((record) => (
        <HistoryItem key={`${record.season}-${record.club.name}-${record.jerseyNumber}`} record={record} />
      ))}
    </div>
  );
}

function HistoryItem({ record }: { record: NumberHistory }) {
  const color = record.club.colors?.[0];

  return (
    <div className="flex items-center gap-4 px-4 py-3 text-sm">
      <span className="w-12 shrink-0 text-muted-foreground tabular-nums">{record.season}</span>
      <span
        className="w-8 shrink-0 font-bold tabular-nums"
        style={{ color: color ?? undefined }}
      >
        {record.jerseyNumber}
      </span>
      <span className="truncate text-muted-foreground">{record.club.name}</span>
    </div>
  );
}

export function PlayerHistorySkeleton() {
  return (
    <div className="flex flex-col divide-y divide-border rounded-[--radius-lg] border border-border overflow-hidden">
      {Array.from({ length: 6 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
        <div key={i} className="flex items-center gap-4 px-4 py-3">
          <Skeleton className="w-12 h-4 shrink-0" />
          <Skeleton className="w-8 h-4 shrink-0" />
          <Skeleton className="h-4 w-32" />
        </div>
      ))}
    </div>
  );
}
