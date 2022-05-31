import { loadableReady } from '@loadable/component'
import { hydrateRoot } from 'react-dom/client'

import { App } from './app'

loadableReady(() => {
  hydrateRoot(document.getElementById('app')!, <App />)
})
