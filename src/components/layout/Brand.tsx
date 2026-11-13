import { Link } from 'react-router';
import { site } from '../../content/site';

/** Marca "~/marco-schenkel-jr" com cursor de bloco (DESIGN.md §2.5). */
export function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" className="brand" aria-label="Marco Schenkel Jr., início" onClick={onClick}>
      <b>{site.brand.prefix}</b>
      {site.brand.short}
      <span className="hide-s">-jr</span>
      <span className="cur" aria-hidden="true" />
    </Link>
  );
}
