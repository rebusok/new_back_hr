import {Request, Response} from "express";
import {IUser} from "../models/user";
import {resCookie} from "../../../main/cookie";



export const getMe = async (req: Request, res: Response, user: IUser) => {
    const body: any = {...user};
    delete body.password; // don't send password to the front
    delete body.resetPasswordToken;
    delete body.resetPasswordTokenDeathTime;

   await resCookie(res, user).status(200).json({...body});

};