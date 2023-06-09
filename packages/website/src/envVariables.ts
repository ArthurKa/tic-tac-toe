/* eslint-disable no-process-env */

function getEnvVariable(value: string | undefined, name: string): string {
  if(!value) {
    throw new Error(`Please, provide "${name}" .env variable.`);
  }

  return value;
}

const nodeEnv = getEnvVariable(process.env.NODE_ENV, 'NODE_ENV');

/** @example 'development' */
export const NODE_ENV = (
  nodeEnv === 'production'
    ? 'production'
    : nodeEnv === 'preview'
      ? 'preview'
      : 'development'
);

/** @example 'http://localhost' */
export const HOST = getEnvVariable(process.env.HOST, 'HOST');

/** @example 3002 */
export const PORT = +getEnvVariable(process.env.PORT, 'PORT');

/** @example http://localhost:3001 */
export const API_URL = getEnvVariable(process.env.API_URL, 'API_URL');
