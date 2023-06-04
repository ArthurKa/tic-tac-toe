// @ts-check
'use strict';

const fs = require('fs');
const path = require('path');

const { workspaces: { packages } } = require('../package.json');

for(const pkg of packages) {
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
