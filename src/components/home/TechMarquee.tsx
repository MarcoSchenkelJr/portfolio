/**
 * Faixa de tecnologias em laço (DESIGN.md §7.4): CSS translateX 0 → -50% em 48s.
 * Pausa no hover e no foco; com movimento reduzido fica parada e quebra linha (CSS).
 */
export function TechMarquee({ items, speedSec = 48 }: { items: string[]; speedSec?: number }) {
  return (
    <div className="techs" tabIndex={0} role="group" aria-label="Tecnologias que uso (passe o cursor ou foque para pausar)">
      <ul className="techs__track" style={{ animationDuration: `${speedSec}s` }}>
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
        {items.map((t) => (
          <li key={`${t}-copia`} aria-hidden="true">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
