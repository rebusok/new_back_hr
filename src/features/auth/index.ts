import express from "express";
import {createUser} from "./controllers/createUser";
import logIn from "./controllers/logIn";
import {getMe} from "./controllers/getMe";
import {findUserByToken} from "./helpers/findUserByToken";
import {logOut} from "./controllers/logOut";

const auth = express.Router();
auth.post("/registration", createUser);

auth.post("/login", logIn);
auth.post("/me", findUserByToken(getMe, "getMe"));
auth.delete("/me", findUserByToken(logOut, "logOut"));

export default auth;