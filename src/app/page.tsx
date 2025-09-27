import { PlayerSearch } from '@/components/search/player-search';

export default function Home() {
  return (
    <section className="flex flex-col gap-24 p-4">
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-light text-center">
        Find any player's
        <span className="block text-primary font-bold">squad number.</span>
      </h1>
      <PlayerSearch className="w-full" />
    </section>
  );
}
