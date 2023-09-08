import createOrder from "../../src/controllers/products/createOrder.ts";
import DB from "../../src/database/dbHelper.ts";
import { Request, Response } from "express";

jest.mock("../../src/database/dbHelper.ts");
describe("createOrder", () => {
  it("it should return an error if any of the fields is empty", async () => {
    const mockedRequest = {
      body: {},
    };
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await createOrder(
      mockedRequest as unknown as Request,
      mockedRes as unknown as Response
    );
    expect(mockedRes.status).toHaveBeenCalledWith(400);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "Please fill all fields",
    });
  });
  it("it should error out if something happens in the process of order creation", async () => {
    const mockedRequest = {
      body: {
        user_id: "test_id",
        name: "test_product",
        price: 1,
        quantity: 1,
        total: 1,
      },
    };
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await (DB.executeProcedure as jest.Mock).mockReturnValueOnce({
      rowsAffected: [0],
    });

    await createOrder(
      mockedRequest as unknown as Request,
      mockedRes as unknown as Response
    );
    expect(mockedRes.status).toHaveBeenCalledWith(400);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "Something went wrong,The Order was not created",
      status: "failed",
    });
  });
  it("it should create the order successfully", async () => {
    const mockedRequest = {
      body: {
        user_id: "test_id",
        name: "test_product",
        price: 1,
        quantity: 1,
        total: 1,
      },
    };
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await (DB.executeProcedure as jest.Mock).mockReturnValueOnce({
      rowsAffected: [1],
    });

    await createOrder(
      mockedRequest as unknown as Request,
      mockedRes as unknown as Response
    );
    expect(mockedRes.status).toHaveBeenCalledWith(200);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "Order created successfully",
      status: "success",
    });
  });
});
