import pg from "pg";
import dbOptions from "../config/db";
import commonResponse from "../utils/commonResponse";

const getProductById = async (event) => {
  const client = new pg.Client(dbOptions);

  try {
    console.log("getProductById", JSON.stringify(event));

    await client.connect();

    const id = event.pathParameters?.id;

    const { rows } = await client.query(
      "SELECT * from products JOIN stocks ON products.id = stocks.product_id WHERE products.id = $1",
      [id]
    );

    const product = rows[0];

    const response = product
      ? commonResponse({ body: JSON.stringify(product) })
      : commonResponse({
          statusCode: 400,
          body: JSON.stringify({
            error: "product not found",
          }),
        });

    await client.end();
    return response;
  } catch (error) {
    await client.end();
    return commonResponse({ statusCode: 500, body: JSON.stringify({ error }) });
  }
};

export { getProductById };
