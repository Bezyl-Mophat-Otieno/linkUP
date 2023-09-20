import DB from "../../src/database/dbHelper.ts";
import { Request, Response } from "express";
import fetchFollowersInfo from "../../src/controllers/followers/fetchFollowersInfo.ts";

jest.mock("../../src/database/dbHelper.ts");
describe("Fetch All Followers Relationship", () => {
  it("it should error out if it fails to fetch the relationships ", async () => {
    const mockedReq = {
      body: {},
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;
    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      recordset: [0],
    });
    await fetchFollowersInfo(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(404);
  });
  it("it should return the list of followers relationship successfully", async () => {
    const mockedReq = {
      body: {},
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;
    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      recordset: [1],
    });
    await fetchFollowersInfo(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(200);
  });
});
