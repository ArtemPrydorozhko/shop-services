import * as AWS from "aws-sdk";
import pg from "pg";
import dbOptions from "../config/db";
import { createProduct } from "../utils/createProduct";

const catalogBatchProcess = async (event) => {
  const dbClient = new pg.Client(dbOptions);
  const snsClient = new AWS.SNS();

  const batchItemFailures = [];

  try {
    console.log("catalogBatchProcess start", JSON.stringify(event));

    const products = [];
    for (const record of event.Records) {
      const { title, description, price, count } = JSON.parse(record.body);

      try {
        console.log(`trying to create product "${title}"`);
        await createProduct(dbClient, {
          title,
          description,
          price,
          count,
        });

        console.log(`product "${title}" sucessfuly created`);

        products.push({ title, description, price, count });
      } catch (error) {
        console.log(`product "${title}" creation failed`);
        batchItemFailures.push({ itemIdentifier: record.messageId });
      }
    }

    await snsClient
      .publish({
        Message: "products created" + JSON.stringify(products),
        Subject: "Products created",
        TopicArn: process.env.createProductTopic,
        MessageAttributes: {
          count: {
            DataType: "Number",
            StringValue: product.count.toString(),
          },
        },
      })
      .promise();
  } catch (error) {
    // complete batch failure
    console.log("catalogBatchProcess global error", error.message);
    return {
      batchItemFailures: [{ itemIdentifier: "" }],
    };
  }

  return { batchItemFailures };
};

export { catalogBatchProcess };
