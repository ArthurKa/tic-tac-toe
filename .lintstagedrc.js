// @ts-check
'use strict';

module.exports = ((/** @type {import('lint-staged').Config} */ e) => e)({
  '*.{t,j}s{x,}': files => {
    const filesObj = files.reduce((acc, cur) => {
      const match = cur.match(/^(packages\/.+?)\/(.+)/);

      const key = match?.[1] ?? '';
      const file = match?.[2] ?? cur;

      if(!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(file);

      return acc;
    }, /** @type {Record<string, string[]>} */ ({}));

    const linter = Object.entries(filesObj).map(([pkg, files]) => (
      `${pkg ? `npx -w=${pkg} ` : ''}eslint --max-warnings=0 ${files.join(' ')}`
    ));

    /** @type {string[]} */
    const checkTSPackages = [];

    if(filesObj['packages/common']) {
      checkTSPackages.push('api', 'website');
    } else {
      if(filesObj['packages/api']) {
        checkTSPackages.push('api');
      }
      if(filesObj['packages/website']) {
        checkTSPackages.push('website');
      }
    }

    return [
      ...linter,
      ...checkTSPackages.map(e => `npm run ${e}:ts:noWatch`),
    ];
  },
});
