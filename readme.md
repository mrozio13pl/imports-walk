# imports-walk

> Find `import` and `re-export` statements using [babel parser](https://babeljs.io/docs/babel-parser).

## Install

```bash
npm i imports-walk
```

## Usage

`source.js`
```js
import moduleA from './module-a.js';
import moduleB from './module-b.js';
export * from './module-c.js';
```

`program.js`
```js
import importsWalk from 'imports-walk';
import fs from 'fs';
const source = fs.readFileSync('source.js', 'utf8');

importsWalk(source); // <= ['./module-a.js', './module-b.js', './module-c.js']
```

## API

### `importsWalk(src, options?)`

Looks for `import` and `re-export` statements.

#### `src`

Type: `String`<br>
Source, where `import` and `re-export` statements will be looked for.

#### `options`

Type: `Object`<br>
Options are the same as [babel parser options](https://babeljs.io/docs/babel-parser#options).

## License

MIT 💖