import DB from "../../database/dbHelper.js";
import { StatusCodes } from "http-status-codes";
const updatePost = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Post id is required",
        });
    }
    if (!req.body.image && !req.body.content) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Image or content is required when updating a post",
        });
    }
    try {
        const result = await DB.executeProcedure('updatePost', { ...req.body, post_id: id });
        if (result.rowsAffected[0] === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Post not found",
            });
        }
        else {
            return res.status(StatusCodes.OK).json({
                message: "Post updated successfully",
                status: 'success'
            });
        }
    }
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};
export default updatePost;
