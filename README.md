
D-Node Deli
===========

Our "deli counter" web app to make spatial data products available to GIS users.

Development
-----------

The Deli is a Node.js client-server web application written in Typescript.

Install Node.js at least v6 for your system. Node.js v8 appears to work fine too. I use nvm to switch beteen Node versions. Ubuntu may require the `nodejs-legacy` package to create a `node` symlink
https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions

Make sure you have globally installed Typescript and Yarn (a better package manager than NPM)

    npm i -g yarn
    npm i -g typescript

You're good to go.

    yarn install
    yarn run dev

A browser window will open at http://localhost:8080

Tip: It's often handy to run the Typescript compiler `tsc` to more quickly check for compile errors.

Adding packages
---------------
We use Yarn instead of npm to make our build deterministic. Make sure to **install any new packages with Yarn and not npm** - e.g.

    yarn add --exact react-date-picker

Style guide
-----------
This project has an `.editorconfig` file. Make sure to enable support in your editor. For VSCode, you need to install the EditorConfig extension.

Javascript and Typescript are fairly verbose, so we choose to optimise for whitespace.

- don't use `semicolons;` to terminate lines (they are unnecessary in Javascript)
- do use `'single quotes'` for strings
- **please** don't use `const` instead of `let` unless it's really a constant (accidental variable rebinding is not a real problem!)

Deployment
----------

Firstly note that there's additional information on the internal wiki. 

To create a new environment, see the internal wiki.

Pushing to a tenant branch like `eocoe` will deploy via Shippable to the relevant live Elastic Beanstalk environment.

To deploy manually, without using Shippable, you'll need to set up the AWS command line interface.
See http://blog.shippable.com/how-to-deploy-to-elastic-beanstalk-part-1 which also contains instructions for creating new Elastic Beanstalk environments.

    pip install --upgrade --user awsebcli
    eb --version

Make sure you have committed any code you want to deploy to your local Git repo, or the beanstalk CLI will ignore it!

    yarn run build:prod
    eb deploy

The Deli requires access to two backend services; Postgres database and Geoserver. This part of the system is not described here.


Using Postman to access the HTTP API
------------------------------------

To get the product metadata with an example query

- `GET` http://localhost:8080/api/products?collections=s2-ard&bbox=-15&bbox=45&bbox=15&bbox=65&start=2016-06-01&end=2016-06-31

To generate a custom WMS link,  `POST` to http://localhost:8080/api/storedQueries

Put the payload in the `Body`, select `raw` and set the content type to `JSON (application/json)`, then paste in a valid JSON query like this:

    {
        "collections": ["s2-ard"],
        "bbox":  [-15, 45, 15, 65],
        "start": "2016-06-01",
        "end":   "2016-06-31"
    }

You will be given a new stored query key which lets you construct a custom WMS URL like 

- `GET` http://localhost:8080/wms/fS6Wn3X0nJcW

For a pre-cooked example

- `GET` http://localhost:8080/wms/june2016demo

The pre-cooked examples are available in the development time fake in-memory database as well as the live Postgres database.

Thank you
---------
Thanks to [Browserstack](http://browserstack.com) for helping us out with cross-browser testing. Much appreciated! 
![Browserstack](https://www.browserstack.com/images/layout/browserstack-logo-600x315.png)
