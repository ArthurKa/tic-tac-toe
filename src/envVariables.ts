/* eslint-disable no-process-env */

function getEnvVariable(name: string, value: string | undefined): string {
  if(!value) {
    throw new Error(`Please, provide "${name}" .env variable.`);
  }

  return value;
}

/** @example 'development' */
export const NODE_ENV = (
  getEnvVariable('NODE_ENV', process.env.NODE_ENV) === 'development' ? 'development' : 'production'
);

/** @example 'http://localhost' */
export const HOST = getEnvVariable('HOST', process.env.HOST);

/** @example 3000 */
export const PORT = +getEnvVariable('PORT', process.env.PORT);
