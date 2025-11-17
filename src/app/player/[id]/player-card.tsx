import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getPlayer } from '@/lib/transfermarkt';
import { cn } from '@/lib/utils';

export async function PlayerCard({ playerId, className }: { playerId: Promise<string>; className?: string }) {
  let clubName: string;
  let number: React.ReactNode;
  let primaryColor = 'primary';
  let secondaryColor = 'secondary';
  let tertiaryColor = 'primary';

  const player = await getPlayer(await playerId);
  if (!player) {
    return notFound();
  }

  if (!player.club || !player.shirtNumber) {
    number = <div>N/A</div>;
    clubName = '';
  } else {
    clubName = player.club.name;
    // Get the colors from the club
    if (Array.isArray(player.club.colors) && player.club.colors.length > 0) {
      primaryColor = player.club.colors[0];
      secondaryColor = player.club.colors[1];
      tertiaryColor = player.club.colors[2];
    }

    number = (
      <div
        style={{ color: primaryColor, backgroundColor: secondaryColor, borderColor: tertiaryColor }}
        className="rounded-lg border"
      >
        {player.shirtNumber}
      </div>
    );
  }

  return (
    <Card className={cn('text-center', className)}>
      <CardHeader>
        <CardTitle>{player.name}</CardTitle>
        <CardDescription>{clubName}</CardDescription>
      </CardHeader>
      <CardContent className="text-6xl font-bold p-6">{number}</CardContent>
    </Card>
  );
}

export function PlayerCardSkeleton() {
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-48 mx-auto" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-32 mx-auto" />
        </CardDescription>
      </CardHeader>
      <CardContent className="text-6xl font-bold p-6">
        <div className="flex justify-center items-center">
          <Skeleton className="h-16 w-20 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
}
