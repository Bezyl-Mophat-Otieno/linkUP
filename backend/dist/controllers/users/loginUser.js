import DB from "../../database/dbHelper.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please enter all fields" });
    }
    // fetch the user from the database
    const result = await DB.executeProcedure("getUser", { email });
    const user = result.recordset[0];
    if (result.recordset.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User does not exist" });
    } else {
      if (user.deleted === true) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Your account is deactivated" });
      }
      // compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // create a token
        const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
          expiresIn: "1h",
        });
        return res
          .status(StatusCodes.OK)
          .json({ message: "Login successful", token, status: "success" });
      } else {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Invalid credentials", status: "failed" });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
export default loginUser;
