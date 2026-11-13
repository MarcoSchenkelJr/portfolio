import { delivery, diagnosis, game, symptom } from '../../../content/cases/antigravity';
import { CaseSection, DeliveryList, DiagnosisCards, Prose } from '../CaseParts';
import { Reveal } from '../../ui/Reveal';
import { BrowserFrame, Stage } from '../../ui/Stage';
import { Picture } from '../../media/Picture';
import { GameEmbed } from '../antigravity/GameEmbed';
import { LazyBlock } from '../LazyBlock';

const loadSpeech = () => import('../antigravity/SpeechTryout');

export default function AntigravityBody() {
  return (
    <>
      <CaseSection n="01" title={symptom.title}>
        <Prose paragraphs={symptom.paragraphs} />
      </CaseSection>
      <CaseSection n="02" title="Diagnóstico">
        <DiagnosisCards items={diagnosis} />
      </CaseSection>
      <CaseSection n="03" title={game.title} wide>
        <Reveal>
          <GameEmbed />
        </Reveal>
        <div style={{ marginTop: 24 }}>
          <LazyBlock load={loadSpeech} props={{}} minHeight={0} />
        </div>
      </CaseSection>
      <CaseSection n="04" title={delivery.title}>
        <Reveal>
          <h3 className="block-h">{delivery.heading}</h3>
        </Reveal>
        <DeliveryList items={delivery.items} />
        <Reveal style={{ marginTop: 28 }}>
          <Stage figure={['fig. 04 · ', 'estatísticas por palavra']} padding="md">
            <BrowserFrame label="antigravity · word stats">
              <Picture media={delivery.stats} sizes="(min-width: 960px) 56vw, 92vw" fallbackLabel="antigravity · estatísticas" />
            </BrowserFrame>
          </Stage>
        </Reveal>
      </CaseSection>
    </>
  );
}
