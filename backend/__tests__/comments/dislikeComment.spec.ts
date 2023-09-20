import likeComment from "../../src/controllers/comments/likeComment.ts";
import DB from "../../src/database/dbHelper.ts";
import { Response, Request } from "express";
jest.mock("../../src/database/dbHelper.ts");

describe("Comment Liking", () => {
  it("it should return 400 if comment id is not provided", async () => {
    const mockedReq = {
      params: {},
      body: {
        user_id: "test_id",
      },
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await likeComment(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
  });
  it("it shoukd return 400 if user id is not provided", async () => {
    const mockedReq = {
      params: {
        id: "test_id",
      },
      body: {},
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await likeComment(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
  });
  it("should error out if the comment was not disliked", async () => {
    const mockedReq = {
      params: {
        id: "test_id",
      },
      body: {
        user_id: "test_id",
      },
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    DB.executeProcedure = jest.fn().mockResolvedValueOnce({
      rowsAffected: [0],
    });

    await likeComment(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(404);
  });
  it("it should show success message whenever the comment is disliked successfully", async () => {
    const mockedReq = {
      params: {
        id: "test_id",
      },
      body: {
        user_id: "test_id",
      },
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    DB.executeProcedure = jest.fn().mockResolvedValueOnce({
      rowsAffected: [1],
    });

    await likeComment(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(200);
  });
});
