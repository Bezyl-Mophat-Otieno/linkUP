import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { v4 } from "uuid";
import DB from "../../database/dbHelper.js";
const addUser = async (req, res) => {
    try {
        const id = v4();
        const { password, ...payload } = req.body;
        if (!password || !payload.username || !payload.email) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "Please provide all the required fields" });
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 5);
            const result = await DB.executeProcedure("addUser", {
                ...payload,
                id,
                password: hashedPassword,
            });
            if (result.rowsAffected[0] === 1) {
                return res
                    .status(StatusCodes.CREATED)
                    .json({ message: "User created successfully", status: "success" });
            }
            else {
                return res
                    .status(StatusCodes.INTERNAL_SERVER_ERROR)
                    .json({ message: "User already exists", status: "failed" });
            }
        }
    }
    catch (error) {
        console.log(error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message, status: "failed" });
    }
};
export default addUser;
