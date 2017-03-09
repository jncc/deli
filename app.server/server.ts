
import * as express from "express";
import * as bodyParser from "body-parser"

import { getEnvironmentSettings, getRealWmsUrl } from "./settings";
import { getCapabilities } from "./handlers/wms/getCapabilities";
import { getProducts } from "./handlers/products/getProducts";
import { validateQuery } from "./query/validateQuery";
import { StoredQueryRepository, FakeStoredQueryRepository } from "./data/storedQueryRepository";

let app = express();
let env = getEnvironmentSettings(app.settings.env);
let storedQueryRepository = env.dev ? new FakeStoredQueryRepository : new StoredQueryRepository();

process.on('unhandledRejection', r => console.log(r));

// parse json body requests
app.use(bodyParser.json());

// custom wms GetCapabilites handler
app.get(`/wms/:key`, async (req, res) => {

  let storedQuery = await storedQueryRepository.load(req.params.key)
  let queryResult = getProducts(storedQuery.query);

  // get all the products out of the query result, ignoring the collection they're in
  let products = queryResult.collections.map(c => c.products).reduce((a, b) => a.concat(b));

  let realWmsUrl = getRealWmsUrl(app.settings.env, req.header(`Host`), req.protocol);
  let result = getCapabilities(products, realWmsUrl);

  res.set(`Content-Type`, `text/xml`);
  res.send(result);
});

// return product metadata to the ui
app.get(`/products`, (req, res) => {
  validateQuery(req.query);
  let result = getProducts(req.query);
  res.json(result);
});

// store the query and give me a key for it
app.post(`/storedQueries`, async (req, res) => {
  let query = req.body;
  validateQuery(query);
  let storedQuery = await storedQueryRepository.store(query);
  res.json({ key: storedQuery.id });
});

// serve static files from the specified directory
app.use(express.static(env.dir));

// start the express web server
app.listen(env.port, () => {
  console.log(`it's ` + new Date().toISOString());
  console.log(`app.server is listening on: http://localhost:${env.port}`);
  console.log(`node environment is ${env.name}`);
});

