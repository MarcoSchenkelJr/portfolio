import code from 'virtual:code/algoritmo_utilizado.py';
import { beforeAfter, challenges, delivery, diagnosis, embed, symptom, tour } from '../../../content/cases/pdi-studio';
import { useIsTouch } from '../../../lib/hooks';
import { CaseSection, DiagnosisCards, Prose } from '../CaseParts';
import { ScreenTour } from '../ScreenTour';
import { LazyBlock } from '../LazyBlock';
import { Reveal } from '../../ui/Reveal';
import { Picture } from '../../media/Picture';
import { CodeBlock } from '../pdi/CodeBlock';
import { startWarmup } from '../pdi/warmup';
import { useEffect } from 'react';

const loadBA = () => import('../pdi/BeforeAfter');
const loadEmbed = () => import('../pdi/PdiLiveEmbed');

export default function PdiStudioBody() {
  const touch = useIsTouch();
  useEffect(() => {
    startWarmup(embed.warmupUrl);
  }, []);
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
        <ScreenTour screens={tour.screens} frameLabel="pdistudio.vercel.app" />
      </CaseSection>
      <CaseSection n="04" title={beforeAfter.title} wide>
        <LazyBlock
          load={loadBA}
          props={{ pairs: beforeAfter.pairs, original: beforeAfter.original, processed: beforeAfter.processed, sliderLabel: beforeAfter.sliderLabel, heading: beforeAfter.heading }}
          minHeight={560}
        />
        <LazyBlock load={loadEmbed} props={{}} minHeight={520} />
      </CaseSection>
      <CaseSection n="05" title={challenges.title}>
        <ul className="challenges">
          {challenges.items.map((c, i) => (
            <Reveal as="li" key={c.title} index={i}>
              <Picture media={c.thumb} sizes="(min-width: 960px) 14vw, 45vw" fallbackLabel={c.title} />
              <div className="t">
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </CaseSection>
      <CaseSection n="06" title={delivery.title}>
        <Reveal className="prose">
          <h3 className="block-h">{delivery.heading}</h3>
          <p>{delivery.text}</p>
        </Reveal>
        <Reveal>
          <CodeBlock code={code} filename={delivery.filename} />
          <p className="fig-caption">{delivery.codeCaption}</p>
        </Reveal>
      </CaseSection>
    </>
  );
}
