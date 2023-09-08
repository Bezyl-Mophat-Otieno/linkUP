import {Request,Response} from 'express';
import DB from '../../database/dbHelper.ts';
import { StatusCodes } from 'http-status-codes';


const deleteComment = async ( req : Request , res : Response)=>{
    const {id} = req.params ;
    
    try {

        const result = await DB.executeProcedure('deleteComment',{comment_id:id});
        if(result.rowsAffected[0]===0){
            return res.status(StatusCodes.NOT_FOUND).json({message:'Comment not found'});
        }
        return res.status(StatusCodes.OK).json({message:'Comment deleted successfully'});
        
    } catch (error:any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:error.message})
        
    }

} 

export default deleteComment;