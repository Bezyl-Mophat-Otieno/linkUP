import DB from "../../src/database/dbHelper.ts";
import getFollowers from "../../src/controllers/followers/getFollowers.ts";

import { Request, Response } from "express";

jest.mock("../../src/database/dbHelper.ts");

describe("Get Followers Users", () => {
  it("should error out when the follower id is not provided", async () => {
    const mockedReq = {
      params: {},
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getFollowers(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
  });

  it("it should error out if the Followers are not retrieved", async () => {
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

    await getFollowers(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(404);
  });
  it("it should Retrieve the followers Successfully", async () => {
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

    await getFollowers(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(200);
  });
});
