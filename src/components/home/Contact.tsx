import { ArrowRight, ArrowUpRight, FileDown } from 'lucide-react';
import { contact } from '../../content/site';
import { Cota } from '../layout/Section';
import { Reveal } from '../ui/Reveal';
import { CopyButton } from '../ui/CopyButton';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcon';
import { asset } from '../../lib/paths';

/** 05 · Contato em palco azul (DESIGN.md §4.7, §11.12). E-mail e currículo só aparecem se preenchidos em site.ts. */
export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-titulo" className="section below-fold" style={{ paddingBottom: 'clamp(40px, 5vw, 64px)' }}>
      <div className="wrap">
        <Reveal className="stage contact" y={28}>
          <div>
            <Cota n={contact.n} label={contact.label} />
            <h2 id="contato-titulo">{contact.title}</h2>
            <p className="contact__text">{contact.text}</p>
            <a className="btn btn--primary" href={contact.cta.href} target="_blank" rel="noopener">
              {contact.cta.label}
              <ArrowRight aria-hidden="true" className="arrow" />
            </a>
          </div>
          <ul className="contact-list">
            {contact.items.map((it) => (
              <li key={it.label}>
                <a href={it.href} target="_blank" rel="noopener">
                  <span className="k">{it.label}</span>
                  <span className="v">
                    {it.label === 'GitHub' ? <GithubIcon size={14} /> : <LinkedinIcon size={14} />} {it.value}
                  </span>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </li>
            ))}
            {contact.email && (
              <li>
                <div className="row">
                  <span className="k">E-mail</span>
                  <a className="v" href={`mailto:${contact.email}`} style={{ display: 'block', minHeight: 0 }}>
                    {contact.email}
                  </a>
                  <CopyButton value={contact.email} label="e-mail" />
                </div>
              </li>
            )}
            {contact.resume && (
              <li>
                <a href={asset(contact.resume.href)} download>
                  <span className="k">Currículo</span>
                  <span className="v">PDF</span>
                  <FileDown aria-hidden="true" />
                </a>
              </li>
            )}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
