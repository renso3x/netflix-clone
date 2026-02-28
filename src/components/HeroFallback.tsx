type HeroFallbackProps = {
  isLoading: boolean;
  error: string | null;
};

const HeroFallback = ({ isLoading, error }: HeroFallbackProps) => (
  <div className="flex flex-col gap-4 rounded-3xl border border-white/5 bg-neutral-900/40 p-8">
    {isLoading && <p className="text-lg text-white/70">Loading tonight&apos;s picks...</p>}
    {!isLoading && error && <p className="text-lg text-red-300">{error}</p>}
  </div>
);

export default HeroFallback;