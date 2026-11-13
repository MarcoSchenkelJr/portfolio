import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

/** Copia o valor, troca o ícone por Check por 1,6s e anuncia "Copiado". */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = value;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return (
    <button type="button" className="copy-btn" onClick={copy} aria-label={`Copiar ${label}`}>
      {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      <span aria-live="polite">{copied ? 'Copiado' : 'Copiar'}</span>
    </button>
  );
}
