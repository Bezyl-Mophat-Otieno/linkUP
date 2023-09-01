import DB from '../../database/dbHelper.js'
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const fetchProducts = async (req: Request, res: Response) => {
  try {
    const result = await DB.executeProcedure("fetchProducts");
    const products = result.recordset;
    if (result.recordset.length === 0)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No products found" });
    return res
      .status(StatusCodes.OK)
      .json({ products: products, status: "success" });
  } catch (error: any) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message, status: "failed" });
  }
};
export default fetchProducts;
