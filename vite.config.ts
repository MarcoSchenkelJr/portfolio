import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

/**
 * Realce de código em tempo de build (DESIGN.md §5.2, CodeBlock).
 * `import code from 'virtual:code/algoritmo_utilizado.py'` lê src/content/code/<arquivo>
 * e devolve { html, lines } já realçado pelo shiki com tema de variáveis CSS.
 * Nenhum realçador é enviado ao navegador.
 */
function shikiCode(): Plugin {
  const PREFIX = 'virtual:code/';
  const RESOLVED = '\0' + PREFIX;
  const langOf = (file: string) => (file.endsWith('.py') ? 'python' : file.endsWith('.sql') ? 'sql' : 'ts');
  return {
    name: 'portfolio-shiki-code',
    resolveId(id) {
      return id.startsWith(PREFIX) ? RESOLVED + id.slice(PREFIX.length) : undefined;
    },
    async load(id) {
      if (!id.startsWith(RESOLVED)) return undefined;
      const file = id.slice(RESOLVED.length);
      const path = resolve(import.meta.dirname, 'src/content/code', file);
      this.addWatchFile(path);
      const code = (await readFile(path, 'utf8')).replace(/\r\n/g, '\n').trimEnd();
      const { codeToHtml, createCssVariablesTheme } = await import('shiki');
      const theme = createCssVariablesTheme({ name: 'css-variables', variablePrefix: '--shiki-', fontStyle: true });
      const html = await codeToHtml(code, { lang: langOf(file), theme });
      return `export default ${JSON.stringify({ html, lines: code.split('\n').length, raw: code })};`;
    },
  };
}

export default defineConfig({
  base: '/portfolio/',
  plugins: [react(), tailwindcss(), shikiCode()],
  server: { port: 5180, strictPort: false },
  preview: { port: 4173 },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    assetsInlineLimit: 0,
    reportCompressedSize: true,
  },
});
