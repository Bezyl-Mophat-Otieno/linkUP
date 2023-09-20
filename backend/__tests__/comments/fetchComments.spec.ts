import { Response, Request } from "express";
import DB from "../../src/database/dbHelper.ts";
import fetchComments from "../../src/controllers/comments/fetchComments.ts";

jest.mock("../../src/database/dbHelper.ts");
describe("My comments", () => {
  it("it should display an alert if comments not found ", async () => {
    const mockedReq = {} as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      recordset: [],
    });
    await fetchComments(mockedReq, mockedRes);

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
      recordset: [{ id: "test_id1" }, { id: "test_id2" }, { id: "test_id3" }],
    });

    await fetchComments(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(200);
  });
});
