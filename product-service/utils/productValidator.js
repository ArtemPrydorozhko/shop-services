export default (product) => {
  return (
    typeof product.title === "string" &&
    product.title &&
    typeof product.description === "string" &&
    product.description &&
    typeof product.price === "number" &&
    typeof product.count === "number"
  );
};
