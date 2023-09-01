import DB from "../../database/dbHelper.js";
import { StatusCodes } from "http-status-codes";
const addSubcomment = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status)
        return res.status(StatusCodes.BAD_REQUEST).send("status is required");
    if (!id)
        return res.status(StatusCodes.BAD_REQUEST).send("id is required");
    try {
        const result = await DB.executeProcedure('addSubcomment', { status, comment_id: id });
        if (result.rowsAffected[0] === 0) {
            return res.status(StatusCodes.NOT_FOUND).send("comment not found");
        }
    }
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
};
export default addSubcomment;
