import DB from "../../database/dbHelper.ts";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { v4 } from "uuid";

const addSubComment = async (req: Request, res: Response) => {
  const { content, user_id, post_id, comment } = req.body;
  if (!content || !user_id || !post_id || !comment)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide all the required fields" });

  const comment_id = v4();

  const reqBody = {
    content,
    user_id,
    post_id,
  };

  try {
    // Create this new subcomment as a comment
    const result = await DB.executeProcedure("addComment", {
      ...reqBody,
      comment_id,
    });
    const subComment_id = comment_id;

    // Add the details of the subcomment and The Comment to the Table SubComments
    const result2 = await DB.executeProcedure("addSubComment", {
      subComment_id,
      comment,
    });

    if (result2.rowsAffected[0] === 0 && result.rowsAffected[0] === 0)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Failed to add a sub comment" });
    return res
      .status(StatusCodes.OK)
      .json({ message: "Sub Comment added successfully" });
  } catch (error: any) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export default addSubComment;
