import {Response, Request} from "express";
import User, {IUser} from "../../auth/models/user";
import {status400, status500} from "../../auth/helpers/errorStatuses";
import CandidatesPack, {ICandidatePack} from "../models/candidatesPack";
import {resCookie} from "../../../main/cookie";

export const addCandidatePack = async (req: Request, res: Response, user:IUser) => {
    const {candidatesPack} = req.body;
    console.log(candidatesPack)
    if(!candidatesPack)
        status400(res, "No cardsPack in body! /ᐠ-ꞈ-ᐟ\\", user, "addCardsPack", {body: req.body});

    else {
        const pathF = candidatesPack.path || "/def";
        const typeF = candidatesPack.type || "pack";
        const recommendationF = candidatesPack.recommendation || '';

        CandidatesPack.create({
            user_id: user._id,
            user_name: user.name,
            name: candidatesPack.name,
            path: pathF,
            status: '',
            more_id: user._id,
            recommendation: recommendationF,
            leaderInterview: null,
            position: candidatesPack.position,
            date: new Date(Date.parse(candidatesPack.date)).toISOString(),
            time: candidatesPack.time,
            phone: candidatesPack.phone,
            meeting: null,
            SS: null,
            total: '',
            type: typeF,
            created: new Date(),
            updated: new Date(),
            _doc: {},
        }).then((newCardsPack: ICandidatePack) => {
            User.findById(
                user._id
            )
                .exec()
                .then((updatedUser: IUser | null) => {
                    if (!updatedUser) status400(res, "not updated? /ᐠ｡ꞈ｡ᐟ\\", user, "addCardsPack");
                    else resCookie(res, user).status(201).json({
                        newCardsPack,
                        token: user.token,
                        tokenDeathTime: user.tokenDeathTime,
                    });
                })
                .catch(e => status500(res, e, user, "addCardsPack/User.findByIdAndUpdate"))
        })
            .catch(e => status500(res, e, user, "addCardsPack/CardsPack.create"));
    }
}