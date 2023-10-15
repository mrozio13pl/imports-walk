import { test } from 'uvu';
import { equal } from 'uvu/assert';
import importsWalk from '../dist/index.js';

import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const src = fs.readFileSync(path.join(__dirname, './src.js'), 'utf8');

test('get `import` and `re-export` statements', () => {
    const res = importsWalk(src);

    equal(res, [
        'fs',
        'path',
        'node:http',
        'node:test',
        'assert/strict',
        'console'
    ])
});

test.run();