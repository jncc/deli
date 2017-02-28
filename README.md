
d-node deli
============

A web app to make spatial data products available to GIS users.

Development
-----------
    Ubuntu requires nodejs-legacy package to create node symlink
    https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
    sudo apt install nodejs-legacy

    npm install
    npm run dev

A browser window should open at http://localhost:8080

You can also run `tsc` to quickly compile and check for typescript errors.

Deployment
----------

Pushing to `master` will deploy via Shippable to the live Elastic Beanstalk environment.

To deploy manually, without using Shippable, you'll need to set up the AWS command line interface.
See http://blog.shippable.com/how-to-deploy-to-elastic-beanstalk-part-1

    pip install --upgrade --user awsebcli
    eb --version

Make sure you have committed any code you want to deploy to Git, or the beanstalk CLI won't deploy it!

    npm run build:prod
    eb deploy
    
Using Postman to access the HTTP API
------------------------------------

To get the product metadata with an example query

- `GET` http://localhost:8080/products?dataset=s2-ard&bbox=-15&bbox=45&bbox=15&bbox=65&start=2016-06-01&end=2016-06-31

To generate a custom WMS link,  `POST` to http://localhost:8080/storedQueries

Put the payload in the `Body`, select `raw` and set the content type to `JSON (application/json)`, then paste in a valid JSON query like this:

    {
        "dataset": "s2-ard",
        "bbox":  [-15, 45, 15, 65],
        "start": "2016-06-01",
        "end":   "2016-06-31"
    }

You will be given a new stored query key which lets you construct a custom WMS URL like 

- `GET` http://localhost:8080/wms/fS6Wn3X0nJcW

For a pre-cooked example

- `GET` http://localhost:8080/wms/june2016demo

