import { StatusCodes } from "http-status-codes";
import DB from "../../database/dbHelper.ts";
import { Request, Response } from "express";

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Id is required" });
    const result = await DB.executeProcedure("updateProduct", {
      ...req.body,
      id,
    });
    if (result.rowsAffected[0] === 0)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Product not found", status: "failed" });
    return res
      .status(StatusCodes.OK)
      .json({ message: "Product updated successfully", status: "success" });
  } catch (error: any) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message, status: "failed" });
  }
};

export default updateProduct;
