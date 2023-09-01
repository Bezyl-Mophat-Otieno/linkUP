import DB from "../../database/dbHelper.js";
import { StatusCodes } from "http-status-codes";
const updateComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    if (!id)
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Id is required' });
    try {
        const result = await DB.executeProcedure('updateComment', { content, comment_id: id });
        if (result.rowsAffected[0] === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Comment not found' });
        }
        return res.status(StatusCodes.OK).json({ message: 'Comment updated successfully' });
    }
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};
export default updateComment;
