import test from 'ava'
import ts from 'typescript'

import { createLoadableNodeTransformer } from '../index.js'

for (const target of ['node', 'web']) {
  test(`should be able to transform dynamic loadable component when target ${target}`, (t) => {
    const inputFile = `import loadable from '@loadable/component';
  export const Foryou = loadable(() => import('./foryou'));
  `

    const { outputText } = ts.transpileModule(inputFile, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ESNext,
      },
      transformers: {
        before: [createLoadableNodeTransformer(target)],
      },
    })
    t.snapshot(outputText)
  })

  test(`should be able to transform dynamic loadable component with config when target ${target}`, (t) => {
    const inputFile = `import loadable from '@loadable/component'

    import loadableConfig from '../../../shared/components/loadable-config'
    
    const Recharge = loadable(() => import('./recharge'), loadableConfig)
    
    export default Recharge`

    const { outputText } = ts.transpileModule(inputFile, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ESNext,
        jsx: ts.JsxEmit.Preserve,
      },
      transformers: {
        before: [createLoadableNodeTransformer(target)],
      },
    })
    t.snapshot(outputText)
  })
}
