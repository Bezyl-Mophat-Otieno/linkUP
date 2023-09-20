import { Request, Response } from "express";
import fetchUsers from "../../src/controllers/users/fetchUsers.ts";
import DB from "../../src/database/dbHelper.ts";

jest.mock("../../src/database/dbHelper.ts");
describe(" Testing Out Fetch Users Controller", () => {
  it("it should return 404 if no users are found", async () => {
    const mockedReq = {
      body: {},
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      recordset: [],
    });
    await fetchUsers(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(404);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "Users Not Found",
      status: "failed",
    });
  });

  it("it should return 200 if users are found", async () => {
    const mockedReq = {
      body: {},
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockedUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john @gmail.com",
        password: "password",
        image: "image_url",
      },

      {
        id: 1,
        name: "John Doe",
        email: "john @gmail.com",
        password: "password",
        image: "image_url",
      },
    ];

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      recordset: mockedUsers,
    });
    await fetchUsers(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(200);
    expect(mockedRes.json).toHaveBeenCalledWith({
      users: mockedUsers,
      status: "success",
    });
  });
});
