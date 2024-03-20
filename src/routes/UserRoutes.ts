import express from 'express'
import { createUser, deleteUser, login, updateUser } from '../controllers/userController'
import { isAuth } from '../utils'

const userRouter = express.Router()

userRouter.post('/create', createUser)

userRouter.get('/login',login);

userRouter.put('/update/:id',isAuth,updateUser);

userRouter.delete('/delete',isAuth,deleteUser)



export default userRouter;
