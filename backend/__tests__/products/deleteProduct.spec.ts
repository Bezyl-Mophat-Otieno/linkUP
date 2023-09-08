import { Request, Response } from "express";
import DB from "../../src/database/dbHelper.ts";
import deleteProduct from "../../src/controllers/products/deleteProduct.ts";

jest.mock(`../../src/database/dbHelper.ts`);
describe("Delete Product Tests", () => {
  it("should return 400 if id is not provided", async () => {
    const mockReq = {
      params: {},
    } as unknown as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await deleteProduct(mockReq, mockResponse);
  });

  it("should error out if the product to be deleted is not found", async () => {
    const mockReq = {
      params: {
        id: "1",
      },
    } as unknown as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await deleteProduct(mockReq, mockResponse);

    ((await DB.executeProcedure) as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [0],
    });
    await deleteProduct(mockReq, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Product not found",
      status: "failed",
    });
  });
  it("should return 200 if product found", async () => {
    const mockReq = {
      params: {
        id: "1",
      },
    } as unknown as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    ((await DB.executeProcedure) as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [1],
    });
    await deleteProduct(mockReq, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Product deleted successfully",
      status: "success",
    });
  });
});
