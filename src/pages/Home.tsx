import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { metrics, site, techs } from '../content/site';
import { useDocumentMeta } from '../lib/hooks';
import { Hero } from '../components/home/Hero';
import { MetricsBand } from '../components/home/MetricsBand';
import { TechMarquee } from '../components/home/TechMarquee';
import { About } from '../components/home/About';
import { Projects } from '../components/home/Projects';
import { DataLab } from '../components/home/DataLab';
import { StackSection } from '../components/home/StackSection';
import { Contact } from '../components/home/Contact';

const HOME_META = { title: site.title, description: site.description, path: '/', ogImage: site.ogImage };

export default function Home() {
  const location = useLocation();
  useDocumentMeta(HOME_META);

  // Rola até a seção pedida: /#secao ou state.scrollTo (voltar de um case aberto como página).
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo ?? (location.hash ? decodeURIComponent(location.hash.slice(1)) : '');
    if (!target) return;
    const t = window.setTimeout(() => {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
    }, 60);
    return () => window.clearTimeout(t);
  }, [location.key]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main id="conteudo" tabIndex={-1} style={{ outline: 'none' }}>
      <div id="topo">
        <Hero />
        <MetricsBand items={metrics} />
        <div style={{ marginTop: 0 }}>
          <TechMarquee items={techs} />
        </div>
      </div>
      <About />
      <Projects />
      <DataLab />
      <StackSection />
      <Contact />
    </main>
  );
}
