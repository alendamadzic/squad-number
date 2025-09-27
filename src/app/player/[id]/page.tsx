import { notFound } from 'next/navigation';
import { getPlayer } from '@/lib/transfermarkt';
import { PlayerCard } from './player-card';

export default async function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const player = await getPlayer(id);
  if (!player) {
    notFound();
  }

  return <PlayerCard player={player} />;
}
