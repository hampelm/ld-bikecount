LocalData Bike Counts
=====================

Details to come.

Deployment
----------

s3cmd put --exclude '.git/*' . s3://locald/web/apps-matth/bikes/ --recursive
