"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const findUserByToken_1 = require("../auth/helpers/findUserByToken");
const addCardsPack_1 = require("./controllers/addCardsPack");
const getCandidatesCards_1 = require("./controllers/getCandidatesCards");
const updateCandidatesCards_1 = require("./controllers/updateCandidatesCards");
const candidates = express_1.default.Router();
candidates.post("/pack", findUserByToken_1.findUserByToken(addCardsPack_1.addCandidatePack, "addCandidatePack"));
candidates.get("/pack", findUserByToken_1.findUserByToken(getCandidatesCards_1.getCandidatesCards, "getCandidatePacks"));
candidates.put("/pack", findUserByToken_1.findUserByToken(updateCandidatesCards_1.updateCandidatesCards, "getCandidatePacks"));
exports.default = candidates;
//# sourceMappingURL=index.js.map