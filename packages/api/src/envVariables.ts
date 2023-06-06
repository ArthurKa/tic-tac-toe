function getEnvVariable(name: string): string {
  // eslint-disable-next-line no-process-env
  const value = process.env[name];

  if(!value) {
    throw new Error(`Please, provide "${name}" .env variable.`);
  }

  return value;
}

/** @example 'development' */
export const NODE_ENV = (
  getEnvVariable('NODE_ENV') === 'production'
    ? 'production'
    : 'development'
);

/** @example 'http://localhost' */
export const HOST = getEnvVariable('HOST');

/** @example 3001 */
export const PORT = +getEnvVariable('PORT');

/** @example 'http://localhost:3002' */
export const WEBSITE_URL = getEnvVariable('WEBSITE_URL');
