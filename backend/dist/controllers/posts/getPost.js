import DB from "../../database/dbHelper.js";
import { StatusCodes } from "http-status-codes";
const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await DB.executeProcedure('getPost', { post_id: id });
        if (result.recordset.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "No post found",
            });
        }
        else {
            return res.status(StatusCodes.OK).json({
                message: "Post fetched successfully",
                status: "success",
                post: result.recordset[0]
            });
        }
    }
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};
export default getPost;
