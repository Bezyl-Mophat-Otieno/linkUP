import followUser from "../../src/controllers/followers/followUser.ts";
import DB from "../../src/database/dbHelper.ts";
import { Request, Response } from "express";

jest.mock("../../src/database/dbHelper.ts");
describe("Follow User", () => {
  it("it should error out if either of the required fields is not provided", async () => {
    const mockedReq = {
      body: {},
    } as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;
    await followUser(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
  });

  it("it should error out if it fails to follow a user", async () => {
    const mockedReq = {
      body: {
        follower: "test_id",
        followed: "test_id",
      },
    } as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [0],
    });
    await followUser(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
  });
  it("it should follow a user successfully", async () => {
    const mockedReq = {
      body: {
        follower: "test_id",
        followed: "test_id",
      },
    } as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [1],
    });
    await followUser(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(200);
  });
});
