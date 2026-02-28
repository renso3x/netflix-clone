
import { useState } from "react";
import { Link, useLocation } from 'react-router';

type NavigationProps = {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
};

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'TV Shows', path: '/tv' },
  { label: 'Movies', path: '/movies' },
  { label: 'My List', path: '/my-list' },
];
const actionIcons = [
  { src: "/bell.svg", alt: "Notifications", width: 24, height: 24 },
];

const Navigation = ({ searchQuery, onSearchChange }: NavigationProps) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localQuery, setLocalQuery] = useState("");

  const closeMenu = () => setIsMenuOpen(false);

  const effectiveQuery = searchQuery ?? localQuery;

  const handleSearchChange = (value: string) => {
    if (onSearchChange) {
      onSearchChange(value);
    } else {
      setLocalQuery(value);
    }
  };

  const handleToggleSearch = () => {
    setIsSearchOpen((prev) => {
      const next = !prev;
      if (!next) {
        handleSearchChange("");
      }
      return next;
    });
  };

  return (
    <nav className="relative flex items-center justify-between py-6 text-white">
      <div className="flex items-center gap-8">
        <Link to="/" aria-label="Go to home">
          <img src="/logo.png" alt="Vite logo" className="h-8 w-auto" />
        </Link>

        <ul className="hidden items-center gap-8 text-sm uppercase tracking-[0.4em] md:flex">
          {navLinks.map(({ label, path }) => {
            const isActive = location.pathname === path;
            return (
              <li key={label}>
                <Link
                  to={path}
                  className={`transition-opacity hover:opacity-80 ${
                    isActive ? 'opacity-100' : 'opacity-70'
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 overflow-hidden rounded-full bg-white/10 px-3 py-2 text-sm transition-all duration-200 ${
              isSearchOpen ? "w-40 sm:w-56" : "w-10 justify-center"
            }`}
          >
            <button
              type="button"
              className="flex h-5 w-5 items-center justify-center"
              onClick={handleToggleSearch}
              aria-label="Toggle search"
            >
              <img src="/search.svg" alt="Search" width={16} height={16} />
            </button>
            {isSearchOpen && (
              <input
                className="w-full bg-transparent text-xs text-white placeholder:text-white/50 focus:outline-none"
                placeholder="Search titles..."
                value={effectiveQuery}
                onChange={(event) => handleSearchChange(event.target.value)}
              />
            )}
          </div>

          <ul className="hidden items-center gap-6 md:flex">
            {actionIcons.map(({ src, alt, width, height }) => (
              <li key={alt}>
                <img src={src} alt={alt} width={width} height={height} />
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <img src="/burger.svg" alt="Open menu" width={20} height={20} />
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-full rounded-md border border-white/10 bg-red-400 p-4 text-white shadow-lg md:hidden">
          <ul className="flex flex-col gap-4 text-sm font-semibold uppercase tracking-wide">
            {navLinks.map(({ label, path }) => (
              <li key={label}>
                <Link
                  to={path}
                  className="block transition-opacity hover:opacity-75"
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center gap-4">
            {actionIcons.map(({ src, alt, width, height }) => (
              <button
                key={alt}
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
                onClick={closeMenu}
              >
                <img src={src} alt={alt} width={width} height={height} />
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;