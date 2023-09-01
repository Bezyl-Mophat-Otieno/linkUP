import DB from "../../database/dbHelper/index.ts";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "No id provided", status: "failed" });
        // if you try to update the passsword let's first hash it
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        const result = await DB.executeProcedure("updateUser", { ...req.body, id });
        if (result.rowsAffected[0] === 0)
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found.Therefore not updated",
                status: "failed",
            });
        return res
            .status(200)
            .json({ message: "User updated successfully", status: "success" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};
export default updateUser;
