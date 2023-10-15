/* eslint-disable @typescript-eslint/no-explicit-any */
import { parse, type ParserOptions } from '@babel/parser';
import type { Node } from '@babel/types';

function isNode(obj: any): obj is Node {
    return obj && typeof obj === 'object';
}

function findImports(node: Node, imports: string[] = []) {
    if (node.type === 'ImportDeclaration' || node.type === 'ExportAllDeclaration') {
        imports.push(node.source.value);
    } else if (node.type === 'ExportNamedDeclaration' && node.source) {
        imports.push(node.source.value);
    }

    for (const key in node) {
        if (isNode((<any>node)[key])) {
            findImports((<any>node)[key], imports);
        }
    }

    return imports;
}

/**
 * Find `import` and `re-export` statements.
 * @param {string} src Source, where `import` and `re-export` statements will be looked for.
 * @param {ParserOptions} options Options are the same as babel parser options.
 * @see https://babeljs.io/docs/babel-parser#options
 * @returns {string[]} Array of imported modules.
 *
 * @example
 *
 * `source.js`:
 * ```js
 * import moduleA from './module-a.js';
 * import moduleB from './module-b.js';
 * export * from './module-c.js';
 * ```
 *
 * `program.js`
 * ```js
 * import importsWalk from 'imports-walk';
 * import fs from 'fs';
 * const source = fs.readFileSync('source.js', 'utf8');
 *
 * importsWalk(source); // <= ['./module-a.js', './module-b.js', './module-c.js']
 * ```
 */
export default function (src: string, options: ParserOptions = {}): string[] {
    const ast = parse(src, {
        sourceType: 'module',
        ...options
    });

    return findImports(ast);
}
