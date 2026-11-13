import { useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { notFound, site } from '../content/site';
import { useDocumentMeta } from '../lib/hooks';
import { ButtonLink } from '../components/ui/Button';

export default function NotFound() {
  const h1 = useRef<HTMLHeadingElement>(null);
  useDocumentMeta({ title: notFound.seoTitle, description: site.description, path: '/', ogImage: site.ogImage });
  useEffect(() => {
    h1.current?.focus({ preventScroll: true });
  }, []);
  return (
    <main id="conteudo" className="wrap nf">
      <p className="mono code-n">404 · não encontrado</p>
      <h1 ref={h1} tabIndex={-1} style={{ outline: 'none' }}>
        {notFound.title}
      </h1>
      <p>{notFound.text}</p>
      <div>
        <ButtonLink to="/" iconLeft={ArrowLeft}>
          {notFound.cta}
        </ButtonLink>
      </div>
    </main>
  );
}
