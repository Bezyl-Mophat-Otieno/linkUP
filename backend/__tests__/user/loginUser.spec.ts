import DB from "../../src/database/dbHelper.ts";
import { Request, Response } from "express";
import loginUser from "../../src/controllers/users/loginUser.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");
jest.mock("bcryptjs");
jest.mock("../../src/database/dbHelper.ts");
describe("loginUser", () => {
  it("should return a status code of 400 if email or password is not provided", async () => {
    const mockedReq = {
      body: {},
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    await loginUser(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "Please enter all fields",
    });
  });
  it("It should show a message when the user does not exist", async () => {
    const mockedReq = {
      body: {
        email: "test@gmail.com",
        password: "test123",
      },
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      recordset: [],
    });

    await loginUser(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(404);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "User does not exist",
    });
  });
  it("it should prevent a user from logging in if the account is deactivated", async () => {
    const mockedReq = {
      body: {
        email: "test@gmail.com",
        password: "test123",
      },
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const mockedUser = {
      username: "test",
      email: "test@gmail.com",
      password: "test_password",
      deleted: true,
    };

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      recordset: [mockedUser],
    });
    await loginUser(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "Your account is deactivated",
    });
  });
  it("Should error out if the password is incorrect", async () => {
    const mockedReq = {
      body: {
        email: "test_email",
        password: "test_password",
      },
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockedUser = {
      username: "test",
      email: "test@gmail.com",
      password: "test_password",
      deleted: false,
    };
    await (DB.executeProcedure as jest.Mock).mockReturnValueOnce({
      recordset: [mockedUser],
    });
    await (bcrypt.compare as jest.Mock).mockReturnValueOnce(false);
    await loginUser(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(400);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "Invalid credentials",
      status: "failed",
    });
  });

  it("should login the user successfully", async () => {
    const mockedReq = {
      body: {
        email: "test_email",
        password: "test_password",
      },
    } as unknown as Request;

    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockedUser = {
      username: "test",
      email: "test@gmail.com",
      password: "test_password",
      deleted: false,
    };
    await (DB.executeProcedure as jest.Mock).mockReturnValueOnce({
      recordset: [mockedUser],
    });
    await (bcrypt.compare as jest.Mock).mockReturnValueOnce(true);
    (jwt.sign as jest.Mock).mockReturnValueOnce("mockedToken");

    await loginUser(mockedReq, mockedRes);
    expect(mockedRes.status).toHaveBeenCalledWith(200);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "Login successful",
      token: "mockedToken",
      status: "success",
    });
  });
});
