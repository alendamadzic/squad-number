import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Player } from "@/types";

export function PlayerCard({ player, className }: { player: Player; className?: string }) {
  var content: React.ReactNode;
  var primaryColor = "primary";
  var secondaryColor = "secondary";
  var tertiaryColor = "primary";

  if (!player.club || !player.shirtNumber) {
    content = <div>N/A</div>;
  } else {
    // Get the colors from the club
    if (Array.isArray(player.club.colors) && player.club.colors.length > 0) {
      primaryColor = player.club.colors[0];
      secondaryColor = player.club.colors[1];
      tertiaryColor = player.club.colors[2];
    }

    content = (
      <div
        style={{ color: primaryColor, backgroundColor: secondaryColor, borderColor: tertiaryColor }}
        className="rounded-lg border"
      >
        {player.shirtNumber}
      </div>
    );
  }

  return (
    <Card className={cn("text-center", className)}>
      <CardHeader>
        <CardTitle>{player.name}</CardTitle>
        <CardDescription>{player.club.name}</CardDescription>
      </CardHeader>
      <CardContent className="text-6xl font-bold p-6">{content}</CardContent>
    </Card>
  );
}
