import * as AWS from "aws-sdk";
import csv from "csv-parser";
import commonResponse from "../utils/commonResponse";
import bucketConfig from "../config/bucket";
import sqsConfig from "../config/sqs";

const importFileParser = async (event) => {
  try {
    console.log("importFileParser start", JSON.stringify(event));

    const client = new AWS.S3({ region: bucketConfig.region });
    const sqsClient = new AWS.SQS();

    const result = [];
    for (const record of event.Records) {
      const readable = client
        .getObject({
          Bucket: bucketConfig.bucketName,
          Key: record.s3.object.key,
        })
        .createReadStream()
        .pipe(
          csv({
            mapValues: ({ _header, index, value }) =>
              index === 2 || index === 3 ? Number(value) : value,
          })
        );

      for await (const chunk of readable) {
        result.push(chunk);
      }

      console.log("importFileParser csv parsed, sending to sqs");

      // split result by 10 items
      const splittedResult = [];
      let part = [];

      for (let i = 0; i < result.length; i++) {
        part.push(result[i]);

        if (part.length === 10 || i === result.length - 1) {
          splittedResult.push(part);
          part = [];
        }
      }

      for (const batch of splittedResult) {
        const preparedBatch = batch.map((product, i) => ({
          Id: i.toString(),
          MessageBody: JSON.stringify(product),
        }));

        await sqsClient
          .sendMessageBatch({
            QueueUrl: sqsConfig.catalogItemsQueueUrl,
            Entries: preparedBatch,
          })
          .promise();
      }

      console.log("importFileParser successful sent to sqs");

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
