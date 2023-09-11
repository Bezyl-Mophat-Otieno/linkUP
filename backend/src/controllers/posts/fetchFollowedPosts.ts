import { Request, Response } from "express";
import DB from "../../database/dbHelper.ts";
import { StatusCodes } from "http-status-codes";

const fetchFollowedPosts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await DB.executeProcedure("followedPosts", { user_id: id });
    if (result.recordset.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "No posts found",
      });
    } else {
      return res.status(StatusCodes.OK).json({
        message: "Posts fetched successfully",
        status: "success",
        posts: result.recordset,
      });
    }
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};
export default fetchFollowedPosts;
