import type { CategoryKey } from '../types';

type CategoryFilterProps = {
  active: CategoryKey;
  onChange: (key: CategoryKey) => void;
};

const CategoryFilter = ({ active, onChange }: CategoryFilterProps) => {
  const categories: { key: CategoryKey; label: string }[] = [
    { key: 'trending', label: 'Trending' },
    { key: 'top_rated', label: 'Top Rated' },
    { key: 'action', label: 'Action' },
    { key: 'comedy', label: 'Comedy' },
  ];

  return (
    <div className="mb-2 flex flex-wrap gap-3">
      {categories.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={`rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
            active === key
              ? 'border-white bg-white text-black'
              : 'border-white/40 bg-transparent text-white/80 hover:border-white hover:text-white'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;