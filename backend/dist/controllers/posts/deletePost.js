import DB from "../../database/dbHelper.js";
import { StatusCodes } from "http-status-codes";
const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await DB.executeProcedure("deletePost", { post_id: id });
        if (result.rowsAffected[0] === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "No post found",
            });
        }
        else {
            return res.status(StatusCodes.OK).json({
                message: "Post deleted successfully",
                status: "success",
            });
        }
    }
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};
export default deletePost;
