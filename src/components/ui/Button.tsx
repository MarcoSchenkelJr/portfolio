import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router';
import type { LucideIcon } from 'lucide-react';

interface Common {
  variant?: 'primary' | 'ghost';
  size?: 'md' | 'sm';
  iconRight?: LucideIcon;
  iconLeft?: LucideIcon;
  className?: string;
  children: ReactNode;
}

const cls = (variant: string, size: string, extra?: string) =>
  ['btn', `btn--${variant}`, size === 'sm' ? 'btn--sm' : '', extra ?? ''].filter(Boolean).join(' ');

const Inner = ({ iconLeft: L, iconRight: R, children }: Pick<Common, 'iconLeft' | 'iconRight' | 'children'>) => (
  <>
    {L && <L aria-hidden="true" strokeWidth={2} />}
    {children}
    {R && <R aria-hidden="true" strokeWidth={2} className="arrow" />}
  </>
);

/** Link externo ou âncora. `disabled` usa aria-disabled e remove o href (DESIGN.md §5.2). */
export function ButtonA({ variant = 'primary', size = 'md', iconRight, iconLeft, className, children, disabled, ...rest }: Common & AnchorHTMLAttributes<HTMLAnchorElement> & { disabled?: boolean }) {
  const external = rest.target === '_blank';
  if (disabled) {
    const { href: _h, ...r } = rest;
    void _h;
    return (
      <a {...r} role="link" aria-disabled="true" className={cls(variant, size, className)}>
        <Inner iconLeft={iconLeft} iconRight={iconRight}>{children}</Inner>
      </a>
    );
  }
  return (
    <a {...rest} rel={external ? 'noopener' : rest.rel} className={cls(variant, size, className)}>
      <Inner iconLeft={iconLeft} iconRight={iconRight}>{children}</Inner>
    </a>
  );
}

export function ButtonLink({ variant = 'primary', size = 'md', iconRight, iconLeft, className, children, ...rest }: Common & LinkProps) {
  return (
    <Link {...rest} className={cls(variant, size, className)}>
      <Inner iconLeft={iconLeft} iconRight={iconRight}>{children}</Inner>
    </Link>
  );
}

export function Button({ variant = 'primary', size = 'md', iconRight, iconLeft, className, children, type = 'button', ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} type={type} className={cls(variant, size, className)}>
      <Inner iconLeft={iconLeft} iconRight={iconRight}>{children}</Inner>
    </button>
  );
}
