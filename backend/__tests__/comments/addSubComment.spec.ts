import addSubComment from "../../src/controllers/comments/addSubComment.ts";
import DB from "../../src/database/dbHelper.ts";
import { Response, Request } from "express";

jest.mock("../../src/database/dbHelper.ts");

describe("Comment Liking", () => {
  it("it should return 400 if any of the fields is not provided", async () => {
    const mockedReq = {
      body: {},
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await addSubComment(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
  });

  it("should error out if subcomment was not added", async () => {
    const mockedReq = {
      body: {
        user_id: "test_id",
        post_id: "test_id",
        content: "test_content",
        comment: "test_comment",
      },
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    DB.executeProcedure = jest.fn().mockResolvedValue({
      rowsAffected: [0],
    });

    DB.executeProcedure = jest.fn().mockResolvedValue({
      rowsAffected: [0],
    });

    await addSubComment(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
  });
  it("it should show success message whenever a subcomment was added successfully", async () => {
    const mockedReq = {
      body: {
        user_id: "test_id",
        post_id: "test_id",
        content: "test_content",
        comment: "test_comment",
      },
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    DB.executeProcedure = jest.fn().mockResolvedValue({
      rowsAffected: [1],
    });

    DB.executeProcedure = jest.fn().mockResolvedValue({
      rowsAffected: [1],
    });

    await addSubComment(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(200);
  });
});
