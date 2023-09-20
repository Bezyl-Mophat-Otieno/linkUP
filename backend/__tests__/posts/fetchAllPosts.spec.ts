import DB from "../../src/database/dbHelper.ts";
import { Request, Response } from "express";
import fetchAllPosts from "../../src/controllers/posts/fetchAllPosts.ts";

jest.mock("../../src/database/dbHelper.ts");
describe("Fetch All Posts", () => {
  it("should error out if no posts are found", async () => {
    const mockedReq = {
      body: {},
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      recordset: [],
    });
    await fetchAllPosts(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
  });
  it("it should return all the posts when fetched Successfully", async () => {
    const mockedReq = {
      body: {},
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockedPost = {
      post_id: "post id",
      user_id: "user id",
      content: "content",
      image: "img-url",
    };

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      recordset: [mockedPost],
    });
    await fetchAllPosts(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(200);
  });
});
