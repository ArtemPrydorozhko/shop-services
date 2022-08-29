import pg from "pg";
import dbOptions from "../config/db";
import commonResponse from "../utils/commonResponse";
import { createProduct } from "../utils/createProduct";

const createProductHandler = async (event) => {
  const client = new pg.Client(dbOptions);

  try {
    console.log("createProduct", JSON.stringify(event));

    const { title, description, price, count } = JSON.parse(event.body);

    const createdProduct = await createProduct(client, {
      title,
      description,
      price,
      count,
    });

    return commonResponse({ body: JSON.stringify(createdProduct) });
  } catch (error) {
    return commonResponse({
      statusCode: error.statusCode,
      body: JSON.stringify({ error: error.error }),
    });
  }
};

export { createProductHandler as createProduct };
