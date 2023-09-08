import getOrder from "../../src/controllers/products/getOrder.ts";
import DB from "../../src/database/dbHelper.ts";
import { Request, Response } from "express";

jest.mock("../../src/database/dbHelper.ts");
describe("getOrder", () => {
  it("it should error out if the id is not provided", async () => {
    const mockRequest = {
      params: {},
    } as unknown as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    await getOrder(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Id is required",
    });
  });

  it("it should return the list of orders", async () => {
    const mockRequest = {
      params: {
        id: "test_id",
      },
    } as unknown as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockedProducts = [
      {
        id: "test_id",
        name: "test_name",
        price: 100,
        quantity: 10,
        total: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "test_id",
        name: "test_name",
        price: 100,
        quantity: 10,
        total: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      recordset: mockedProducts,
    });

    await getOrder(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledWith({
      products: mockedProducts,
      status: "success",
    });
  });
});
