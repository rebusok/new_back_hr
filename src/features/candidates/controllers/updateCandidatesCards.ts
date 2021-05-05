import {Response, Request} from "express";
import {IUser} from "../../auth/models/user";
import {status400, status500} from "../../auth/helpers/errorStatuses";
import CandidatesPack, {ICandidatePack} from "../models/candidatesPack";
import {resCookie} from "../../../main/cookie";

export const updateCandidatesCards = async (req:Request, res:Response, user: IUser) => {
    const {candidatePack} = req.body;

    if (!candidatePack)
        status400(res, "No cardsPack in body! /ᐠ-ꞈ-ᐟ\\", user, "updateCardsPack", {body: req.body});
    else if (!candidatePack._id)
        status400(res, "No CardsPack id /ᐠ-ꞈ-ᐟ\\", user, "updateCardsPack", {body: req.body});

    else{
        const nameF = candidatePack.name || undefined;
        const pathF = candidatePack.path || undefined;
        const typeF = candidatePack.type || undefined;
        const positionF = candidatePack.position || undefined;
        const statusF = candidatePack.status || undefined;
        const recommendationF = candidatePack.recommendation || undefined;
        const leaderInterviewF = candidatePack.leaderInterview || undefined;
        const dateF = candidatePack.date || undefined;
        const SSF = candidatePack.SS || undefined;
        const totalF = candidatePack.total || undefined;

        CandidatesPack.findById(candidatePack._id)
            .exec()
            .then((oldCandidatePack: ICandidatePack | null) => {
                if (!oldCandidatePack) status400(res, "CardsPack id not valid /ᐠ-ꞈ-ᐟ\\", user, "updateCardsPack",
                    {body: req.body});
                else if(!oldCandidatePack.user_id.equals(user._id))status400(res, "not your CardsPack! /ᐠ｡ꞈ｡ᐟ\\", user,
                    "updateCardsPack", {body: req.body});
                else {
                    CandidatesPack.findByIdAndUpdate(
                        candidatePack._id,
                        {

                            name: nameF || oldCandidatePack.name,
                            position: positionF || oldCandidatePack.position,
                            status: statusF || oldCandidatePack.status,
                            recommendation: recommendationF || oldCandidatePack.recommendation,
                            leaderInterview: leaderInterviewF || oldCandidatePack.leaderInterview,
                            date: dateF || oldCandidatePack.date,
                            SS: SSF || oldCandidatePack.SS,
                            total: totalF || oldCandidatePack.total,
                            path: pathF || oldCandidatePack.path,
                            type: typeF || oldCandidatePack.type,
                        },
                        {new: true}
                    )
                        .exec()
                        .then((updatedCandidatePack: ICandidatePack | null) => {
                            if (!updatedCandidatePack) status400(res, "not updated? /ᐠ｡ꞈ｡ᐟ\\", user, "updateCardsPack");
                            else resCookie(res, user).status(200).json({
                                updatedCandidatePack,
                                token: user.token,
                                tokenDeathTime: user.tokenDeathTime,
                            });
                        }).catch(e => status500(res, e, user, "updateCardsPack/CardsPack.findByIdAndUpdate"));
                }
            }) .catch(e => status500(res, e, user, "updateCardsPack/CardsPack.findById"));
    }

}