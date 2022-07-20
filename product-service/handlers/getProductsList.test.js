import mockProducts from "../mock/products";
import { getProductsList } from "./getProductsList";

test("get all products", () => {
  const event = {};
  const responseBody = JSON.stringify(mockProducts);
  return getProductsList(event).then((result) => {
    expect(result.body).toEqual(responseBody);
  });
});
