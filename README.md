# shop-services
task4.1 - done (databese instance in RDS is created, SQL scripts are present) \
task4.2 - done (lambda functions are integrated with DB) \
task4.3 - done (createProduct is present and working) 

FE does not need any changes (product model is correct, interaction with AWS lambda was done in previous task), link to repo https://github.com/ArtemPrydorozhko/shop-angular-cloudfront

FE app http://testshopawsbucket2.s3-website-us-east-1.amazonaws.com \
add a new product link http://testshopawsbucket2.s3-website-us-east-1.amazonaws.com/admin/products/new

Additional (optional) tasks
 - POST /products lambda functions returns error 400 status code if product data is invalid
 - All lambdas return error 500 status code on any error (DB connection, any unhandled error in code)
 - All lambdas do console.log for each incoming requests
 - Transaction based creation of product ("BEGIN", "COMMIT", "ROLLBACK" queries in createProduct.js)


