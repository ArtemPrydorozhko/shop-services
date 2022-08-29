import * as AWS from "aws-sdk";
import pg from "pg";
import * as createProduct from "../utils/createProduct";
import { catalogBatchProcess } from "./catalogBatchProcess";

jest.mock("aws-sdk", () => ({ SNS: jest.fn() }));
jest.mock("pg", () => ({ Client: jest.fn() }));

fdescribe("catalogBatchProcess", () => {
  let snsClient;
  let dbClient;
  let createdProductSpy;

  beforeEach(() => {
    AWS.SNS.mockImplementation(() => ({
      publish: jest.fn(() => ({
        promise: () => {},
      })),
    }));

    snsClient = new AWS.SNS();
    dbClient = new pg.Client();

    createdProductSpy = jest
      .spyOn(createProduct, "createProduct")
      .mockReturnValue({ promise: () => {} });
  });

  test("should call create product", () => {
    const testProduct = {
      title: "test",
      description: "test",
      price: 22,
      count: 6,
    };
    const event = { Records: [{ body: JSON.stringify(testProduct) }] };

    return catalogBatchProcess(event).then((result) => {
      expect(createdProductSpy).toHaveBeenCalledWith(dbClient, testProduct);
    });
  });

  test("should publish message to sns", () => {
    const testProduct = {
      title: "test",
      description: "test",
      price: 22,
      count: 6,
    };
    const event = { Records: [{ body: JSON.stringify(testProduct) }] };

    return catalogBatchProcess(event).then((result) => {
      expect(snsClient.publish).toHaveBeenCalled();
    });
  });

  test("should return empty failure array", () => {
    const testProduct = {
      title: "test",
      description: "test",
      price: 22,
      count: 6,
    };
    const event = { Records: [{ body: JSON.stringify(testProduct) }] };

    return catalogBatchProcess(event).then((result) => {
      expect(result).toEqual({ batchItemFailures: [] });
    });
  });

  test("should return failure array with 1 entry", () => {
    createdProductSpy = jest
      .spyOn(createProduct, "createProduct")
      .mockRejectedValue("Error");

    const recordMessageId = "messageId";
    const testProduct = {
      title: "test",
      description: "test",
      price: 22,
      count: 6,
    };
    const event = {
      Records: [
        { body: JSON.stringify(testProduct), messageId: recordMessageId },
      ],
    };

    return catalogBatchProcess(event).then((result) => {
      expect(result).toEqual({
        batchItemFailures: [{ itemIdentifier: recordMessageId }],
      });
    });
  });
});
