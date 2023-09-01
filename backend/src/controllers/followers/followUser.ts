import DB from '../../database/dbHelper.js';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { v4 } from 'uuid';

const followUser = async (req: Request, res: Response) => {
    const { follower, followed } = req.body;
    const id = v4();

    if (!follower || !followed) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Missing required fields' });
    }

   try {
    const result = DB.executeProcedure('followUser', {...req.body,id});
    if((await result).rowsAffected[0]===0){
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Could not follow user' });
    }
    return res.status(StatusCodes.OK).json({ message: 'User followed successfully' });
    
   } catch (error:any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
   }
}

export default followUser;