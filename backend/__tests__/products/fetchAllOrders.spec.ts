import fetchAllOrders from "../../src/controllers/products/fetchAllOrders.ts";
import DB from "../../src/database/dbHelper.ts";
import { Request, Response } from "express";

jest.mock("../../src/database/dbHelper.ts");

describe("Fetch all Orders", () => {
  it("it should fetch all orders", async () => {
    const mockRequest = {} as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const mockRecordset = [
      {
        id: 1,
        name: "test",
        price: 100,
        description: "test",
        image: "test",
        category: "test",
        created_at: "test",
        updated_at: "test",
      },
    ];
    const mockResult = {
      recordset: mockRecordset,
    };
    DB.executeProcedure = jest.fn().mockResolvedValue(mockResult);
    await fetchAllOrders(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      orders: mockRecordset,
      status: "success",
    });
  });
  it('It return "No orders found" if no orders are found', async () => {
    const mockRequest = {} as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const mockRecordset: any = [];
    const mockResult = {
      recordset: mockRecordset,
    };
    DB.executeProcedure = jest.fn().mockResolvedValue(mockResult);
    await fetchAllOrders(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "No orders found",
    });
  });
});
