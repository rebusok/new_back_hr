import {Request, Response} from "express";
import CandidatesPack, {ICandidatePack} from "../models/candidatesPack";
import {IUser} from "../../auth/models/user";
import {resCookie} from "../../../main/cookie";
import {status500} from "../../auth/helpers/errorStatuses";

export const getCandidatesCards = async (req: Request, res: Response, user: IUser) => {
    const { sortPacks, packName,user_id, type, searchStatus, searchTotal, searchPosition} = req.query;
    const sortPacksF: string = sortPacks as string | undefined || ""; // '0grade'
    const packNameF: string = packName as string | undefined || "";
    const searchStatusF: string = searchStatus as string | undefined || "";
    const searchTotalF: string = searchTotal as string | undefined || "";
    const searchPositionF: string = searchPosition as string | undefined || "";

    const user_idF = user_id as string | undefined || undefined;
    // const typeF = type as string | undefined || "pack";

    const user_idO = user_idF ? {user_id: user_idF} : undefined; // options

    CandidatesPack.findOne(user_idO)
        .sort({date: -1}).exec()
        .then((CandidatesPackDateMax: ICandidatePack | null) => {
            // Сортировка по увеличению и уменьшению разбивка квери параметра
            const sortName: string = (sortPacksF && sortPacksF.length > 2) ? sortPacksF.slice(1) : "";
            const direction = sortName ? (sortPacksF[0] === "0" ? -1 : 1) : undefined;
            const sortO = sortName ? {[sortName]: direction} : {};
            console.log(searchPositionF)
            const findBase = {
                name: new RegExp(packNameF, "gi"),
                status: new RegExp(`^${searchStatusF}`, "gi"),
                total: new RegExp(searchTotalF, "gi"),
                position: new RegExp(searchPositionF, "gi"),
            };
            const findPrivate = user_idF && user._id.equals(user_idF) ? {} : {private: false};
            const findByUserId = user_id ? {user_id: user_idF} : {};
            const findO = {
                ...findByUserId,
                ...findBase,
                ...findPrivate
            };
            CandidatesPack.find(findO)
                .exec()
                .then(totalCountCandidatesPack => {
                    const totalPacks = totalCountCandidatesPack.length

                    CandidatesPack.find(findO)
                        .sort({...sortO, updated: -1})
                        .lean()
                        .exec()
                        .then(candidatesPacks => {

                            resCookie(res, user).status(200)
                                .json({
                                    candidatesPacks,
                                    totalPacks,
                                    token: user.token,
                                    tokenDeathTime: user.tokenDeathTime,
                                });
                        }).catch(e => status500(res, e, user, "getCardPacks/CardsPack.find"))
                }).catch(e => status500(res, e, user, "getCardPacks/TotalCandidates"))

        }).catch(e => status500(res, e, user, "getCardPacks/CardsPack.findOne/min"))

}