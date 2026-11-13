import { architecture, delivery, diagnosis, nextRevision, simulator, symptom, tour } from '../../../content/cases/wms-pro';
import { useIsTouch } from '../../../lib/hooks';
import { CaseSection, DeliveryList, DiagnosisCards, NextRevision, Prose } from '../CaseParts';
import { ScreenTour } from '../ScreenTour';
import { LazyBlock } from '../LazyBlock';
import { Reveal } from '../../ui/Reveal';
import type { ArchLayout } from '../ArchitectureDiagram';
import type { ScanSimulatorProps } from '../wms/ScanSimulator';

const loadSim = () => import('../wms/ScanSimulator');
const loadArch = () => import('../ArchitectureDiagram');

/** Caminho de uma leitura (DESIGN.md §11.6 · Esquema). */
const WIDE: ArchLayout = {
  w: 980,
  h: 300,
  nodes: [
    { id: 'coletor', label: 'Coletor / celular / desktop', sub: 'React 19 + Vite 8', x: 0, y: 70, w: 230, h: 80, accent: true },
    { id: 'fila', label: 'Armazenamento local', sub: '+ fila de sincronização', x: 270, y: 70, w: 210, h: 80 },
    { id: 'api', label: 'API serverless', sub: 'Vercel', x: 520, y: 70, w: 190, h: 80 },
    { id: 'db', label: 'PostgreSQL', sub: 'Supabase', x: 750, y: 70, w: 230, h: 80 },
    { id: 'nest', label: 'Servidor NestJS', sub: 'opcional, instalação local', x: 495, y: 205, w: 240, h: 80, dashed: true },
  ],
  edges: [
    { d: 'M230 110 H268' },
    { d: 'M480 110 H518' },
    { d: 'M710 110 H748' },
    { d: 'M735 245 H865 V152', dashed: true },
  ],
};
const NARROW: ArchLayout = {
  w: 340,
  h: 470,
  nodes: [
    { id: 'coletor', label: 'Coletor / celular / desktop', sub: 'React 19 + Vite 8', x: 20, y: 0, w: 300, h: 70, accent: true },
    { id: 'fila', label: 'Armazenamento local', sub: '+ fila de sincronização', x: 20, y: 110, w: 300, h: 70 },
    { id: 'api', label: 'API serverless', sub: 'Vercel', x: 0, y: 240, w: 160, h: 70 },
    { id: 'nest', label: 'Servidor NestJS', sub: 'opcional, local', x: 180, y: 240, w: 160, h: 70, dashed: true },
    { id: 'db', label: 'PostgreSQL', sub: 'Supabase', x: 20, y: 390, w: 300, h: 70 },
  ],
  edges: [
    { d: 'M170 70 V108' },
    { d: 'M170 180 V210 H80 V238' },
    { d: 'M80 310 V350 H160 V388' },
    { d: 'M260 310 V350 H180 V388', dashed: true },
  ],
};

export default function WmsProBody() {
  const touch = useIsTouch();
  const simProps: ScanSimulatorProps = { catalog: simulator.catalog, totalAddresses: simulator.totalAddresses, caption: simulator.caption };
  return (
    <>
      <CaseSection n="01" title={symptom.title}>
        <Prose paragraphs={symptom.paragraphs} />
      </CaseSection>
      <CaseSection n="02" title="Diagnóstico">
        <DiagnosisCards items={diagnosis} />
      </CaseSection>
      <CaseSection
        n="03"
        title={tour.title}
        wide
        intro={
          <Reveal className="prose">
            <p>{touch ? tour.introTouch : tour.intro}</p>
          </Reveal>
        }
      >
        <ScreenTour screens={tour.screens} caption={tour.caption} />
      </CaseSection>
      <CaseSection
        n="04"
        title={simulator.title}
        wide
        intro={
          <Reveal className="prose">
            <h3 className="block-h">{simulator.heading}</h3>
            <p>{simulator.text}</p>
          </Reveal>
        }
      >
        <LazyBlock load={loadSim} props={simProps} minHeight={640} />
      </CaseSection>
      <CaseSection n="05" title={architecture.title}>
        <Reveal className="prose">
          <p>{architecture.text}</p>
        </Reveal>
        <LazyBlock load={loadArch} props={{ wide: WIDE, narrow: NARROW, caption: architecture.caption, description: architecture.text }} minHeight={320} />
      </CaseSection>
      <CaseSection n="06" title={delivery.title}>
        <Reveal>
          <h3 className="block-h">{delivery.heading}</h3>
        </Reveal>
        <DeliveryList items={delivery.items} />
        <Reveal className="d-note">
          <p>{delivery.note}</p>
        </Reveal>
      </CaseSection>
      <CaseSection n="07" title={nextRevision.title}>
        <NextRevision text={nextRevision.text} button={nextRevision.button} to="wms-saas" />
      </CaseSection>
    </>
  );
}
