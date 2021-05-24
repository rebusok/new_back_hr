import express from "express";
import {createUser} from "./controllers/createUser";
import logIn from "./controllers/logIn";
import {getMe} from "./controllers/getMe";
import {findUserByToken} from "./helpers/findUserByToken";
import {logOut} from "./controllers/logOut";
import {passwordRecovery} from "./controllers/passwordRecovery";
import {setNewPassword} from "./controllers/setNewPassword";

const auth = express.Router();
auth.post("/registration", createUser);

auth.post("/login", logIn);
auth.post("/me", findUserByToken(getMe, "getMe"));
auth.delete("/me", findUserByToken(logOut, "logOut"));
auth.post("/forgot", passwordRecovery);
auth.post("/set-new-password", setNewPassword);
export default auth;