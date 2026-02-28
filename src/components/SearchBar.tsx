type SearchBarProps = {
  query: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

const SearchBar = ({ query, onChange, onSearch }: SearchBarProps) => (
  <form
    className="mb-4 flex flex-wrap items-center gap-3"
    onSubmit={(event) => {
      event.preventDefault();
      onSearch();
    }}
  >
    <input
      value={query}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search for a title..."
      className="min-w-55 flex-1 rounded-full bg-neutral-900/70 px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500"
    />
    <button
      type="submit"
      className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
    >
      Search
    </button>
  </form>
);

export default SearchBar;