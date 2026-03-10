export function HeroTitle() {
  return (
    <div className="flex flex-col items-center">
      <div className="rotate-1 origin-bottom-left border-2 border-[#1a1a1a] bg-white px-6 py-5 sm:px-8 sm:py-6 shadow-[6px_6px_0px_0px_#1a1a1a] sm:shadow-[8px_8px_0px_0px_#1a1a1a]">
        <p className="font-mono text-xs uppercase tracking-[0.25em] font-semibold text-[#888] sm:text-sm">
          Find any player's
        </p>
        <p className="font-mono text-2xl font-black uppercase tracking-tight text-[#1a1a1a] sm:text-3xl md:text-4xl leading-none mt-1">
          Squad Number.
        </p>
      </div>
    </div>
  );
}
