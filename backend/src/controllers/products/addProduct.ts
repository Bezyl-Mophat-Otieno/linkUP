import DB from "../../database/dbHelper.ts";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { v4 } from "uuid";

const addProduct = async (req: Request, res: Response) => {
  try {
    const id = v4();
    const { name, description, price } = req.body;

    if (!name || !description || !price)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please fill all fields" });
    console.log({ ...req.body, id });
    const result = await DB.executeProcedure("addProduct", { ...req.body, id });

    if (result.rowsAffected[0] === 0)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Something went wrong,The Product was not added",
        status: "failed",
      });

    return res
      .status(StatusCodes.OK)
      .json({ message: "Product added successfully", status: "success" });
  } catch (error: any) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export default addProduct;
