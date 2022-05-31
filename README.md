# `@ts-plugin/loadable`

[![CI](https://github.com/ts-plugin/loadable-component/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/ts-plugin/loadable-component/actions/workflows/ci.yml)

## Install

- pnpm add @ts-plugin/loadable -D
- yarn add @ts-plugin/loadable -D
- npm install @ts-plugin/loadable --save-dev

## Usage

### With webpack

Checkout [example](./example/webpack.config.js) for the usage.

Clone this repository and run:

- `yarn install`
- `yarn build`
- `yarn build:example`
- `yarn start`

to play with the example.

```diff
// webpack.config.js

const { createLoadableNodeTransformer } = require('@ts-plugin/loadable')

module.export = {
  ...
  module: {
+   parser: {
+     javascript: {
+       commonjsMagicComments: true,
+     },
+   },
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: {
          loader: 'ts-loader',
          /** @type {import('ts-loader').Options} */
          options: {
+           happyPackMode: true,
            compilerOptions: {
+             module: 'esnext',
            },
+           getCustomTransformers: () => ({ before: [createLoadableNodeTransformer(process.env.BUILD_TYPE === 'ssr' ? 'node' : 'web')] }),
          },
        },
        exclude: [/node_modules/]
      },
    ],
  },
}
```
