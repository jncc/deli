
import * as express from "express";
import * as bodyParser from "body-parser"
import { getEnvironmentSettings, getRealWmsUrl } from "./settings";
import { getCapabilities } from "./handlers/wms/getCapabilities";
import { getProducts } from "./handlers/products/getProducts";
import { parseQuery } from "./query/parseQuery";
import { StoredQueryRepository } from "./data/storedQueryRepository";

let app = express();
let env = getEnvironmentSettings(app.settings.env);
let storedQueryRepository = new StoredQueryRepository();

process.on('unhandledRejection', r => console.log(r));

// parse json body requests
app.use(bodyParser.json());

// custom wms GetCapabilites handler
app.get(`/wms/:key`, async (req, res) => {

  let storedQuery = await storedQueryRepository.load(req.params.key)
  let products = getProducts(storedQuery.query);

  let realWmsUrl = getRealWmsUrl(app.settings.env, req.header(`Host`), req.protocol);
  let result = getCapabilities(products, realWmsUrl);

  res.set(`Content-Type`, `text/xml`);
  res.send(result);
});

// query handler for ui
app.get(`/products`, (req, res) => {
  let query = parseQuery(req.query);
  let result = getProducts(query);
  res.json(result);
});

// store the query and give me a key for it
app.post(`/storedQueries`, async (req, res) => {
  let query = parseQuery(req.body);
  let storedQuery = await storedQueryRepository.store(query);
  res.json({ key: storedQuery.key });
});

// serve static files from the following directory
app.use(express.static(env.dir));

// start the express web server
app.listen(env.port, () => {
  console.log(`app.server listening on: http://localhost:${env.port}`);
  console.log(`node environment is ${env.name}`);
});

