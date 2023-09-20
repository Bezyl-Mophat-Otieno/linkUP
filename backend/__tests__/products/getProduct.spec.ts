import { Request, Response } from "express";
import DB from "../../src/database/dbHelper.ts";
import getProduct from "../../src/controllers/products/getProduct.ts";

jest.mock(`../../src/database/dbHelper.ts`);
describe("Fetch Product Tests", () => {
  it("should return 400 if id is not provided", async () => {
    const mockedReq = {
      params: {},
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getProduct(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "Id is required",
    });
  });
  it("should return 404 if no product found", async () => {
    const mockedReq = {
      params: {
        id: "1",
      },
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      recordset: [],
    });

    await getProduct(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(404);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "Product not found",
    });
  });

  it("should return 200 if product found", async () => {
    const mockedReq = {
      params: {
        id: "1",
      },
    } as unknown as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockedProduct = {
      id: 1,
      name: "test",
      description: "test",
      price: 100,
      image: null,
    };

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      recordset: [mockedProduct],
    });

    await getProduct(mockedReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    // expect(mockRes.json).toHaveBeenCalledWith(mockedProduct);
  });
});
