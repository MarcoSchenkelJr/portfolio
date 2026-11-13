import type { ReactNode } from 'react';
import { Lock } from 'lucide-react';
import type { Status } from '../../content/types';

export function Badge({ tone = 'neutral', icon, children, dot }: { tone?: 'live' | 'wip' | 'neutral' | 'first'; icon?: ReactNode; children: ReactNode; dot?: boolean }) {
  const c = tone === 'neutral' ? 'badge' : `badge badge--${tone}${dot ? ' badge--dot' : ''}`;
  return (
    <span className={c}>
      {icon}
      {children}
    </span>
  );
}

export function StatusBadge({ status, label }: { status: Status; label: string }) {
  return status === 'construcao' ? (
    <Badge tone="wip" dot>{label}</Badge>
  ) : (
    <Badge tone="live">{label}</Badge>
  );
}

export function CodeBadge({ privateCode }: { privateCode: boolean }) {
  return privateCode ? (
    <Badge icon={<Lock aria-hidden="true" strokeWidth={2.4} />}>Código privado</Badge>
  ) : (
    <Badge>Código aberto</Badge>
  );
}

export const Tag = ({ children, lang }: { children: ReactNode; lang?: string }) => (
  <span className="tag" lang={lang}>{children}</span>
);

export function Tags({ items }: { items: string[] }) {
  return (
    <ul className="tags" aria-label="Tecnologias" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {items.map((t) => (
        <li key={t}><Tag>{t}</Tag></li>
      ))}
    </ul>
  );
}
