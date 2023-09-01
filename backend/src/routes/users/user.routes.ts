import addUser from '../../controllers/users/addUser.js';
import deactivateUser from '../../controllers/users/deactivateUser.js';
import getUser from '../../controllers/users/getUser.js';
import updateUser from '../../controllers/users/updateUser.js';
import activateUser from '../../controllers/users/activateUser.js';
import fetchUsers from '../../controllers/users/fetchUsers.js';
import getLoggedUser from '../../controllers/users/getLoggedUser.js';
import resetPassword from '../../controllers/users/resetPassword.js';
import loginUser from '../../controllers/users/loginUser.js';
import { Router } from 'express';
const userRouter = Router();
userRouter.post('/add', addUser);
userRouter.put('/deactivate/:id', deactivateUser);
userRouter.put('/activate/:id', activateUser);
userRouter.put('/update/:id', updateUser);
userRouter.get('/get/:id', getUser);
userRouter.get('/fetch', fetchUsers);
userRouter.get('/getLoggedUser', getLoggedUser);
userRouter.post('/resetPassword', resetPassword);
userRouter.post('/login', loginUser);





export default userRouter;