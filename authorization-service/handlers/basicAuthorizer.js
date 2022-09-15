const basicAuthorizer = async (event) => {
  console.log("basicAuthorizer event: ", JSON.stringify(event));

  const { methodArn, authorizationToken } = event;

  try {
    const encodedToken = authorizationToken.split(" ")[1];
    const decodedToken = Buffer.from(encodedToken, "base64").toString("utf8");
    const [userName, password] = decodedToken.split(":");

    const testUserName = "ArtemPrydorozhko"; // just to prevent access to other env vars
    const effect =
      userName === testUserName && process.env[testUserName] === password
        ? "Allow"
        : "Deny";

    console.log(`basicAuthorizer effect for ${userName} is ${effect}`);

    return generatePolicy(userName, effect, methodArn);
  } catch (error) {
    console.log("basicAuthorizer error", error.message);
    return generatePolicy("", "Deny", methodArn);
  }
};

const generatePolicy = (principalId, effect, resource) => ({
  principalId,
  policyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Effect: effect,
        Resource: resource,
      },
    ],
  },
});

export { basicAuthorizer };
