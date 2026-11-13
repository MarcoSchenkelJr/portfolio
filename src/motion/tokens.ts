/** Molas e durações (DESIGN.md §7.1). */
export const spring = {
  snappy: { type: 'spring', stiffness: 420, damping: 34, mass: 1 },
  soft: { type: 'spring', stiffness: 260, damping: 26, mass: 1 },
  bouncy: { type: 'spring', stiffness: 320, damping: 18, mass: 1 },
  sheet: { type: 'spring', stiffness: 300, damping: 32, mass: 1 },
  gentle: { type: 'spring', stiffness: 140, damping: 22, mass: 1 },
} as const;
export const ease = {
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
};
export const dur = { instant: 0.12, fast: 0.18, base: 0.25, slow: 0.6 } as const;
export const stagger = { tight: 0.04, base: 0.07, loose: 0.12 } as const;
/** molas para useSpring (sem o campo type) */
export const springValue = {
  gentle: { stiffness: 140, damping: 22, mass: 1 },
};
