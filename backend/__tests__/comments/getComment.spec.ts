import { Response, Request } from "express";
import DB from "../../src/database/dbHelper.ts";
import getComment from "../../src/controllers/comments/getComment.ts";

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
    await getComment(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
  });

  it("it should display an alert if comments not found ", async () => {
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
      recordset: [],
    });
    await getComment(mockedReq, mockedRes);

    expect(mockedRes.status).toHaveBeenCalledWith(404);
  });
  it("it should display an alert if comments are found", async () => {
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
      recordset: [{ id: "test_id" }],
    });

    await getComment(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(200);
  });
});
