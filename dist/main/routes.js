"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const auth_1 = __importDefault(require("../features/auth"));
const candidates_1 = __importDefault(require("../features/candidates"));
exports.routes = (app) => {
    app.use("/auth", auth_1.default);
    app.use("/candidates", candidates_1.default);
    // app.use(VERSION_1_0 + "/social", social);
    // default
    app.use((req, res) => {
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
//# sourceMappingURL=routes.js.map