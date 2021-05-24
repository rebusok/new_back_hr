"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.GMAIL_PASS = exports.GMAIL_USER = exports.VERSION_2_0 = exports.DEV_VERSION = exports.MongoDBUris = void 0;
const USER_NAME = process.env.MONGO_DB_USER_NAME || "yuriyrebus";
const PASSWORD = process.env.MONGO_DB_USER_PASSWORD || "Mus5EY6AN5XWCP0v";
const MONGO_DB_URL = process.env.MONGO_DB_URL || "cluster0.ubqny.mongodb.net/crm-hr"; // bd for tests
exports.MongoDBUris = `mongodb+srv://${USER_NAME}:${PASSWORD}@${MONGO_DB_URL}?retryWrites=true&w=majority`;
exports.DEV_VERSION = false;
exports.VERSION_2_0 = "/2.0";
exports.GMAIL_USER = "hr.crmad@gmail.com";
exports.GMAIL_PASS = "5oQB5vpN";
exports.PORT = 7542;
//# sourceMappingURL=config.js.map