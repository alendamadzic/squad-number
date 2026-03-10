import { Skeleton } from '@/components/ui/skeleton';
import { getNumberHistory } from '@/lib/transfermarkt';
import { HistorySection } from './player-history';

export async function PlayerHistory({ playerId }: { playerId: string }) {
  const { clubs, international } = await getNumberHistory(playerId);
  return <HistorySection clubs={clubs} international={international} />;
}

export function PlayerHistorySkeleton() {
  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2>
          <span
            className="inline-flex items-center border-2 border-[#1a1a1a] bg-white px-4 py-2 font-mono text-xs font-black uppercase tracking-[0.3em] !text-[#1a1a1a] shadow-[4px_4px_0px_0px_#1a1a1a]"
            style={{ textShadow: 'none' }}
          >
            History
          </span>
        </h2>
      </div>
      <div className="mt-3 flex flex-col divide-y divide-border rounded-[--radius-lg] border border-border overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
          <div key={i} className="flex items-center gap-4 px-4 py-3">
            <Skeleton className="w-12 h-4 shrink-0" />
            <Skeleton className="w-8 h-4 shrink-0" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>
    </div>
  );
}
