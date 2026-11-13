import { diagnosis, roadmap, schema, symptom } from '../../../content/cases/wms-saas';
import { sprints } from '../../../content/cases/meta';
import { CaseSection, DiagnosisCards, Prose } from '../CaseParts';
import { Stage } from '../../ui/Stage';
import { Reveal } from '../../ui/Reveal';
import TenantDiagram from '../saas/TenantDiagram';
import PickingPolicyDemo from '../saas/PickingPolicyDemo';
import { SprintTrack } from '../saas/SprintTrack';

export default function WmsSaasBody() {
  return (
    <>
      <CaseSection n="01" title={symptom.title}>
        <Prose paragraphs={symptom.paragraphs} />
      </CaseSection>
      <CaseSection n="02" title="Diagnóstico">
        <DiagnosisCards items={diagnosis} />
      </CaseSection>
      <CaseSection n="03" title={schema.title}>
        <Reveal>
          <Stage figure={['fig. 03 · ', 'isolamento por empresa']} padding="md" style={{ paddingTop: 48 }}>
            <TenantDiagram />
          </Stage>
        </Reveal>
        <div style={{ marginTop: 40 }}>
          <Reveal>
            <PickingPolicyDemo />
          </Reveal>
        </div>
      </CaseSection>
      <CaseSection n="04" title={roadmap.title} wide>
        <SprintTrack sprints={sprints} states={roadmap.states} />
        <Reveal className="prose" style={{ marginTop: 28 }}>
          <p>{roadmap.closing}</p>
        </Reveal>
      </CaseSection>
    </>
  );
}
