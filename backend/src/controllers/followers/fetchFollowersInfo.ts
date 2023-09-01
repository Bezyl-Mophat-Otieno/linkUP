import DB from "../../database/dbHelper.js";
import { Request, Response } from "express";

const fetchFollowersInfo = async (req: Request, res: Response) => {
    try {

        const result = await DB.executeProcedure("fetchFollowersInfo");
        if(result.recordset[0] === 0) {
            return res.status(404).json({message: "No followers found"});
        }
        return res.status(200).json({followersTable:result.recordset , status: "success"});
        
    } catch (error:any) {

        return res.status(500).json({message: error.message});
    }
};

export default fetchFollowersInfo;