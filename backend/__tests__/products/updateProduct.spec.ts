import { Request, Response } from "express";
import DB from "../../src/database/dbHelper.ts";
import updateProduct from "../../src/controllers/products/updateProduct.ts";

jest.mock(`../../src/database/dbHelper.ts`);
describe("Update Product Tests", () => {
  it("should return 400 if id is not provided", async () => {
    const mockReq = {
      params: {},
    } as unknown as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await updateProduct(mockReq, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Id is required",
    });
  });

  it("should error out if the product is not found", async () => {
    const mockReq = {
      params: {
        id: "2",
      },
    } as unknown as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [0],
    });

    await updateProduct(mockReq, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Product not found",
      status: "failed",
    });
  });
  it("it should return 200 if product is found and updated ", async () => {
    const mockReq = {
      params: {
        id: "2",
      },
    } as unknown as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [1],
    });
    await updateProduct(mockReq, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Product updated successfully",
      status: "success",
    });
  });
});
