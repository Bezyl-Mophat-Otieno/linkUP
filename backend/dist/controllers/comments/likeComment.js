import DB from "../../database/dbHelper.js";
import { StatusCodes } from "http-status-codes";
const likeComment = async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;
    if (!id)
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'comment id is required' });
    if (!user_id)
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'user id is required' });
    try {
        const result = await DB.executeProcedure('likeComment', { comment_id: id, user_id: user_id });
        if (result.rowsAffected[0] === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Comment not found' });
        }
        return res.status(StatusCodes.OK).json({ message: 'Comment liked successfully', status: "success" });
    }
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};
export default likeComment;
