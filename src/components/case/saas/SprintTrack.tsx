import type { SprintState } from '../../../content/types';
import { Reveal } from '../../ui/Reveal';

/** Trilha de sprints 0 a 6 (DESIGN.md §6.3); lista vertical no celular. */
export function SprintTrack({ sprints, states }: { sprints: SprintState[]; states: Record<SprintState['state'], string> }) {
  return (
    <ol className="sprint-track">
      {sprints.map((s, i) => (
        <Reveal as="li" key={s.n} index={i} className={s.state}>
          <span className="sprint__node" aria-hidden="true">
            {s.n}
          </span>
          <span className="sprint__state">
            <span className="sr-only-fix">Sprint {s.n}: </span>
            {states[s.state]}
          </span>
          <span className="sprint__title">{s.title}</span>
        </Reveal>
      ))}
    </ol>
  );
}
