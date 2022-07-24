import mockProducts from "../mock/products";
import { getProductById } from "./getProductById";

test("get product by id", () => {
  const event = { pathParameters: { id: "2" } };
  const responseBody = JSON.stringify(
    mockProducts.find((product) => product.id === "2")
  );
  return getProductById(event).then((result) => {
    expect(result.body).toEqual(responseBody);
  });
});

test("get 400 error", () => {
  const event = { pathParameters: { id: 999 } };
  const responseBody = JSON.stringify({
    error: "product not found",
  });

  return getProductById(event).then((result) => {
    expect(result.body).toEqual(responseBody);
  });
});
