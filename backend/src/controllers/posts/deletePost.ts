import { Request, Response } from "express";
import DB from "../../database/dbHelper.ts";
import { StatusCodes } from "http-status-codes";

const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id)
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Post Id was not provided",
    });

  try {
    const result = await DB.executeProcedure("deletePost", { post_id: id });
    if (result.rowsAffected[0] === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "No post found",
      });
    } else {
      return res.status(StatusCodes.OK).json({
        message: "Post deleted successfully",
        status: "success",
      });
    }
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

export default deletePost;
