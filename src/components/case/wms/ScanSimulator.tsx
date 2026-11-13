import { useEffect, useReducer, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { Check, Minus, Plus, RotateCcw, ScanBarcode, Volume2, VolumeX, Wifi, WifiOff } from 'lucide-react';
import { spring } from '../../../motion/tokens';
import { Stage, DeviceFrame } from '../../ui/Stage';
import { SegmentedControl } from '../../ui/SegmentedControl';

/** Textos do simulador (DESIGN.md §11.6, com a terminologia nova do WMS). */
const T = {
  figure: ['fig. 04 · ', 'simulador', ' · dados fictícios'] as [string, string, string],
  screen: 'Recebimento',
  trigger: 'Puxar o gatilho',
  sku: 'SKU',
  lote: 'Lote',
  desc: 'Descrição',
  volumes: 'Volumes conferidos',
  save: 'Salvar pallet',
  choose: 'Escolha o endereço',
  net: 'Rede',
  online: 'Online',
  offline: 'Offline',
  queue: (n: number) => `Fila: ${n} ${n === 1 ? 'pendente' : 'pendentes'}`,
  sound: 'Som',
  reset: 'Reiniciar',
  kpiWaiting: 'Aguardando endereçamento',
  kpiStored: 'Endereçados',
  kpiVolumes: 'Volumes',
  occupancy: 'Ocupação',
  errCount: 'Conte os volumes antes de salvar.',
  saved: 'Pallet aguardando endereçamento.',
  stored: (a: string) => `Pallet guardado em ${a}.`,
  offlineSaved: 'Sem rede: leitura guardada no aparelho.',
  synced: (n: number) => `Rede de volta: ${n} ${n === 1 ? 'leitura enviada' : 'leituras enviadas'}.`,
  badgeWaiting: 'Aguardando endereçamento',
  badgeStored: 'Armazenado',
  badgeQueue: 'Aguardando rede',
  badgeSynced: 'Sincronizado',
  empty: 'Nenhum pallet ainda. Puxe o gatilho para ler a primeira etiqueta.',
  tapToAddress: 'Toque para endereçar',
  scanned: (sku: string) => `Etiqueta lida: ${sku}`,
};

const ADDRESS_POOL = ['A-01-03', 'A-01-04', 'B-02-01', 'A-02-01', 'B-01-02', 'C-03-01', 'A-03-02', 'B-03-04', 'C-01-02', 'A-04-01', 'B-04-03', 'C-02-02', 'A-05-02', 'B-05-01', 'C-04-03'];

interface Item {
  sku: string;
  desc: string;
  lote: string;
  volumes: number;
}
interface Pallet {
  id: string;
  sku: string;
  desc: string;
  lote: string;
  volumes: number;
  address?: string;
  status: 'triagem' | 'armazenado';
  synced: boolean;
}
type Step = 'idle' | 'scanned' | 'triage' | 'addressing' | 'stored';
interface SimState {
  step: Step;
  current?: Item;
  volumes: string;
  pallets: Pallet[];
  online: boolean;
  queue: string[];
  sound: boolean;
  catalogIndex: number;
  addressingId?: string;
  error: number;
  scanSeq: number;
  toast?: { text: string; seq: number };
  announce: string;
  seq: number;
}
type SimAction =
  | { type: 'SCAN'; catalog: Item[] }
  | { type: 'SET_VOLUMES'; value: string }
  | { type: 'SAVE' }
  | { type: 'START_ADDRESS'; id: string }
  | { type: 'ASSIGN'; address: string }
  | { type: 'TOGGLE_ONLINE' }
  | { type: 'DRAIN_ONE' }
  | { type: 'DRAIN_DONE'; n: number }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'RESET' };

const initial: SimState = { step: 'idle', volumes: '', pallets: [], online: true, queue: [], sound: false, catalogIndex: 0, error: 0, scanSeq: 0, announce: '', seq: 0 };

function reducer(s: SimState, a: SimAction): SimState {
  const seq = s.seq + 1;
  switch (a.type) {
    case 'SCAN': {
      const item = a.catalog[s.catalogIndex % a.catalog.length];
      return { ...s, step: 'scanned', current: item, volumes: '', catalogIndex: s.catalogIndex + 1, scanSeq: s.scanSeq + 1, announce: T.scanned(item.sku), seq };
    }
    case 'SET_VOLUMES':
      return { ...s, volumes: a.value.replace(/\D/g, '').slice(0, 4) };
    case 'SAVE': {
      const n = parseInt(s.volumes, 10);
      if (!s.current) return s;
      if (!n || n <= 0) return { ...s, error: s.error + 1, announce: T.errCount, seq };
      const id = `p${seq}`;
      const pallet: Pallet = { id, sku: s.current.sku, desc: s.current.desc, lote: s.current.lote, volumes: n, status: 'triagem', synced: s.online };
      const queue = s.online ? s.queue : [...s.queue, id];
      const text = s.online ? T.saved : T.offlineSaved;
      return { ...s, step: 'triage', current: undefined, volumes: '', pallets: [pallet, ...s.pallets], queue, toast: { text, seq }, announce: s.online ? text : `${text} ${queue.length} ${queue.length === 1 ? 'leitura aguardando' : 'leituras aguardando'} rede.`, seq };
    }
    case 'START_ADDRESS':
      return { ...s, step: 'addressing', addressingId: s.addressingId === a.id ? undefined : a.id };
    case 'ASSIGN': {
      const pallets = s.pallets.map((p) => (p.id === s.addressingId ? { ...p, address: a.address, status: 'armazenado' as const } : p));
      return { ...s, step: 'stored', addressingId: undefined, pallets, toast: { text: T.stored(a.address), seq }, announce: T.stored(a.address), seq };
    }
    case 'TOGGLE_ONLINE':
      return { ...s, online: !s.online, announce: !s.online ? T.online : T.offline, seq };
    case 'DRAIN_ONE': {
      if (!s.queue.length) return s;
      const [id, ...rest] = s.queue;
      return { ...s, queue: rest, pallets: s.pallets.map((p) => (p.id === id ? { ...p, synced: true } : p)) };
    }
    case 'DRAIN_DONE':
      return { ...s, toast: { text: T.synced(a.n), seq }, announce: T.synced(a.n), seq };
    case 'TOGGLE_SOUND':
      return { ...s, sound: !s.sound };
    case 'RESET':
      return { ...initial, sound: s.sound, seq };
  }
}

/** Código de barras desenhado (decorativo). */
function Barcode() {
  const bars = [3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 2, 2, 1, 1, 3, 1, 1, 2, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2];
  let x = 0;
  return (
    <svg viewBox="0 0 120 40" preserveAspectRatio="none" aria-hidden="true">
      {bars.map((w, i) => {
        const r = i % 2 === 0 ? <rect key={i} x={x} y={0} width={w} height={40} fill="#1b2030" /> : null;
        x += w + 0.8;
        return r;
      })}
    </svg>
  );
}

export interface ScanSimulatorProps {
  catalog: Item[];
  totalAddresses: number;
  caption: string;
}

/** Simulador do fluxo do WMS com dados fictícios (DESIGN.md §6.2). */
export default function ScanSimulator({ catalog, totalAddresses, caption }: ScanSimulatorProps) {
  const [s, dispatch] = useReducer(reducer, initial);
  const reduced = useReducedMotion();
  const audio = useRef<AudioContext | null>(null);
  const qtyRef = useRef<HTMLInputElement>(null);
  const drained = useRef(0);
  const [typed, setTyped] = useState(0);
  const [toastOn, setToastOn] = useState(false);

  // Campos preenchidos caractere a caractere (18ms), salvo com movimento reduzido.
  useEffect(() => {
    if (!s.current) return;
    const max = Math.max(s.current.sku.length, s.current.desc.length, s.current.lote.length);
    if (reduced) {
      setTyped(max);
      return;
    }
    setTyped(0);
    let n = 0;
    const iv = window.setInterval(() => {
      n += 1;
      setTyped(n);
      if (n >= max) {
        window.clearInterval(iv);
        qtyRef.current?.focus({ preventScroll: true });
      }
    }, 18);
    return () => window.clearInterval(iv);
  }, [s.scanSeq, reduced]); // eslint-disable-line react-hooks/exhaustive-deps

  // Drenagem da fila: um item a cada 350ms quando a rede volta.
  useEffect(() => {
    if (!s.online) return;
    if (s.queue.length) {
      const t = window.setTimeout(() => {
        drained.current += 1;
        dispatch({ type: 'DRAIN_ONE' });
      }, 350);
      return () => window.clearTimeout(t);
    }
    if (drained.current > 0) {
      const n = drained.current;
      drained.current = 0;
      dispatch({ type: 'DRAIN_DONE', n });
    }
  }, [s.online, s.queue.length]);

  // Aviso por 2,4s.
  useEffect(() => {
    if (!s.toast) return;
    setToastOn(true);
    const t = window.setTimeout(() => setToastOn(false), 2400);
    return () => window.clearTimeout(t);
  }, [s.toast?.seq]); // eslint-disable-line react-hooks/exhaustive-deps

  const beep = () => {
    if (!s.sound) return;
    try {
      const ctx = (audio.current ??= new AudioContext());
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'square';
      o.frequency.value = 2200;
      g.gain.value = 0.05;
      o.connect(g).connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.08);
    } catch {
      /* sem áudio */
    }
  };
  const scan = () => {
    beep();
    dispatch({ type: 'SCAN', catalog });
  };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === ' ' || e.code === 'Space') && e.target === e.currentTarget) {
      e.preventDefault();
      scan();
    }
  };

  const used = new Set(s.pallets.map((p) => p.address).filter(Boolean) as string[]);
  const suggestions = ADDRESS_POOL.filter((a) => !used.has(a)).slice(0, 3);
  const waiting = s.pallets.filter((p) => p.status === 'triagem').length;
  const stored = s.pallets.filter((p) => p.status === 'armazenado').length;
  const totalVol = s.pallets.reduce((acc, p) => acc + p.volumes, 0);
  const cur = s.current;
  const show = (v?: string) => (v ? v.slice(0, typed) : '');
  const volNum = parseInt(s.volumes, 10) || 0;

  return (
    <div onKeyDown={onKey} tabIndex={0} role="group" aria-label="Simulador do WMS: a barra de espaço puxa o gatilho" style={{ outline: 'none' }} className="sim-root">
      <Stage
        figure={T.figure}
        padding="none"
        className="sim"
        tools={
          <>
            <button type="button" className="stage-btn" onClick={() => dispatch({ type: 'TOGGLE_SOUND' })} aria-pressed={s.sound}>
              {s.sound ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
              {T.sound}
            </button>
            <button type="button" className="stage-btn" onClick={() => dispatch({ type: 'RESET' })}>
              <RotateCcw aria-hidden="true" />
              {T.reset}
            </button>
          </>
        }
      >
        <div className="sim__grid">
          <DeviceFrame>
            <div className="sim__screen-h">
              <span>{T.screen}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                {s.online ? <Wifi size={13} aria-hidden="true" /> : <WifiOff size={13} aria-hidden="true" />}
                {s.online ? T.online : T.offline}
              </span>
            </div>
            <div className="sim__barcode">
              <Barcode />
              {!reduced && (
                <m.span
                  key={s.scanSeq}
                  className="sim__laser"
                  initial={{ x: '-110%' }}
                  animate={{ x: s.scanSeq ? '110%' : '-110%' }}
                  transition={{ duration: 0.28, ease: 'linear' }}
                  aria-hidden="true"
                />
              )}
            </div>
            <button type="button" className="btn btn--scan" onClick={scan}>
              <ScanBarcode aria-hidden="true" />
              {T.trigger}
            </button>
            <div className="sim__field">
              <span className="k">{T.sku}</span>
              <output aria-label={T.sku}>{show(cur?.sku)}</output>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 8 }}>
              <div className="sim__field">
                <span className="k">{T.lote}</span>
                <output aria-label={T.lote}>{show(cur?.lote)}</output>
              </div>
              <div className="sim__field">
                <span className="k">{T.desc}</span>
                <output aria-label={T.desc}>{show(cur?.desc)}</output>
              </div>
            </div>
            <div className="sim__field">
              <label htmlFor="sim-qtd">{T.volumes}</label>
              <m.div className="sim__qty" key={`q${s.error}`} animate={s.error && !reduced ? { x: [0, -6, 6, -6, 6, -6, 0] } : { x: 0 }} transition={{ duration: 0.24 }}>
                <button type="button" aria-label="Menos um volume" disabled={!cur} onClick={() => dispatch({ type: 'SET_VOLUMES', value: String(Math.max(volNum - 1, 0) || '') })}>
                  <Minus aria-hidden="true" />
                </button>
                <input
                  ref={qtyRef}
                  id="sim-qtd"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder={cur ? String(cur.volumes) : ''}
                  value={s.volumes}
                  disabled={!cur}
                  aria-invalid={s.error > 0 && !volNum && !!cur ? true : undefined}
                  aria-describedby="sim-erro"
                  onChange={(e) => dispatch({ type: 'SET_VOLUMES', value: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') dispatch({ type: 'SAVE' });
                  }}
                />
                <button type="button" aria-label="Mais um volume" disabled={!cur} onClick={() => dispatch({ type: 'SET_VOLUMES', value: String(volNum + 1) })}>
                  <Plus aria-hidden="true" />
                </button>
              </m.div>
              <p className="sim__err" id="sim-erro">
                {s.error > 0 && cur && !volNum ? T.errCount : ''}
              </p>
            </div>
            <button type="button" className="btn btn--save" onClick={() => dispatch({ type: 'SAVE' })} aria-disabled={!cur || !volNum ? true : undefined} disabled={!cur}>
              {T.save}
            </button>
          </DeviceFrame>

          <div className="sim__panel">
            <dl className="sim__kpis" style={{ margin: 0 }}>
              <div>
                <dt className="k">{T.kpiWaiting}</dt>
                <dd className="v" style={{ margin: 0 }}>{waiting}</dd>
              </div>
              <div>
                <dt className="k">{T.kpiStored}</dt>
                <dd className="v" style={{ margin: 0 }}>{stored}</dd>
              </div>
              <div>
                <dt className="k">{T.kpiVolumes}</dt>
                <dd className="v" style={{ margin: 0 }}>{totalVol}</dd>
              </div>
            </dl>
            <div className="sim__occ">
              <span className="k">{T.occupancy}</span>
              <div className="cells" role="img" aria-label={`${T.occupancy}: ${stored} de ${totalAddresses} posições`}>
                {Array.from({ length: 24 }, (_, i) => (
                  <i key={i}>{i < stored && <m.b initial={reduced ? false : { scale: 0 }} animate={{ scale: 1 }} transition={spring.bouncy} />}</i>
                ))}
              </div>
              <span className="n">
                {stored} / {totalAddresses}
              </span>
            </div>
            <ul className="sim__list" aria-label="Pallets">
              {s.pallets.length === 0 && <li className="sim__empty">{T.empty}</li>}
              <AnimatePresence initial={false}>
                {s.pallets.map((p) => (
                  <m.li
                    key={p.id}
                    className="sim__pallet"
                    layout={reduced ? false : 'position'}
                    initial={reduced ? false : { opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={spring.soft}
                  >
                    <button
                      type="button"
                      className="sim__pallet-row"
                      disabled={p.status !== 'triagem'}
                      aria-expanded={p.status === 'triagem' ? s.addressingId === p.id : undefined}
                      onClick={() => dispatch({ type: 'START_ADDRESS', id: p.id })}
                      title={p.status === 'triagem' ? T.tapToAddress : undefined}
                    >
                      <span className="sku">{p.sku}</span>
                      <span className="desc">
                        {p.desc} · {p.volumes} vol.{p.address ? ` · ${p.address}` : ''}
                      </span>
                      <span className={`badge ${p.status === 'triagem' ? 'badge--wip' : 'badge--live'}`}>{p.status === 'triagem' ? T.badgeWaiting : T.badgeStored}</span>
                      {p.synced ? (
                        <span className="badge">
                          <Check aria-hidden="true" />
                          {T.badgeSynced}
                        </span>
                      ) : (
                        <span className="badge badge--queue">{T.badgeQueue}</span>
                      )}
                    </button>
                    {s.addressingId === p.id && (
                      <div className="sim__addr" role="group" aria-label={T.choose}>
                        <span className="k">{T.choose}</span>
                        {suggestions.map((a) => (
                          <button key={a} type="button" onClick={() => dispatch({ type: 'ASSIGN', address: a })}>
                            {a}
                          </button>
                        ))}
                      </div>
                    )}
                  </m.li>
                ))}
              </AnimatePresence>
            </ul>
            <div className="sim__net">
              <span className="k">
                {T.net}
                <SegmentedControl
                  options={[
                    { value: 'on', label: T.online },
                    { value: 'off', label: T.offline },
                  ]}
                  value={s.online ? 'on' : 'off'}
                  onChange={(v) => {
                    if ((v === 'on') !== s.online) dispatch({ type: 'TOGGLE_ONLINE' });
                  }}
                  ariaLabel={T.net}
                  layoutId="sim-rede"
                  tone="stage"
                  size="sm"
                />
              </span>
              <span className="sim__queue">
                {s.queue.length === 0 && s.pallets.length > 0 && <Check aria-hidden="true" />}
                {T.queue(s.queue.length)}
              </span>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {toastOn && s.toast && (
            <m.div key={s.toast.seq} className="sim__toast" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={spring.sheet} aria-hidden="true">
              {s.toast.text}
            </m.div>
          )}
        </AnimatePresence>
      </Stage>
      <p className="sr-only-fix" aria-live="polite">
        {s.announce}
      </p>
      <p className="fig-caption">{caption}</p>
    </div>
  );
}
