import DB from "../../database/dbHelper/index.ts";
import { StatusCodes } from "http-status-codes";
const getOrder = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Id is required" });
    }
    try {
        const result = await DB.executeProcedure("getOrder", { user_id: id });
        const products = result.recordset;
        if (result.recordset.length === 0)
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "No products found" });
        return res
            .status(StatusCodes.OK)
            .json({ products: products, status: "success" });
    }
    catch (error) {
        console.log(error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message, status: "failed" });
    }
};
export default getOrder;
