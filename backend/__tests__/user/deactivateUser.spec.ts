import { Request, Response } from "express";
import deactivateUser from "../../src/controllers/users/deactivateUser.ts";
import DB from "../../src/database/dbHelper.ts";

jest.mock("../../src/database/dbHelper.ts");
describe("Testing Out Delete User Controller", () => {
  it("it should return an error 400 if no id is provided", async () => {
    const mockedReq = {
      params: {},
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await deactivateUser(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "No id provided",
      status: "failed",
    });
  });
  it("it should return an error 404 if no user is found", async () => {
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
      rowsAffected: [0],
    });

    await deactivateUser(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(404);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "User not found",
      status: "failed",
    });
  });

  it("it should return a 200 if user is deleted successfully", async () => {
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
      rowsAffected: [1],
    });

    await deactivateUser(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(200);
    // expect(mockedRes.json).toHaveBeenCalledWith({
    //   message: "User deleted successfully",
    //   status: "success",
    // });
  });
});
