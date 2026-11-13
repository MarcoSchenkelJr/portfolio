import { useId, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { CopyButton } from '../../ui/CopyButton';

/** Código com realce gerado no build pelo shiki (DESIGN.md §5.2). Mostra 24 linhas e "Ver tudo". */
export function CodeBlock({ code, filename, maxLines = 24 }: { code: { html: string; lines: number; raw: string }; filename?: string; maxLines?: number }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const clamp = code.lines > maxLines && !open;
  return (
    <div className="code">
      <div className="code__bar">
        <span>{filename}</span>
        <CopyButton value={code.raw} label="código" />
      </div>
      <div id={id} className={`code__body${clamp ? ' code__body--clamped' : ''}`} tabIndex={0} role="region" aria-label={`Código de ${filename}`} dangerouslySetInnerHTML={{ __html: code.html }} />
      {code.lines > maxLines && (
        <div className="code__more">
          <button type="button" className="stage-btn" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
            {open ? <ChevronUp aria-hidden="true" /> : <ChevronDown aria-hidden="true" />}
            {open ? 'Ver menos' : `Ver tudo (${code.lines} linhas)`}
          </button>
        </div>
      )}
    </div>
  );
}
