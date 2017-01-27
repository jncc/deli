
d-node deli
============

A web app to make spatial data products available to GIS users.

Local development
-----------------

    npm install
    npm run dev

A browser window should open at http://localhost:8080

You can also run `tsc` to quickly compile and check for typescript errors.
Pushing to `master` will deploy via Shippable to the live environment.

Manual deployment to Elastic Beanstalk
--------------------------------------

You'll need to set up the AWS command line interface.
See http://blog.shippable.com/how-to-deploy-to-elastic-beanstalk-part-1

    pip install --upgrade --user awsebcli
    eb --version 

Make sure you have committed any code you want to deploy to Git, or the beanstalk CLI won't deploy it!

    npm run build:prod
    eb deploy
    