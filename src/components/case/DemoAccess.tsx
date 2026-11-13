import { ArrowUpRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { CopyButton } from '../ui/CopyButton';

interface DemoText {
  title: string;
  soon: string;
  pending: string;
  ready: string;
  button: string;
  url: string;
  user: string;
  password: string;
}

/** Caixa da demonstração: sem url, "Em breve" e botão desativado; com url, botão ativo e credenciais (DESIGN.md §11.6). */
export function DemoAccess({ url, user, password, text }: { url?: string; user?: string; password?: string; text: DemoText }) {
  const ready = !!url;
  return (
    <div className="demo">
      <div className="demo__h">
        {text.title}
        {!ready && (
          <Badge tone="wip" dot>
            {text.soon}
          </Badge>
        )}
      </div>
      {ready ? (
        <>
          <dl>
            <dt>{text.url}</dt>
            <dd style={{ gridColumn: 'span 2' }}>{url}</dd>
            {user && (
              <>
                <dt>{text.user}</dt>
                <dd>{user}</dd>
                <CopyButton value={user} label={text.user} />
              </>
            )}
            {password && (
              <>
                <dt>{text.password}</dt>
                <dd>{password}</dd>
                <CopyButton value={password} label={text.password} />
              </>
            )}
          </dl>
          <p>{text.ready}</p>
          <a className="btn btn--primary btn--sm" href={url} target="_blank" rel="noopener">
            {text.button}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </>
      ) : (
        <>
          <p>{text.pending}</p>
          <a className="btn btn--primary btn--sm" role="link" aria-disabled="true">
            {text.button}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </>
      )}
    </div>
  );
}
