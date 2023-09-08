import { Request, Response } from "express";
import DB from "../../src/database/dbHelper.ts";
import fetchProducts from "../../src/controllers/products/fetchProducts.ts";

jest.mock("../../src/database/dbHelper.ts");
describe("Fetch Producst Tests", () => {
  it("should return 404 if no products found", async () => {
    const mockedReq = {} as Request;

    const mockedRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      recordset: [],
    });

    await fetchProducts(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(404);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "No products found",
    });
  });

  it("should return 200 if products are found", async () => {
    const mockedReq = {} as Request;

    const mockedRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    const mockedProducts = [
      {
        id: "1",
        name: "test",
        description: "test",
        price: 10,
        Image: null,
      },
      {
        id: "2",
        name: "test2",
        description: "test2",
        price: 11,
        Image: null,
      },
    ];

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      recordset: mockedProducts,
    });

    await fetchProducts(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(200);
    expect(mockedRes.json).toHaveBeenCalledWith({
      products: mockedProducts,
      status: "success",
    });
  });
});
