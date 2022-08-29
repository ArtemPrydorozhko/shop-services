# import-service
# TASK 6

&check; File serverless.yml contains configuration for catalogBatchProcess function \
&check;  File serverless.yml contains policies to allow lambda catalogBatchProcess function to interact with SNS and SQS \
&check;File serverless.yml contains configuration for SQS catalogItemsQueue \
&check; File serverless.yml contains configuration for SNS Topic createProductTopic and email subscription

Additional (optional) tasks

&check; catalogBatchProcess lambda is covered by unit tests \
&check; set a Filter Policy for SNS createProductTopic in serverless.yml and create an additional email subscription to distribute messages to different emails depending on the filter for any product attribute

