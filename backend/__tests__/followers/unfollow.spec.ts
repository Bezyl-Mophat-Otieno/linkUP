import DB from "../../src/database/dbHelper.ts";
import unfollow from "../../src/controllers/followers/unfollow.ts";

import { Request, Response } from "express";

jest.mock("../../src/database/dbHelper.ts");

describe("Unfollow User", () => {
  it("should error out when the follower id is not provided", async () => {
    const mockedReq = {
      params: {},
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await unfollow(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
  });

  it("it should error out if the user is not found", async () => {
    const mockedReq = {
      params: {
        id: "test_id",
      },
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [0],
    });

    await unfollow(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(404);
  });
  it("it should unfollow successfully", async () => {
    const mockedReq = {
      params: {
        id: "test_id",
      },
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [1],
    });

    await unfollow(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(200);
  });
});
