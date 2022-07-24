import mockProducts from "../mock/products";

const getProductsList = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  };

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(mockProducts),
  };
};

export { getProductsList };
