import DB from "../../database/dbHelper.ts";
import { Request, Response } from "express";

const getNotFollowed = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const result = await DB.executeProcedure("getNotFollowed", { user_id: id });
    console.log(result);
    if (result.rowsAffected[0] > 0) {
      return res.status(200).json({
        message: "Not Followed Persons retrieved successfully",
        followers: result.recordset,
      });
    }
    return res.status(404).json({ message: "Could not retrieve followers" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
export default getNotFollowed;
