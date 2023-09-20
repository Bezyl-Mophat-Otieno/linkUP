import DB from "../../src/database/dbHelper.ts";
import { Response, Request } from "express";
import commentLikers from "../../src/controllers/comments/commentLikers.ts";

describe("Comment likers", () => {
  it("it should return an error 400 if the comment id is not provided", async () => {
    const mockedReq = {
      params: {},
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await commentLikers(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
  });
  it("it should return an error incase the comment Likers are not fetched successfully", async () => {
    const mockedReq = {
      params: {
        id: "test_id",
      },
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    DB.executeProcedure = jest.fn().mockResolvedValueOnce({
      recordset: [],
    });

    await commentLikers(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(404);
  });
  it("it should show success incase the comment likers are fetched successfully", async () => {
    const mockedReq = {
      params: {
        id: "test_id",
      },
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    DB.executeProcedure = jest.fn().mockResolvedValueOnce({
      recordset: [
        {
          id: "test_id",
          user_id: "test_id",
          comment_id: "test_id",
        },
      ],
    });
    await commentLikers(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(200);
  });
});
