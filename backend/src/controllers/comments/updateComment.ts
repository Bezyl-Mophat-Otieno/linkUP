import DB from "../../database/dbHelper.ts";
import { StatusCodes } from "http-status-codes";
import { Request , Response } from "express";
const updateComment = async (req:Request, res:Response) => {
    const {id} = req.params;
    const {content } = req.body;
    if(!id) return res.status(StatusCodes.BAD_REQUEST).json({message:'Id is required'});

    try {
        const result = await DB.executeProcedure('updateComment',{content,comment_id:id});
        if(result.rowsAffected[0]===0){
            return res.status(StatusCodes.NOT_FOUND).json({message:'Comment not found'});
        }
        return res.status(StatusCodes.OK).json({message:'Comment updated successfully'});
        
    } catch (error:any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:error.message})
        
    }
};

export default updateComment;
