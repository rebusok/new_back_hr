"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCandidatesCards = void 0;
const candidatesPack_1 = __importDefault(require("../models/candidatesPack"));
const cookie_1 = require("../../../main/cookie");
const errorStatuses_1 = require("../../auth/helpers/errorStatuses");
exports.getCandidatesCards = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { sortPacks, packName, user_id, type, searchStatus, searchTotal, searchPosition } = req.query;
    const sortPacksF = sortPacks || ""; // '0grade'
    const packNameF = packName || "";
    const searchStatusF = searchStatus || "";
    const searchTotalF = searchTotal || "";
    const searchPositionF = searchPosition || "";
    const user_idF = user_id || undefined;
    // const typeF = type as string | undefined || "pack";
    const user_idO = user_idF ? { user_id: user_idF } : undefined; // options
    candidatesPack_1.default.findOne(user_idO)
        .sort({ date: -1 }).exec()
        .then((CandidatesPackDateMax) => {
        // Сортировка по увеличению и уменьшению разбивка квери параметра
        const sortName = (sortPacksF && sortPacksF.length > 2) ? sortPacksF.slice(1) : "";
        const direction = sortName ? (sortPacksF[0] === "0" ? -1 : 1) : undefined;
        const sortO = sortName ? { [sortName]: direction } : {};
        console.log(searchPositionF);
        const findBase = {
            name: new RegExp(packNameF, "gi"),
            status: new RegExp(`^${searchStatusF}`, "gi"),
            total: new RegExp(searchTotalF, "gi"),
            position: new RegExp(searchPositionF, "gi"),
        };
        const findPrivate = user_idF && user._id.equals(user_idF) ? {} : { private: false };
        const findByUserId = user_id ? { user_id: user_idF } : {};
        const findO = Object.assign(Object.assign(Object.assign({}, findByUserId), findBase), findPrivate);
        candidatesPack_1.default.find(findO)
            .exec()
            .then(totalCountCandidatesPack => {
            const totalPacks = totalCountCandidatesPack.length;
            candidatesPack_1.default.find(findO)
                .sort(Object.assign(Object.assign({}, sortO), { updated: -1 }))
                .lean()
                .exec()
                .then(candidatesPacks => {
                cookie_1.resCookie(res, user).status(200)
                    .json({
                    candidatesPacks,
                    totalPacks,
                    token: user.token,
                    tokenDeathTime: user.tokenDeathTime,
                });
            }).catch(e => errorStatuses_1.status500(res, e, user, "getCardPacks/CardsPack.find"));
        }).catch(e => errorStatuses_1.status500(res, e, user, "getCardPacks/TotalCandidates"));
    }).catch(e => errorStatuses_1.status500(res, e, user, "getCardPacks/CardsPack.findOne/min"));
});
//# sourceMappingURL=getCandidatesCards.js.map