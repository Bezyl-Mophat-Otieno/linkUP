import DB from '../../database/dbHelper.js';
import { Request, Response } from "express";

const deactivateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id)
      return res
        .status(400)
        .json({ message: "No id provided", status: "failed" });
    const result = await DB.executeProcedure("deactivateUser", { id });
    if (result.rowsAffected[0] === 0)
      return res
        .status(404)
        .json({ message: "User not found", status: "failed" });
    return res
      .status(200)
      .json({ message: "User Deactivated successfully", status: "success" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: "failed" });
  }
};

export default deactivateUser;
