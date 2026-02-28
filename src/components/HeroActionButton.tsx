import type { ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface HeroActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: IconDefinition;
  variant?: 'primary' | 'secondary';
  to?: string; // when provided, render as a Link instead of a button
}

const baseClasses =
  'inline-flex items-center gap-3 rounded-md px-6 py-3 text-base font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black';

const variants: Record<NonNullable<HeroActionButtonProps['variant']>, string> = {
  primary: `${baseClasses} bg-white text-black hover:bg-white/90`,
  secondary: `${baseClasses} border border-white/60 bg-white/10 text-white hover:border-white hover:bg-white/15`,
};

const HeroActionButton = ({ label, icon, variant = 'primary', className = '', to, ...props }: HeroActionButtonProps) => {
  const classes = `${variants[variant]} ${className}`.trim();
  const content = (
    <>
      {icon && (
        <span className="flex h-5 w-5 items-center justify-center">
          <FontAwesomeIcon icon={icon} className="h-4 w-4" />
        </span>
      )}
      <span>{label}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  );
};

export default HeroActionButton;
