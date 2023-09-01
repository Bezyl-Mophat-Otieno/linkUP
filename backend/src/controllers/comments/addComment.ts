import DB from "../../database/dbHelper.js";
import { Request , Response } from "express";
import { StatusCodes } from "http-status-codes";
import { v4 } from "uuid";

const addComment = async (req: Request, res: Response) => {
    const { content, user_id, post_id } = req.body;
    if(!content || !user_id || !post_id)
    return res.status(StatusCodes.BAD_REQUEST).json({message: "Please provide all the required fields"})

    const comment_id = v4();

    try {
        const result = await DB.executeProcedure("addComment", {...req.body, comment_id});
        if(result.rowsAffected[0] === 0)
        return res.status(StatusCodes.BAD_REQUEST).json({message: "Failed to add comment"});
        return res.status(StatusCodes.OK).json({message: "Comment added successfully"});
        
    } catch (error:any) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message});
        
    }
   

}





export default addComment ;



