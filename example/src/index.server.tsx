import { createReadStream, existsSync } from 'fs'
import { join } from 'path'
import { createServer } from 'http'

import { ChunkExtractor } from '@loadable/server'
import { renderToString } from 'react-dom/server'

import { App } from './app'

const statsFile = join(__dirname, 'stats.json')

const render = () => {
  const chunkExtractor = new ChunkExtractor({ statsFile, publicPath: '/' })
  const jsx = chunkExtractor.collectChunks(<App />)
  const html = renderToString(jsx)
  return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>@ts-plugin/loadable</title>
</head>

<body>
  <div id="app">${html}</div>
  ${chunkExtractor.getScriptTags()}
</body>

</html>`
}

createServer((req, res) => {
  if (req.url?.endsWith?.('.js')) {
    const filePath = join(__dirname, req.url)
    if (!existsSync(filePath)) {
      res.statusCode = 404
      res.end()
    } else {
      res.setHeader('Content-Type', 'text/javascript')
      createReadStream(filePath).pipe(res)
    }
  } else {
    res.write(render())
    res.end()
  }
}).listen(3000, undefined, undefined, () => {
  console.log('Server started on port 3000')
})
