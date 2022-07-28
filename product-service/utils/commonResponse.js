const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};

export default (options = {}) => ({
  statusCode: options.statusCode ?? 200,
  headers: { ...headers, ...options.headers },
  body: options.body,
});
