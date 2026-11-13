import { ArrowUpRight, Lock } from 'lucide-react';
import { demo, demoText } from '../../../content/cases/wms-pro';
import { wmsPro } from '../../../content/cases/meta';
import { DemoAccess } from '../DemoAccess';

/** Topo do WMS Pro: link do sistema real (acesso restrito) e a caixa da demonstração. */
export default function WmsProHeroExtra() {
  const live = wmsPro.links.live!;
  return (
    <>
      <div className="d-hero__actions">
        <a className="btn btn--ghost" href={live.href} target="_blank" rel="noopener">
          <Lock aria-hidden="true" />
          {live.label}
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <DemoAccess url={demo.url} user={demo.user} password={demo.password} text={demoText} />
    </>
  );
}
