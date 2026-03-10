import { notFound } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { getPlayer } from '@/lib/transfermarkt';

export async function PlayerCard({ playerId }: { playerId: Promise<string> }) {
  const player = await getPlayer(await playerId);
  if (!player) return notFound();

  const hasNumber = player.club && player.shirtNumber;
  const colors = player.club?.colors ?? [];
  const primaryColor = colors[0] ?? 'currentColor';
  const secondaryColor = colors[1] ?? 'transparent';
  const borderColor = colors[2] ?? colors[0] ?? 'transparent';

  return (
    <>
      {/* Expose club colors as CSS variables so the pitch theme can use them */}
      {hasNumber && (
        <style
          // biome-ignore lint/security/noDangerouslySetInnerHtml: injecting safe CSS hex values from API
          dangerouslySetInnerHTML={{
            __html: `:root{--club-primary:${primaryColor};--club-secondary:${secondaryColor};--club-tertiary:${borderColor}}`,
          }}
        />
      )}
      <div className="squad-card overflow-hidden rounded-[--radius-lg] border border-border">
        {/* Number hero */}
        <div
          className="squad-hero flex items-center justify-center px-8 py-12"
          style={{ backgroundColor: hasNumber ? secondaryColor : undefined }}
        >
          {hasNumber ? (
            <span
              className="squad-number text-[7rem] sm:text-[9rem] font-black leading-none tabular-nums select-none"
              style={{ color: primaryColor }}
            >
              {player.shirtNumber}
            </span>
          ) : (
            <span className="text-5xl font-light text-muted-foreground select-none">—</span>
          )}
        </div>

        {/* Player info */}
        <div
          className="squad-info px-6 py-4 border-t border-border"
          style={{ borderColor: hasNumber ? borderColor : undefined }}
        >
          <p className="text-lg font-bold leading-tight">{player.name}</p>
          {player.club?.name && <p className="text-sm text-muted-foreground mt-0.5">{player.club.name}</p>}
        </div>
      </div>
    </>
  );
}

export function PlayerCardSkeleton() {
  return (
    <div className="squad-card overflow-hidden rounded-[--radius-lg] border border-border">
      <div className="squad-hero flex items-center justify-center px-8 py-12 bg-muted/40">
        <Skeleton className="h-36 w-48 rounded-md" />
      </div>
      <div className="squad-info px-6 py-4 border-t border-border">
        <Skeleton className="h-5 w-40 mb-1.5" />
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  );
}
