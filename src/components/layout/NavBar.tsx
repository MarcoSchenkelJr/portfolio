import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ArrowLeft, Menu } from 'lucide-react';
import { nav } from '../../content/site';
import { Brand } from './Brand';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';

function useActiveSection(ids: string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    // linha de referência a 38% da altura da janela (DESIGN.md §5.2)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-38% 0px -61% 0px' },
    );
    els.forEach((el) => io.observe(el));
    const onScroll = () => {
      if (window.scrollY < 200) setActive(null);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [ids.join(','), enabled]);
  return active;
}

/** Barra fixa do site. `home`: seções e "Falar comigo". `case`: marca, "Projetos" e tema. */
export function NavBar({ variant }: { variant: 'home' | 'case' }) {
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const active = useActiveSection(
    nav.items.map((i) => i.id),
    variant === 'home',
  );

  const close = () => {
    setOpen(false);
    menuBtn.current?.focus();
  };

  const goSection = (id: string) => (e: React.MouseEvent) => {
    if (location.pathname !== '/') {
      e.preventDefault();
      navigate('/', { state: { scrollTo: id } });
    }
  };

  if (variant === 'case') {
    return (
      <header className="nav nav--case">
        <div className="wrap">
          <Brand />
          <div className="nav__actions">
            <button type="button" className="nav__back" onClick={() => navigate('/', { state: { scrollTo: 'projetos' } })}>
              <ArrowLeft aria-hidden="true" size={18} />
              Projetos
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="nav nav--home">
      <div className="wrap">
        <Brand onClick={() => window.scrollTo({ top: 0 })} />
        <nav className="nav__links" aria-label="Seções">
          {nav.items.map((i) => (
            <a key={i.id} href={`#${i.id}`} aria-current={active === i.id ? 'true' : undefined} onClick={goSection(i.id)}>
              <span className="n">{i.n}</span>
              {i.label}
            </a>
          ))}
        </nav>
        <div className="nav__actions">
          <ThemeToggle />
          <a className="btn btn--primary btn--sm nav__cta" href="#contato">
            {nav.cta}
          </a>
          <button
            ref={menuBtn}
            type="button"
            className="icon-btn nav__menu-btn"
            aria-expanded={open}
            aria-controls="menu-celular"
            aria-label={nav.menuOpen}
            onClick={() => setOpen(true)}
          >
            <Menu aria-hidden="true" />
          </button>
        </div>
      </div>
      <MobileMenu open={open} onClose={close} items={nav.items} active={active} />
    </header>
  );
}
