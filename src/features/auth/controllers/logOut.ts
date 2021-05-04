import {Request, Response} from "express";
import {IUser} from "../models/user";
import {cookieSettings} from "../../../main/cookie";



export const logOut = async (req: Request, res: Response, user: IUser) => {

    res.cookie("token", "", {
        ...cookieSettings,
        expires: new Date( 0),
    }).status(200).json({info: "logOut success"})
};