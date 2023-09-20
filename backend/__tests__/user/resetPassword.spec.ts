import DB from "../../src/database/dbHelper.ts";
import sendMail from "../../src/emailService/sendMail.ts";
import resetPassword from "../../src/controllers/users/resetPassword.ts";

import { Request, Response } from "express";

jest.mock("../../src/database/dbHelper.ts");
jest.mock("../../src/emailService/sendMail.ts");
describe("Testing Out Reset Password ", () => {
  it("should return 400 if email is not provided", async () => {
    const mockeReq = {
      body: {},
    } as unknown as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await resetPassword(mockeReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Please Provide Your Email Address",
    });
  });

  it("should error out with a status of 400 if user does not exist", async () => {
    const mockeReq = {
      body: {
        email: "test_email",
      },
    } as unknown as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      recordset: [],
    });

    await resetPassword(mockeReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "User does not exist",
    });
  });

  it("should return 200 if user exist and then send the email ", async () => {
    const mockeReq = {
      body: {
        email: "test_email",
      },
    } as unknown as Request;

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockedUser = {
      id: 1,
      usename: "test_user",
      email: "test_email",
      role: "test_role",
      password: "test_password",
    };

    const mockedMessageOptions = {
      from: "test_from",
      to: "test_email",
      subject: "test_subject",
      text: "test_text",
    };

    (sendMail as jest.Mock).mockResolvedValueOnce({
      accepted: ["recipient@example.com"],
      rejected: [],
      envelopeTime: 1010,
      messageTime: 720,
      messageSize: 354,
      response: "250 2.0.0 OK  1657313721 i12si18102814qtc.381 - gsmtp",
      envelope: { from: "sender@example.com", to: ["recipient@example.com"] },
      messageId: "<random_id@example.com>",
    });
    await (DB.executeProcedure as jest.Mock).mockResolvedValueOnce({
      recordset: [mockedUser],
    });

    await sendMail(mockedMessageOptions);
    await resetPassword(mockeReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Please check your email for the password reset link",
      status: "success",
    });
    expect(sendMail).toHaveBeenCalledWith(mockedMessageOptions);
  });
});
