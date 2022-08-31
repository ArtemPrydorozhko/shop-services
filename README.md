# import-service

# TASK 7

&check; authorization-service is added to the repo, has correct basicAuthorizer lambda and correct serverless.yaml file \
&check; Import Service serverless.yaml file has authorizer configuration for the importProductsFile lambda. Request to the importProductsFile lambda should work only with correct authorization_token being decoded and checked by basicAuthorizer lambda. (401 and 403 status codes are set automatically by AWS) \
&check; Client application is updated to send "Authorization: Basic authorization_token" header on import. Client should get authorization_token value from browser localStorage

Additional (optional) tasks

&check; Client application should display alerts for the responses in 401 and 403 HTTP statuses.

To check the invalid credentials execute this in the console: localStorage.setItem('authorization_token', '')

FE MR:
https://github.com/ArtemPrydorozhko/shop-angular-cloudfront/pull/4

FE:
https://d1ty74fm6yb21c.cloudfront.net/admin/products
