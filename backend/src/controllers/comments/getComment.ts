import DB from "../../database/dbHelper.ts";
import { Request, Response } from "express";

const getComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id)
    return res
      .status(400)
      .json({ error: "Invalid request,the comment id is required" });

  const result = await DB.executeProcedure("getComment", { comment_id: id });
  if (result.recordset.length === 0)
    return res.status(404).json({ error: "Comment not found" });
  return res
    .status(200)
    .json({ status: "success", comment: result.recordset[0] });
};

export default getComment;
