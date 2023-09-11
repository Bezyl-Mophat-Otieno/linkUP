import DB from "../../src/database/dbHelper.ts";
import { Request, Response } from "express";
import deletePost from "../../src/controllers/posts/deletePost.ts";

jest.mock("../../src/database/dbHelper.ts");
describe("Delete a Post", () => {
  it("it should error out if the post id is not provided", async () => {
    const mockedReq = {
      params: {},
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await deletePost(mockedReq, mockedRes);
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
      rowsAffected: [0],
    });
    await deletePost(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
  });
  it("it should show return a success message if the post is deleted successfully", async () => {
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
    await deletePost(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(200);
  });
});
