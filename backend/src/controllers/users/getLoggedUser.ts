import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

const getLoggedUser = (req: Request, res: Response) => {
  try {
    const { token } = req.headers;
    if (!token)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Token not found" });
    const decodedData = jwt.verify(
      token as string,
      process.env.JWT_SECRET_KEY as string
    );

    res
      .status(StatusCodes.OK)
      .json({ message: "User fetched successfully", user: decodedData });
  } catch (error: any) {
    console.log(error);
    res.status(StatusCodes.UNAUTHORIZED).json({ message: error.message });
  }
};
export default getLoggedUser;
