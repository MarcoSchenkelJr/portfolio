import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { Mic } from 'lucide-react';
import { speech } from '../../../content/cases/antigravity';
import { getSpeechCtor, type SpeechRec } from './speech';

type Status = { kind: 'idle' } | { kind: 'listening' } | { kind: 'heard'; text: string } | { kind: 'ok' } | { kind: 'denied' };
const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, '');

/**
 * Mini demonstração do princípio do jogo (DESIGN.md §6.5). Pede o microfone só no clique.
 * Sem SpeechRecognition (Firefox e outros), o bloco não aparece.
 */
export default function SpeechTryout() {
  const Ctor = getSpeechCtor();
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [burst, setBurst] = useState(0);
  const rec = useRef<SpeechRec | null>(null);
  useEffect(() => () => rec.current?.abort(), []);
  if (!Ctor) return null;
  const word = speech.words[i % speech.words.length];

  const listen = () => {
    rec.current?.abort();
    const r = new Ctor();
    r.lang = 'en-US';
    r.interimResults = false;
    r.maxAlternatives = 3;
    r.onstart = () => setStatus({ kind: 'listening' });
    r.onerror = (e) => setStatus(e.error === 'not-allowed' || e.error === 'service-not-allowed' ? { kind: 'denied' } : { kind: 'idle' });
    r.onend = () => setStatus((s) => (s.kind === 'listening' ? { kind: 'idle' } : s));
    r.onresult = (e) => {
      const alts = Array.from(e.results[0] ?? []).map((a) => a.transcript);
      if (alts.some((t) => norm(t).includes(norm(word)))) {
        setStatus({ kind: 'ok' });
        setBurst((b) => b + 1);
        window.setTimeout(() => {
          setI((n) => n + 1);
          setStatus({ kind: 'idle' });
        }, 900);
      } else setStatus({ kind: 'heard', text: alts[0] ?? '' });
    };
    rec.current = r;
    r.start();
  };

  return (
    <div className="speech">
      <div>
        <h3 className="block-h">{speech.heading}</h3>
        <p className="mono" style={{ color: 'var(--ink-3)' }}>
          {speech.say}
        </p>
        <div className="speech__word" lang="en">
          <AnimatePresence mode="popLayout" initial={false}>
            <m.span key={word} style={{ display: 'inline-block' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: reduced ? 1 : 1.3 }} transition={{ duration: 0.25 }}>
              {word}
            </m.span>
          </AnimatePresence>
          {!reduced &&
            burst > 0 &&
            Array.from({ length: 12 }, (_, k) => {
              const a = (k / 12) * Math.PI * 2;
              return (
                <m.span
                  key={`${burst}-${k}`}
                  className="particle"
                  aria-hidden="true"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: Math.cos(a) * 70, y: Math.sin(a) * 40, opacity: 0, scale: 0.4 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />
              );
            })}
        </div>
        <p className={`speech__status${status.kind === 'ok' ? ' ok' : ''}`} aria-live="polite">
          {status.kind === 'listening' && speech.listening}
          {status.kind === 'ok' && speech.success}
          {status.kind === 'denied' && speech.denied}
          {status.kind === 'heard' && (
            <>
              {speech.heard} <em lang="en">{status.text}</em>
            </>
          )}
        </p>
      </div>
      <button type="button" className="btn btn--primary" onClick={listen} disabled={status.kind === 'listening'}>
        <Mic aria-hidden="true" />
        {status.kind === 'listening' ? speech.listening : speech.button}
      </button>
    </div>
  );
}
