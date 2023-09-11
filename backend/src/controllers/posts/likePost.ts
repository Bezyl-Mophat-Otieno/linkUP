import DB from "../../database/dbHelper.ts";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

const likePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user_id } = req.body;
  if (!id)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "post id is required" });
  if (!user_id)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "user id is required" });
  try {
    const result = await DB.executeProcedure("likePost", {
      post_id: id,
      user_id: user_id,
    });
    if (result.rowsAffected[0] === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Post not found" });
    }
    return res
      .status(StatusCodes.OK)
      .json({ message: "Post liked successfully", status: "success" });
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export default likePost;
