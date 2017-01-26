
import * as express from "express";
//import * as _ from "lodash";
import { getEnvironmentSettings, getWmsUrl } from "./settings";
import { products } from "./data/products";
import { getCapabilities } from "./capabilities/capabilities";
import { getProducts } from "./products/products";

let app = express();
let env = getEnvironmentSettings(app.settings.env);

// wms GetCapabilites handler
app.get(`/gc/:key`, (req, res) => {
  let wmsUrl = getWmsUrl(req.header(`Host`), req.protocol);
  let result = getCapabilities(products, wmsUrl);
  res.set(`Content-Type`, `text/xml`);
  res.send(result);
});

// query handler for ui
app.get(`/products`, (req, res) => {
  let result = getProducts(req.query);
  res.json(result);
});

// serve static files from the following directory
app.use(express.static(env.dir));

// start the express web server
app.listen(env.port, () => {
  console.log(`app.server listening on: http://localhost:${env.port}`);
  console.log(`node environment is ${env.name}`);
});

