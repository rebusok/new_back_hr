import {Express,  Request, Response} from "express";
import auth from "../features/auth";
import candidates from "../features/candidates";

export const routes = (app: Express) => {
    app.use("/auth", auth);
    app.use("/candidates", candidates);
    // app.use(VERSION_1_0 + "/social", social);



    // default
    app.use((req: Request, res: Response) => {
        console.log("Nya-bad url: ", req.method, req.url);
        res.status(404).json({
            error: "bad url /ᐠ｡ꞈ｡ᐟ\\",
            method: req.method,
            url: req.url,
            query: req.query,
            body: req.body,
        });
    });
};
