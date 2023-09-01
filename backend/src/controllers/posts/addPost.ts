import { Request , Response } from "express";
import DB from "../../database/dbHelper.js";
import { StatusCodes } from "http-status-codes";
import { v4 } from "uuid";

const addPost = async (req: Request, res: Response) => {
    const { content , image} = req.body;
    const post_id = v4();

    const {id} = req.params;
    
    if(!id){
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "User id is required",
        });
    }
    // Either the image field or the content field must be filled
    if (!content && !image) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Either the image field or the content field must be filled",
        });
    }

    try {
        const result = await DB.executeProcedure("addPost", {...req.body,post_id,user_id: id});
        if(result.rowsAffected[0] === 0){
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Post not added successfully",
            });
        }
        return res.status(StatusCodes.OK).json({
            message: "Post added successfully",
            status: "success",
        })
        
    } catch (error:any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
        
    }

};

export default addPost;