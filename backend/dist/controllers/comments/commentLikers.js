import DB from "../../database/dbHelper.js";
import { StatusCodes } from "http-status-codes";
const commentLikers = async (req, res) => {
    const { id } = req.params;
    if (!id)
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'comment id is required' });
    try {
        const result = await DB.executeProcedure('fetchCommentLikers', { comment_id: id });
        if (result.recordset.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Comment not liked' });
        }
        return res.status(StatusCodes.OK).json({ message: 'Comment likers fetched successfully', likers: result.recordset, status: "success" });
    }
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};
export default commentLikers;
