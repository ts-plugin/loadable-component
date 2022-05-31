const { createLoadableNodeTransformer } = require('../index')

/** @type {() => import('typescript').CustomTransformers} */
const transformers = () => {
  return {
    before: [createLoadableNodeTransformer(process.env.BUILD_TYPE === 'ssr' ? 'node' : 'web')],
  }
}

module.exports = transformers
