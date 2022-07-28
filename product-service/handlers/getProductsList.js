import pg from "pg";
import dbOptions from "../config/db";
import commonResponse from "../utils/commonResponse";

const getProductsList = async (event) => {
  const client = new pg.Client(dbOptions);

  try {
    console.log("getProductsList", JSON.stringify(event));

    await client.connect();

    const { rows: products } = await client.query(
      "SELECT * from products JOIN stocks ON products.id = stocks.product_id"
    );
    await client.end();
    return commonResponse({ body: JSON.stringify(products) });
  } catch (error) {
    await client.end();
    return commonResponse({ statusCode: 500, body: JSON.stringify({ error }) });
  }
};

export { getProductsList };
