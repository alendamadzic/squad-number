import { Skeleton } from '@/components/ui/skeleton';
import { getNumberHistory } from '@/lib/transfermarkt';
import { HistoryList, HistoryTabs } from './player-history';

export async function PlayerHistory({ playerId }: { playerId: Promise<string> }) {
  const { clubs, international } = await getNumberHistory(await playerId);

  if (clubs.length === 0 && international.length === 0) {
    return <p className="text-sm text-muted-foreground">No history available.</p>;
  }

  if (international.length === 0) {
    return <HistoryList records={clubs} />;
  }

  return <HistoryTabs clubs={clubs} international={international} />;
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
