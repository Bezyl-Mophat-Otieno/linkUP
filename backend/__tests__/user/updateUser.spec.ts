import { Request, Response } from "express";
import updateUser from "../../src/controllers/users/updateUser.ts";
import DB from "../../src/database/dbHelper.ts";
import bcrypt from "bcryptjs";
jest.mock("../../src/database/dbHelper.ts");
jest.mock("bcryptjs");

describe("Testing Out Update User Controller", () => {
  it("it should return an error 400 if no id is provided", async () => {
    const mockedReq = {
      params: {},
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    await updateUser(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "No id provided",
      status: "failed",
    });
  });

  it("it should return an error 404 if no user is found", async () => {
    const mockedReq = {
      body: {
        name: "test",
        email: "test_email@gmail.com",
      },
      params: {
        id: "1",
      },
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [0],
    });
    await updateUser(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(404);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "User not found.Therefore not updated",
      status: "failed",
    });
  });
  it("When the update includes a password it should be hashed first", async () => {
    const mockedReq = {
      body: {
        name: "test",
        email: "test_email@gmail.com",
        password: "test_password",
      },
      params: {
        id: "1",
      },
    } as unknown as Request;
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    await (bcrypt.genSalt as jest.Mock).mockResolvedValueOnce("10");

    await (bcrypt.hash as jest.Mock).mockResolvedValueOnce("hashed_password");
    await updateUser(mockedReq, mockedRes);
    expect(bcrypt.hash).toHaveBeenCalledWith("test_password", "10");
  });
});
