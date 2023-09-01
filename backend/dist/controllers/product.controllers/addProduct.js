import DB from "../../database/dbHelper/index.ts";
import { StatusCodes } from "http-status-codes";
import { v4 } from "uuid";
const addProduct = async (req, res) => {
    try {
        const id = v4();
        const { name, description, price } = req.body;
        if (!name || !description || !price)
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "Please fill all fields" });
        const result = await DB.executeProcedure("addProduct", { ...req.body, id });
        if (result.rowsAffected[0] === 0)
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Something went wrong,The Product was not added",
                status: "failed",
            });
        return res
            .status(StatusCodes.OK)
            .json({ message: "Product added successfully", status: "success" });
    }
    catch (error) {
        console.log(error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};
export default addProduct;
