
D-Node Deli
===========

Our "deli counter" web app to make spatial data products available to GIS users.

Development
-----------

The Deli is a Node.js client-server web application written in Typescript.

Install Node.js (Note: Ubuntu requires the `nodejs-legacy` package to create a `node` symlink
https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

    apt install nodejs-legacy

Install Typescript

    npm i -g typescript

You're good to go. 

    npm i
    npm run dev

A browser window will open at http://localhost:8080

Tip: It's often handy to run the Typescript compiler `tsc` to quickly check for compile errors.

Demoing
-------
To get all the S2-ARD products, increase the bounding box to [-14,50,4,60] and make the date range 2014 - 2018.

Deployment
----------

Pushing to `master` will deploy via Shippable to the live Elastic Beanstalk environment.

To deploy manually, without using Shippable, you'll need to set up the AWS command line interface.
See http://blog.shippable.com/how-to-deploy-to-elastic-beanstalk-part-1 which also contains instructions for creating new Elastic Beanstalk environments.

    pip install --upgrade --user awsebcli
    eb --version

Make sure you have committed any code you want to deploy to your local Git repo, or the beanstalk CLI will ignore it!

    npm run build:prod
    eb deploy

The Deli requires access to two backend services; Postgres database and Geoserver. This is not described here.

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
