import express from "express";
import {findUserByToken} from "../auth/helpers/findUserByToken";
import {addCandidatePack} from "./controllers/addCardsPack";
import {getCandidatesCards} from "./controllers/getCandidatesCards";
import {updateCandidatesCards} from "./controllers/updateCandidatesCards";


const candidates = express.Router();

candidates.post("/pack", findUserByToken(addCandidatePack, "addCandidatePack"));
candidates.get("/pack", findUserByToken(getCandidatesCards, "getCandidatePacks"));
candidates.put("/pack", findUserByToken(updateCandidatesCards, "getCandidatePacks"));

export default candidates;