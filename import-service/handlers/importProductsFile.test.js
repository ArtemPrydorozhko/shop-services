import * as AWS from "aws-sdk";
import { importProductsFile } from "./importProductsFile";

jest.mock("aws-sdk", () => ({ S3: jest.fn() }));

describe("importProductsFile", () => {
  const signedUrl = "https://test.url";
  let client;
  beforeEach(() => {
    AWS.S3.mockImplementation(() => ({
      getSignedUrlPromise: jest.fn(() => Promise.resolve(signedUrl)),
    }));

    client = new AWS.S3();
  });

  test("should return signedUrl", () => {
    const event = { queryStringParameters: { name: "name" } };
    const responseBody = JSON.stringify({ url: signedUrl });
    return importProductsFile(event).then((result) => {
      expect(result.body).toEqual(responseBody);
    });
  });
});
