import DB from "../../database/dbHelper.js";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";


const postComments = async (req: Request, res: Response) => {
    const { id } = req.params;
    if(!id) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Id is required' });
    try {

        const result = await DB.executeProcedure('postComments', { post_id: id });
        if(result.recordset.length===0){
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Comments not found' });
        }
        return res.status(StatusCodes.OK).json({ message: 'Comments fetched successfully', comments: result.recordset , status:"success" });
        
    } catch (error:any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:error.message})
        
        
    }
}

export default postComments;