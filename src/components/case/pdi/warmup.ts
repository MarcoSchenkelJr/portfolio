/**
 * Aquecimento do servidor de processamento no Render (DESIGN.md §10.3):
 * um único fetch no-cors por sessão, disparado quando a página do case monta.
 */
const KEY = 'pdi-aquecimento';
export type WarmResult = 'ready' | 'down';

let started: { start: number; result: Promise<WarmResult> } | null = null;

export function startWarmup(url: string) {
  if (started) return started;
  let t0 = Date.now();
  let fresh = true;
  try {
    const saved = sessionStorage.getItem(KEY);
    if (saved) {
      t0 = Number(saved) || t0;
      fresh = false;
    } else sessionStorage.setItem(KEY, String(t0));
  } catch {
    /* sem sessionStorage: aquece mesmo assim */
  }
  const elapsed = Date.now() - t0;
  const timeout = new Promise<WarmResult>((r) => window.setTimeout(() => r('ready'), Math.max(0, 60000 - elapsed)));
  const result = fresh
    ? Promise.race([
        fetch(url, { mode: 'no-cors' }).then(
          () => 'ready' as const,
          () => 'down' as const,
        ),
        timeout,
      ])
    : timeout;
  started = { start: t0, result };
  return started;
}
