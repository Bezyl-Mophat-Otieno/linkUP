import { Request, Response } from "express";
import addUser from "../../src/controllers/users/addUser.ts";
import DB from "../../src/database/dbHelper.ts";
import bcrypt from "bcryptjs";

jest.mock("../../src/database/dbHelper.ts");
jest.mock("bcryptjs");
describe(" Testing Out Add User Controller", () => {
  it("should return 400 if required fields are not provided", async () => {
    const mockedReq = {
      body: {},
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    await addUser(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "Please provide all the required fields",
    });
  });

  it("it should error out incase the user already exists in the database", async () => {
    const mockedReq = {
      body: {
        username: "test",
        email: "test@gmail.com",
        password: "test_password",
      },
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (bcrypt.hash as jest.Mock).mockResolvedValueOnce("hashedPassword");

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [0],
    });
    await addUser(mockedReq, mockedRes);
    // expect(mockedRes.status).toHaveBeenCalledWith(500);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "User already exists",
      status: "failed",
    });
  });

  it("it should create a user successfully", async () => {
    const mockedReq = {
      body: {
        username: "test",
        email: "test_email",
        password: "test_password",
      },
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (bcrypt.hash as jest.Mock).mockResolvedValueOnce("hashedPassword");

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [1],
    });
    await addUser(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(201);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "User created successfully",
      status: "success",
    });
  });
});
