import express from 'express';
import { del, getAll, getById, login, loginRefresh, post, put } from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';

const userRouter = express.Router();
userRouter.get('/', getAll);
userRouter.get('/:id', getById);
userRouter.post('/', post);
userRouter.put('/:id', put);
userRouter.post('/login', login);
userRouter.post('/loginrefresh', loginRefresh);
userRouter.delete('/:id', del);

export default userRouter;