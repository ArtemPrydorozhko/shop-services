import * as AWS from "aws-sdk";
import csv from "csv-parser";
import commonResponse from "../utils/commonResponse";
import bucketConfig from "../config/bucket";

const importFileParser = async (event) => {
  try {
    console.log("importFileParser start", JSON.stringify(event));

    const client = new AWS.S3({ region: bucketConfig.region });

    const result = [];
    for (const record of event.Records) {
      const readable = client
        .getObject({
          Bucket: bucketConfig.bucketName,
          Key: record.s3.object.key,
        })
        .createReadStream()
        .pipe(csv());

      for await (const chunk of readable) {
        result.push(chunk);
      }

      console.log("importFileParser, csv parsed", result);

      await client
        .copyObject({
          Bucket: bucketConfig.bucketName,
          CopySource: `${bucketConfig.bucketName}/${record.s3.object.key}`,
          Key: record.s3.object.key.replace("uploaded", "parsed"),
        })
        .promise();

      await client
        .deleteObject({
          Bucket: bucketConfig.bucketName,
          Key: record.s3.object.key,
        })
        .promise();

      console.log("importFileParser, object moved", record.s3.object.key);
    }

    return commonResponse({ statusCode: 201, body: JSON.stringify(result) });
  } catch (error) {
    console.error("importFileParser", error.toString());
    return commonResponse({ statusCode: 500, body: JSON.stringify({ error }) });
  }
};

export { importFileParser };
