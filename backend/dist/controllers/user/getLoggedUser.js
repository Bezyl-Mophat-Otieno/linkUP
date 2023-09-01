import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
const getLoggedUser = (req, res) => {
    try {
        const { token } = req.headers;
        if (!token)
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "Token not found" });
        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        res
            .status(StatusCodes.OK)
            .json({ message: "User fetched successfully", user: decodedData });
    }
    catch (error) {
        console.log(error);
        res.status(StatusCodes.UNAUTHORIZED).json({ message: error.message });
    }
};
export default getLoggedUser;
