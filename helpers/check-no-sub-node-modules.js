// @ts-check
'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { workspaces: { packages } } = require('../package.json');

const packageNames = (
  execSync(`ls ${packages.join(' ')}`)
    .toString('utf-8')
    .split('\n')
    .filter(e => e.endsWith(':'))
    .map(e => e.slice(0, -1))
);

for(const pkg of packageNames) {
  try {
    fs.readdirSync(path.join(pkg, 'node_modules'));
    throw new Error(`Pay attention to existed ${pkg}/node_modules`);
  } catch(e) {
    if(!(e instanceof Error)) {
      throw new Error('This should never happen. ep3nwr');
    }

    if(!e.message.startsWith('ENOENT: no such file or directory')) {
      throw e;
    }
  }
}
