import DB from "../../database/dbHelper.js";
import { StatusCodes } from "http-status-codes";
const getUser = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(StatusCodes.BAD_REQUEST).send({ message: "id is required" });
    }
    try {
        const result = await DB.executeProcedure("fetchUser", { id });
        const user = result.recordset[0];
        if (result.recordset.length > 0) {
            res
                .status(StatusCodes.OK)
                .json({ message: "user found", user, status: "success" });
        }
        if (result.recordset.length === 0) {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "user not found", status: "failed" });
        }
    }
    catch (error) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message, status: "failed" });
    }
};
export default getUser;
