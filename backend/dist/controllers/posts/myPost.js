import DB from "../../database/dbHelper.js";
import { StatusCodes } from "http-status-codes";
const myPost = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await DB.executeProcedure("myPosts", { user_id: id });
        if (result.recordset.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "No post found",
            });
        }
        else {
            return res.status(StatusCodes.OK).json({
                message: "Posts fetched successfully",
                status: "success",
                posts: result.recordset
            });
        }
    }
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};
export default myPost;
