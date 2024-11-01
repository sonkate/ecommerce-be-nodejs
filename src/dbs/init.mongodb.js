const mongoose = require("mongoose");
const { countConnect } = require("../helpers/check.connect");
const config = require("../configs/config");
class Database {
    constructor() {
        this.connect();
    }
    connect(type = "mongodb") {
        if (1 === 1) {
            mongoose.set("debug", true);
            mongoose.set("debug", { color: true });
        }
        console.log("config", config);
        mongoose.connect(config.MONGO_URI).then(() => {
            console.log("Connected to MongoDB");
        }).catch((err) => {
            console.log("Error connecting to MongoDB");
        });
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const mongoDb = Database.getInstance();

module.exports = mongoDb;