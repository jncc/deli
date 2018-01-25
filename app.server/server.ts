
import * as express  from 'express'
import * as bodyParser from 'body-parser'
import * as _ from 'lodash'

import { pages } from './routes'
import { getEnvironmentSettings, getRealWmsUrl } from './settings'
import { getCapabilities } from './handlers/wms/getCapabilities'
import { getProducts } from './handlers/products/getProducts'
import { getCollections } from './handlers/collections/getCollections'
import { validateQuery } from './query/validateQuery'
import { parseQuerystring } from './query/parseQuerystring'
import { StoredQueryRepository, FakeStoredQueryRepository } from './data/storedQueryRepository'

let app = express()
let env = getEnvironmentSettings(app.settings.env)
let storedQueryRepository = env.dev ? new FakeStoredQueryRepository : new StoredQueryRepository()

// parse json body requests
app.use(bodyParser.json())

// realistic speeds at dev time
// if (env.dev) {
//   app.use((req, res, next) => setTimeout(next, 500))
// }

// custom wms GetCapabilites handler
app.get(`/wms/:key`, async (req, res) => {
  let storedQuery = await storedQueryRepository.load(req.params.key)
  let queryResult = getProducts(storedQuery.query)

  // get all the products out of the query result, ignoring the collection they're in
  let products = _.flatMap(queryResult.collections, c => c.products)

  let realWmsUrl = getRealWmsUrl(app.settings.env, req.header(`Host`) || '', req.protocol)
  let result = getCapabilities(products, realWmsUrl)

  res.set(`Content-Type`, `text/xml`)
  res.send(result)
})

// return collections to the ui
app.get(`/api/collections`, (req, res) => {
  let result = getCollections()
  res.json(result)
})

// return products to the ui
app.get(`/api/products`, (req, res) => {
  let q = parseQuerystring(req.query)
  validateQuery(q)
  let result = getProducts(q)
  res.json(result)
})

// store the query and give me a key for it
app.post(`/api/storedQueries`, async (req, res) => {
  let query = req.body
  validateQuery(query)
  let storedQuery = await storedQueryRepository.store(query)
  res.json({ key: storedQuery.id })
})

// single page app. any routes that are "pages" need to return the index.html
// and allow the client-side router to show the correct page
app.get(pages, (req, res) => {
  console.log(req.url)
  res.sendFile('index.html', { root: env.dir })
})
// serve our html pages
// (note: webpack-dev-server serves the index.html pages from in-memory and doesn't reach this server)
// for (let page of pages) {
//   app.get(page.path, (req, res) => {
//     res.sendFile(page.file, { root: env.dir })
//   })
// }

// exercise error handling
app.get(`/error`, (req, res) => {
  throw 'You made an error!'
})

app.get(`/500`, (req, res) => {
  res.sendFile('errors/500.html', { root: env.dir })
})

// serve static files from the specified directory
app.use(express.static(env.dir))

// no matches yet, return 404
app.use((req, res) => {
  res.status(404)
  res.sendFile('errors/404.html', { root: env.dir })
})

// error, return 500
if (!env.dev) {
  app.use((err: any, req: any, res: any, next: any) => {
    res.status(500)
    res.sendFile('errors/500.html', { root: env.dir })
  })
}

// start the express web server
app.listen(env.port, () => {
  console.log(`it's ` + new Date().toISOString())
  console.log(`app.server is listening on: http://localhost:${env.port}`)
  console.log(`node environment is ${env.name}`)
})

let errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
}
