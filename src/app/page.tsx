import { HeroTitle } from '@/components/hero-title';
import { PlayerSearch } from '@/components/search/player-search';

export default function Home() {
  return (
    <section className="flex flex-col gap-16 p-4">
      <HeroTitle />
      <PlayerSearch className="w-full" />
    </section>
  );
}
