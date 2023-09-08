import { Request, Response } from "express";
import DB from "../../database/dbHelper.ts";
import { StatusCodes } from "http-status-codes";
import sendMail from "../../emailService/sendMail.ts";

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please Provide Your Email Address" });
    }
    // fetch the user from the database
    const result = await DB.executeProcedure("getUser", { email });
    const user = result.recordset[0];
    if (result.recordset.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User does not exist" });
    } else {
      const messageOptions = {
        from: process.env.EMAIL as string,
        to: user.email,
        subject: "Password Reset",
        text:
          "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
          "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
          `http://127.0.0.1:5500/frontend/user-dashboard/update-password/index.html?id=${user.id}\n\n` +
          "If you did not request this, please ignore this email and your password will remain unchanged.\n",
      };
      await sendMail(messageOptions);
      return res.status(StatusCodes.OK).json({
        message: "Please check your email for the password reset link",
        status: "success",
      });
    }
  } catch (error: any) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message, status: "failed" });
  }
};

export default resetPassword;
