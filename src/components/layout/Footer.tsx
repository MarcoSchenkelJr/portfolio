import { ArrowUpRight } from 'lucide-react';
import { footer, links } from '../../content/site';
import { Brand } from './Brand';

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <Brand />
        <span>{footer.copyright}</span>
        <span>
          {footer.madeWith}{' '}
          <a className="link" href={links.siteRepo} target="_blank" rel="noopener">
            {footer.repoLabel}
            <ArrowUpRight aria-hidden="true" size={14} />
          </a>
        </span>
      </div>
    </footer>
  );
}
