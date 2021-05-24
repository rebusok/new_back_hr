"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createUser_1 = require("./controllers/createUser");
const logIn_1 = __importDefault(require("./controllers/logIn"));
const getMe_1 = require("./controllers/getMe");
const findUserByToken_1 = require("./helpers/findUserByToken");
const logOut_1 = require("./controllers/logOut");
const passwordRecovery_1 = require("./controllers/passwordRecovery");
const setNewPassword_1 = require("./controllers/setNewPassword");
const auth = express_1.default.Router();
auth.post("/registration", createUser_1.createUser);
auth.post("/login", logIn_1.default);
auth.post("/me", findUserByToken_1.findUserByToken(getMe_1.getMe, "getMe"));
auth.delete("/me", findUserByToken_1.findUserByToken(logOut_1.logOut, "logOut"));
auth.post("/forgot", passwordRecovery_1.passwordRecovery);
auth.post("/set-new-password", setNewPassword_1.setNewPassword);
exports.default = auth;
//# sourceMappingURL=index.js.map