import type * as undici from 'undici';

declare global {
  export const {
    FormData,
    Headers,
    Request,
    Response,
    fetch,
  }: typeof undici;
}
