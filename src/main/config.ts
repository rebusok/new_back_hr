const USER_NAME = process.env.MONGO_DB_USER_NAME || "yuriyrebus";
const PASSWORD = process.env.MONGO_DB_USER_PASSWORD || "Mus5EY6AN5XWCP0v";
const MONGO_DB_URL = process.env.MONGO_DB_URL || "cluster0.ubqny.mongodb.net/crm-hr"; // bd for tests

export const MongoDBUris = `mongodb+srv://${USER_NAME}:${PASSWORD}@${MONGO_DB_URL}?retryWrites=true&w=majority`;

export const DEV_VERSION = false;

export const VERSION_2_0 = "/2.0";

export const GMAIL_USER = "hr.crmad@gmail.com";
export const GMAIL_PASS = "5oQB5vpN";

export const PORT = 7542;