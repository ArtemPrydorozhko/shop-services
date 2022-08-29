import productValidator from "./productValidator";

export const createProduct = async (dbClient, product) => {
  try {
    const { title, description, price, count } = product;

    const isValidPRoductData = productValidator({
      title,
      description,
      price,
      count,
    });

    if (!isValidPRoductData) {
      throw {
        statusCode: 400,
        error: "invalid product data",
      };
    }

    await dbClient.connect();

    await dbClient.query("BEGIN");

    const {
      rows: [{ id: productId }],
    } = await dbClient.query(
      "INSERT INTO products (title, description, price) values ($1, $2, $3) RETURNING id",
      [title, description, price]
    );

    await dbClient.query(
      "INSERT INTO stocks (product_id, count) values ($1, $2)",
      [productId, count]
    );

    await dbClient.query("COMMIT");

    const {
      rows: [createdProduct],
    } = await dbClient.query(
      "SELECT * from products JOIN stocks ON products.id = stocks.product_id WHERE products.id = $1",
      [productId]
    );
    await dbClient.end();
    return createdProduct;
  } catch (error) {
    await dbClient.query("ROLLBACK");
    await dbClient.end();
    throw {
      statusCode: 500,
      error,
    };
  }
};
