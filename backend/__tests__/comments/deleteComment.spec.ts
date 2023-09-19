import { Response, Request } from "express";
import DB from "../../src/database/dbHelper.ts";
import deleteComment from "../../src/controllers/comments/deleteComment.ts";

jest.mock("../../src/database/dbHelper.ts");
describe("My comments", () => {
  it("it should error out if the id is not provided", async () => {
    const mockedReq = {
      params: {},
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    await deleteComment(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
  });

  it("it should error out if no comment is deleted  ", async () => {
    const mockedReq = {
      params: {
        id: "test_id",
      },
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [0],
    });
    await deleteComment(mockedReq, mockedRes);

    expect(mockedRes.status).toHaveBeenCalledWith(404);
  });
  it("it should delete a comment successfully", async () => {
    const mockedReq = {
      params: {
        id: "test_id",
      },
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [1],
    });
    await deleteComment(mockedReq, mockedRes);

    expect(mockedRes.status).toHaveBeenCalledWith(200);
  });
});
