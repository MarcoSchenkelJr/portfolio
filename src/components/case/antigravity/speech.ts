/** Tipos mínimos da Web Speech API (não estão no lib.dom do TypeScript). */
export interface SpeechAlt {
  transcript: string;
}
export interface SpeechResultEvent {
  results: ArrayLike<ArrayLike<SpeechAlt>>;
}
export interface SpeechRec {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onresult: ((e: SpeechResultEvent) => void) | null;
  start: () => void;
  abort: () => void;
}
type Ctor = new () => SpeechRec;

export function getSpeechCtor(): Ctor | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { SpeechRecognition?: Ctor; webkitSpeechRecognition?: Ctor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}
export const isSpeechSupported = () => getSpeechCtor() !== null;
