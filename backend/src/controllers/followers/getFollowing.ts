import DB from "../../database/dbHelper.js";
import { Request, Response } from "express";


const getFollowing = async (req: Request, res: Response) => {

    const {username}=req.params;
    if(!username){
        return res.status(400).json({message:"Missing required fields"})
    }
    try {

        const result = await DB.executeProcedure("get", {username});
        if(result.rowsAffected[0] > 0){
            return res.status(200).json({message:"Followers retrieved successfully",followers:result.recordset})
        }
        return res.status(400).json({message:"Could not retrieve followers"})
        
    } catch (error:any) {
        return res.status(500).json({message:error.message})
        
    }

}
export default getFollowing;

    







