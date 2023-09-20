import activateUser from "../../src/controllers/users/activateUser.ts";
import DB from "../../src/database/dbHelper.ts";
import { Request, Response } from "express";

jest.mock("../../src/database/dbHelper.ts");
describe("activate User", () => {
  it("it should error out if the id is not provided", async () => {
    const mockedReq = {
      params: {},
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await activateUser(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "No id provided",
      status: "failed",
    });
  });

  it("it should error out when there is an internal server error", async () => {
    const mockedReq = {
      params: { id: "test_id" },
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      rowsAffectd: [],
    });

    await activateUser(mockedReq, mockedRes);

    expect(mockedRes.status).toHaveBeenCalledWith(500);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "Internal server error",
      status: "failed",
    });
  });
  it("should activate the user account", async () => {
    const mockedReq = {
      params: { id: "test_id" },
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [1],
    });

    await activateUser(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(200);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "User activated successfully",
      status: "success",
    });
  });
});
