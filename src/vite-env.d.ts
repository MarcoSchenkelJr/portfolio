/// <reference types="vite/client" />

declare module 'virtual:code/*' {
  const code: { html: string; lines: number; raw: string };
  export default code;
}
