import DB from "../../database/dbHelper/index.ts";
import { StatusCodes } from "http-status-codes";
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "Id is required" });
        const result = await DB.executeProcedure("deleteProduct", { id });
        if (result.rowsAffected[0] === 0)
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Product not found", status: "failed" });
        return res
            .status(StatusCodes.OK)
            .json({ message: "Product deleted successfully", status: "success" });
    }
    catch (error) {
        console.log(error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message, status: "failed" });
    }
};
export default deleteProduct;
