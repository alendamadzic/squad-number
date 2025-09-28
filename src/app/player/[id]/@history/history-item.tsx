import { Skeleton } from '@/components/ui/skeleton';
import type { NumberHistory } from '@/types';

export function HistoryItem({ record }: { record: NumberHistory }) {
  return (
    <div className="flex flex-row gap-2 text-sm text-muted-foreground">
      <span className="w-12">{record.season}</span>
      <span className="w-12 font-bold">#{record.jerseyNumber}</span>
      <span>{record.club.name}</span>
    </div>
  );
}

export function HistoryItemSkeleton() {
  return (
    <div className="flex flex-row gap-2 text-sm text-muted-foreground">
      <Skeleton className="w-12 h-8" />
      <Skeleton className="w-12 h-8" />
      <Skeleton className="w-48 h-8" />
    </div>
  );
}
