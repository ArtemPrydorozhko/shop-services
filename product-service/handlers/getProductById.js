import mockProducts from "../mock/products";

const delay = (ms) =>
  new Promise((res, rej) => {
    setTimeout(res, ms);
  });

const getProductById = async (event) => {
  try {
    await delay(200);
    const id = event.pathParameters?.id;

    const product = mockProducts.find((product) => product.id === id);

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    };

    const response = product
      ? {
          statusCode: 200,
          headers,
          body: JSON.stringify(product),
        }
      : {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: "product not found",
          }),
        };

    return response;
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify(error),
    };
  }
};

export { getProductById };
