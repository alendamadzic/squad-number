import { getNumberHistory } from '@/lib/transfermarkt';
import { HistoryItem } from './history-item';

export default async function PlayerHistoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numberHistory = await getNumberHistory(id);

  return (
    <div>
      <h2 className="font-bold mb-4">History</h2>
      <div className="flex flex-col gap-1">
        {numberHistory.map((record) => (
          <HistoryItem key={`${record.season}-${record.club.name}-${record.jerseyNumber}`} record={record} />
        ))}
      </div>
    </div>
  );
}
