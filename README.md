# shop-services
Product Service has 2 lambda functions:
- getProductsList
    - url: https://kzdx8lc0v0.execute-api.eu-west-1.amazonaws.com/dev/products

- getProductById
    - url: https://kzdx8lc0v0.execute-api.eu-west-1.amazonaws.com/dev/products/2
    - 400 error https://kzdx8lc0v0.execute-api.eu-west-1.amazonaws.com/dev/products/999

Updated frontend to use lambdas https://github.com/ArtemPrydorozhko/shop-angular-cloudfront/pull/2
getProductsList usage http://testshopawsbucket2.s3-website-us-east-1.amazonaws.com/
getProductById usage http://testshopawsbucket2.s3-website-us-east-1.amazonaws.com/admin/products


Additional (optional) tasks:
- Async/await in handlers
- ES6 modules are used for Product Service implementation
- Webpack with babel-loader is configured for Product Service
- Lambda handlers are covered by basic UNIT tests
- Lambda handlers (getProductsList, getProductsById) code is written in separate modules
- Main error scenarios are handled by API("Product not found" error)
