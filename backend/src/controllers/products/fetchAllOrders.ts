import DB from "../../database/dbHelper.js";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const fetchAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await DB.executeProcedure("fetchAllOrders");
    const orders = result.recordset;
    console.log(orders);
    if (result.recordset.length === 0)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No orders found" });
    return res
      .status(StatusCodes.OK)
      .json({ orders: orders, status: "success" });
  } catch (error: any) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message, status: "failed" });
  }
};
export default fetchAllOrders;
