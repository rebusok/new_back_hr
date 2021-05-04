import {Request, Response} from "express";
import {validateAuth} from "../helpers/validators";
import User, {IUser} from "../models/user";
import bCrypt from "bcrypt";
import {DEV_VERSION} from "../../../main/config";

export const createUser = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    if (validateAuth(req, res, "createUser")) {
        try {
            const oldUser: IUser | null = await User.findOne({email}).exec();

            if (oldUser)
                res.status(400).json({error: "email already exists /ᐠ｡ꞈ｡ᐟ\\", email, in: "createUser"});

            else {
                const user: IUser = await User.create(
                    {
                        email,
                        password: await bCrypt.hash(password, 8),
                        rememberMe: false,
                        isAdmin: false,

                        name: email,
                        verified: false,
                        // avatar: "",

                        // token: "",
                        // tokenDeathTime: 0,
                        // resetPasswordToken: "",
                        // resetPasswordTokenDeathTime: 0,

                        created: new Date(),
                        updated: new Date(),

                        _doc: {}, // crutch
                    }
                );

                const addedUser: any = {...user._doc};

                delete addedUser.password; // don't send password to the front
                delete addedUser.resetPasswordToken;
                delete addedUser.resetPasswordTokenDeathTime;

                res.status(201).json({addedUser});
            }
        } catch (e) {
            res.status(500).json({
                error: "some error: " + e.message,
                info: "Back doesn't know what the error is... ^._.^",
                errorObject: DEV_VERSION && {...e},
                in: "createUser/User.create",
            });
        }
    }
};