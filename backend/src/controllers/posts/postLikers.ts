import DB from "../../database/dbHelper.ts";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

const postLikers = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Post id is required" });

  try {
    const result = await DB.executeProcedure("fetchPostLikers", {
      post_id: id,
    });
    if (result.recordset.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Post not liked" });
    }
    return res.status(StatusCodes.OK).json({
      message: "Post likers fetched successfully",
      likers: result.recordset,
      status: "success",
    });
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export default postLikers;
