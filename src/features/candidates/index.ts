import express from "express";
import {findUserByToken} from "../auth/helpers/findUserByToken";
import {addCandidatePack} from "./controllers/addCardsPack";


const candidates = express.Router();

candidates.post("/pack", findUserByToken(addCandidatePack, "addCandidatePack"));


export default candidates;