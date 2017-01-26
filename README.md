
d-node deli
============

A web app to make spatial data products available to GIS users.

Local development
-----------------

    npm install
    npm run dev

A browser window should open at http://localhost:8080

To run as a Docker image
------------------------

For some reason or other.

    docker build -t deli . 
    docker run -t -p 8888:80 deli

Deployment to Elastic Beanstalk
-------------------------------

Make sure you have committed any code you want to deploy to Git, or the beanstalk CLI won't deploy it.

    npm run build:prod
    eb deploy
    
Setup notes
-----------
http://blog.shippable.com/how-to-deploy-to-elastic-beanstalk-part-1

    pip install --upgrade --user awsebcli
    eb --version 
