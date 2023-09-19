import { Response, Request } from "express";
import DB from "../../src/database/dbHelper.ts";
import getSubComment from "../../src/controllers/comments/getSubComment.ts";

jest.mock("../../src/database/dbHelper.ts");
describe("My comments", () => {
  it("it should error out if the comment id is not provided", async () => {
    const mockedReq = {
      params: {},
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    await getSubComment(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
  });

  it("it should display an alert if the subcomment  not found ", async () => {
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
    await getSubComment(mockedReq, mockedRes);

    expect(mockedRes.status).toHaveBeenCalledWith(404);
  });
  it("it should display an alert if the subcomment are found", async () => {
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

    await getSubComment(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(200);
  });
});
