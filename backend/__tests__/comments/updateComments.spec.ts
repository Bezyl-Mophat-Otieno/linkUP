import { Response, Request } from "express";
import DB from "../../src/database/dbHelper.ts";
import updateComment from "../../src/controllers/comments/updateComment.ts";
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
    await updateComment(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
  });
  it("it should error out if the content is not provided", async () => {
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
    await updateComment(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
  });

  it("it should display an alert if comments not found ", async () => {
    const mockedReq = {
      params: {
        id: "test_id",
      },
      body: {
        content: "test_content",
      },
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      recordset: [],
    });
    await updateComment(mockedReq, mockedRes);

    expect(mockedRes.status).toHaveBeenCalledWith(404);
  });
  it("it should update a comment successfully", async () => {
    const mockedReq = {
      params: {
        id: "test_id",
      },
      body: {
        content: "test_content",
      },
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [1],
    });
    await updateComment(mockedReq, mockedRes);

    expect(mockedRes.status).toHaveBeenCalledWith(200);
  });
});
