import pg from "pg";
import dbOptions from "../config/db";
import commonResponse from "../utils/commonResponse";
import productValidator from "../utils/productValidator";

const createProduct = async (event) => {
  const client = new pg.Client(dbOptions);

  try {
    console.log("createProduct", JSON.stringify(event));

    const { title, description, price, count } = JSON.parse(event.body);

    const isValidPRoductData = productValidator({
      title,
      description,
      price,
      count,
    });

    if (!isValidPRoductData) {
      return commonResponse({
        statusCode: 400,
        body: JSON.stringify({
          error: "invalid product data",
        }),
      });
    }

    await client.connect();

    await client.query("BEGIN");

    const {
      rows: [{ id: productId }],
    } = await client.query(
      "INSERT INTO products (title, description, price) values ($1, $2, $3) RETURNING id",
      [title, description, price]
    );

    await client.query(
      "INSERT INTO stocks (product_id, count) values ($1, $2)",
      [productId, count]
    );

    await client.query("COMMIT");

    const {
      rows: [createdProduct],
    } = await client.query(
      "SELECT * from products JOIN stocks ON products.id = stocks.product_id WHERE products.id = $1",
      [productId]
    );
    await client.end();
    return commonResponse({ body: JSON.stringify(createdProduct) });
  } catch (error) {
    await client.query("ROLLBACK");
    await client.end();
    return commonResponse({ statusCode: 500, body: JSON.stringify({ error }) });
  }
};

export { createProduct };
