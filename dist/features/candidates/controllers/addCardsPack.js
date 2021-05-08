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
exports.addCandidatePack = void 0;
const user_1 = __importDefault(require("../../auth/models/user"));
const errorStatuses_1 = require("../../auth/helpers/errorStatuses");
const candidatesPack_1 = __importDefault(require("../models/candidatesPack"));
const cookie_1 = require("../../../main/cookie");
exports.addCandidatePack = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { candidatesPack } = req.body;
    if (!candidatesPack)
        errorStatuses_1.status400(res, "No cardsPack in body! /ᐠ-ꞈ-ᐟ\\", user, "addCardsPack", { body: req.body });
    else {
        const pathF = candidatesPack.path || "/def";
        const typeF = candidatesPack.type || "pack";
        const recommendationF = candidatesPack.recommendation || '';
        const ssF = candidatesPack.SS || null;
        candidatesPack_1.default.create({
            user_id: user._id,
            user_name: user.name,
            name: candidatesPack.name,
            path: pathF,
            status: candidatesPack.status,
            more_id: user._id,
            recommendation: recommendationF,
            leaderInterview: candidatesPack.leaderInterview,
            position: candidatesPack.position,
            date: new Date(),
            meeting: candidatesPack.meeting,
            SS: ssF,
            total: candidatesPack.total,
            type: typeF,
            created: new Date(),
            updated: new Date(),
            _doc: {},
        }).then((newCardsPack) => {
            user_1.default.findById(user._id)
                .exec()
                .then((updatedUser) => {
                if (!updatedUser)
                    errorStatuses_1.status400(res, "not updated? /ᐠ｡ꞈ｡ᐟ\\", user, "addCardsPack");
                else
                    cookie_1.resCookie(res, user).status(201).json({
                        newCardsPack,
                        token: user.token,
                        tokenDeathTime: user.tokenDeathTime,
                    });
            })
                .catch(e => errorStatuses_1.status500(res, e, user, "addCardsPack/User.findByIdAndUpdate"));
        })
            .catch(e => errorStatuses_1.status500(res, e, user, "addCardsPack/CardsPack.create"));
    }
});
//# sourceMappingURL=addCardsPack.js.map