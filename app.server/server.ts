
import * as express from "express";
import { getEnvironmentSettings, getRealWmsUrl } from "./settings";
import { getCapabilities } from "./handlers/wms/getCapabilities";
import { getProducts } from "./handlers/products/getProducts";
import { getQuery } from "./query/queryKeyManager";
import { getKey } from "./query/queryKeyManager";
import { parseQuery } from "./query/parseQuery";

let app = express();
let env = getEnvironmentSettings(app.settings.env);

// custom wms GetCapabilites handler
app.get(`/wms/:key`, (req, res) => {

  let query = getQuery(req.params.key)
  let products = getProducts(query);

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

app.get(`/key`, (req, res) => {
  let query = parseQuery(req.query);
  let key = getKey(query);
  res.json({ key: key });
});

// serve static files from the following directory
app.use(express.static(env.dir));

// start the express web server
app.listen(env.port, () => {
  console.log(`app.server listening on: http://localhost:${env.port}`);
  console.log(`node environment is ${env.name}`);
});

