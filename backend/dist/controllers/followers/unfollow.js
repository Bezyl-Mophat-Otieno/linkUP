import DB from "../../database/dbHelper.js";
import { StatusCodes } from "http-status-codes";
const unfollow = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'id is required' });
    }
    try {
        const result = await DB.executeProcedure('unfollow', { id });
        if (result.rowsAffected[0] === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
        }
        return res.status(StatusCodes.OK).json({ message: 'User unfollowed successfully' });
    }
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};
export default unfollow;
