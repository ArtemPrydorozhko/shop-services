export default (product) => {
  return (
    typeof product.title === "string" &&
    typeof product.description === "string" &&
    typeof product.price === "number" &&
    typeof product.count === "number"
  );
};
