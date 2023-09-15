import DB from "../../src/database/dbHelper.ts";
import myComments from "../../src/controllers/comments/myComments.ts";
import { Request, Response } from "express";

jest.mock("../../src/database/dbHelper.ts");
describe(" Add Comment", () => {
  it("should return an error incase any of the required fields is not provided", async () => {
    const mockReq = {
      params: {},
    } as unknown as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await myComments(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
  });
  it("it should error out if the comment fails to be added", async () => {
    const mockReq = {
      body: {
        content: "test_content",
        user_id: "test_id",
        post_id: "test_id",
      },
      params: {
        id: "test_id",
      },
    } as unknown as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [0],
    });

    await myComments(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(404);
  });

  it("it should add the comment successfully", async () => {
    const mockReq = {
      body: {
        content: "test_content",
        user_id: "test_id",
        post_id: "test_id",
      },
      params: {
        id: "test_id",
      },
    } as unknown as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [1],
    });

    await myComments(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });
});
