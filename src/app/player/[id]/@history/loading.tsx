import { HistoryItemSkeleton } from './history-item';

export default function PlayerHistoryLoading() {
  return (
    <div>
      <h2 className="font-bold mb-4">History</h2>
      <div className="flex flex-col gap-1">
        <HistoryItemSkeleton />
        <HistoryItemSkeleton />
        <HistoryItemSkeleton />
        <HistoryItemSkeleton />
        <HistoryItemSkeleton />
        <HistoryItemSkeleton />
      </div>
    </div>
  );
}
