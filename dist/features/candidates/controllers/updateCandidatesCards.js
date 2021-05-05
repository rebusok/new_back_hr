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
exports.updateCandidatesCards = void 0;
const errorStatuses_1 = require("../../auth/helpers/errorStatuses");
const candidatesPack_1 = __importDefault(require("../models/candidatesPack"));
const cookie_1 = require("../../../main/cookie");
exports.updateCandidatesCards = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { candidatePack } = req.body;
    if (!candidatePack)
        errorStatuses_1.status400(res, "No cardsPack in body! /ᐠ-ꞈ-ᐟ\\", user, "updateCardsPack", { body: req.body });
    else if (!candidatePack._id)
        errorStatuses_1.status400(res, "No CardsPack id /ᐠ-ꞈ-ᐟ\\", user, "updateCardsPack", { body: req.body });
    else {
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
        candidatesPack_1.default.findById(candidatePack._id)
            .exec()
            .then((oldCandidatePack) => {
            if (!oldCandidatePack)
                errorStatuses_1.status400(res, "CardsPack id not valid /ᐠ-ꞈ-ᐟ\\", user, "updateCardsPack", { body: req.body });
            else if (!oldCandidatePack.user_id.equals(user._id))
                errorStatuses_1.status400(res, "not your CardsPack! /ᐠ｡ꞈ｡ᐟ\\", user, "updateCardsPack", { body: req.body });
            else {
                candidatesPack_1.default.findByIdAndUpdate(candidatePack._id, {
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
                }, { new: true })
                    .exec()
                    .then((updatedCandidatePack) => {
                    if (!updatedCandidatePack)
                        errorStatuses_1.status400(res, "not updated? /ᐠ｡ꞈ｡ᐟ\\", user, "updateCardsPack");
                    else
                        cookie_1.resCookie(res, user).status(200).json({
                            updatedCandidatePack,
                            token: user.token,
                            tokenDeathTime: user.tokenDeathTime,
                        });
                }).catch(e => errorStatuses_1.status500(res, e, user, "updateCardsPack/CardsPack.findByIdAndUpdate"));
            }
        }).catch(e => errorStatuses_1.status500(res, e, user, "updateCardsPack/CardsPack.findById"));
    }
});
//# sourceMappingURL=updateCandidatesCards.js.map