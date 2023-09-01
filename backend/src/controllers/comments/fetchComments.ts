import DB  from '../../database/dbHelper.js';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const fetchComments = async (req: Request, res: Response) => {
    try {
        const result = await DB.executeProcedure('allComments');
        if (result.rowsAffected[0] === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Comments not found' });
        }
        return res.status(StatusCodes.OK).json({ message: 'Comments fetched successfully', comments: result.recordset });
    } catch (error: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export default fetchComments;