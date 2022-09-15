import * as AWS from "aws-sdk";
import commonResponse from "../utils/commonResponse";
import bucketConfig from "../config/bucket";

const importProductsFile = async (event) => {
  try {
    console.log("importProductsFile, start", JSON.stringify(event));

    const { name } = event.queryStringParameters;

    if (!name) {
      return commonResponse({
        statusCode: 400,
        body: JSON.stringify({
          error: "No name provided",
        }),
      });
    }
    const client = new AWS.S3({ region: bucketConfig.region });

    const signedUrl = await client.getSignedUrlPromise("putObject", {
      Bucket: bucketConfig.bucketName,
      Key: `uploaded/${name}`,
      Expires: 60,
      ContentType: "text/csv",
    });

    console.log("importProductsFile, signedUrl created", signedUrl);

    return commonResponse({
      statusCode: 200,
      body: JSON.stringify({ url: signedUrl }),
      headers: {
        "Access-Control-Allow-Origin": "https://d1ty74fm6yb21c.cloudfront.net",
      },
    });
  } catch (error) {
    console.error("importProductsFile", error.message);
    return commonResponse({ statusCode: 500, body: JSON.stringify({ error }) });
  }
};

export { importProductsFile };
