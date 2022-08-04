# import-service

Task5.1 \
separate import-service is created with its own serverless.yml

Task5.2 \
created and configured lambda function importProductsFile

Task5.3 \
created and configured lambda function importFileParser

Additional (optional) tasks \
async/await is used in lambda functions - done \
importProductsFile lambda is covered by unit tests - done \
At the end of the stream the lambda function should move the file from the uploaded folder into the parsed folder - done

Integrated with FE, PR: \
https://github.com/ArtemPrydorozhko/shop-angular-cloudfront/pull/3

admin panel to import csv files: \
https://d1ty74fm6yb21c.cloudfront.net/admin/products

