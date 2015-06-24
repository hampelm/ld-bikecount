LocalData Bike Counts
=====================

Development
-----------

The main app (root of the project) is a one-off data presentation app.

The mobile app we deploy is in the `mobile` directory.


Deployment
----------

Will deploy all, including dash and mobile; to just deploy mobile, run this command from the `mobile` directory.

s3cmd put --exclude '.git/*' . s3://localdata-static/apps/beta/counter/ --recursive
