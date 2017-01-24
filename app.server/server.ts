
import * as express from "express";

import { getEnvironmentSettings, getWmsUrl } from "./settings";
import { products } from "./data/products";
import { getCapabilities } from "./capabilities/capabilities";
import { handleLayers } from "./layers/layers";

let app = express();
let env = getEnvironmentSettings(app.settings.env);

// handle http data requests

app.get(`/capabilities`, (req, res) => {
  let wmsUrl = getWmsUrl(req.header(`Host`));
  let result = getCapabilities(products, wmsUrl);
  res.set(`Content-Type`, `text/xml`);
  res.send(result);
});

app.get(`/layers`, (req, res) => {
  let result = handleLayers(req.query);
  res.json(result);
});

// serve static files from the following directory
app.use(express.static(env.dir));

// start the express web server
app.listen(env.port, () => {
  console.log(`app.server listening on: http://localhost:${env.port}`);
  console.log(`node environment is ${env.name}`);
});

