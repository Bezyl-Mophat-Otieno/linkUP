import DB from "../../src/database/dbHelper.ts";
import myPost from "../../src/controllers/posts/myPost.ts";
import { Request, Response } from "express";

jest.mock("../../src/database/dbHelper.ts");
describe("My Post", () => {
  it("it should error out if the id is not provided", async () => {
    const mockedReq = {
      params: {},
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await myPost(mockedReq, mockedRes);
  });
  it("it should error out if the post is not found", async () => {
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
      recordset: [],
    });
    await myPost(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
  });
  it("it should return the post if fetched successfully", async () => {
    const mockedReq = {
      params: {
        id: "test_id",
      },
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
    await myPost(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(200);
  });
});
