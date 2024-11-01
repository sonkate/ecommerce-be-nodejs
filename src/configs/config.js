require('dotenv').config();
class ConfigDEV {
    constructor() {
        this.env = process.env.NODE_ENV || "dev";
        this.port = process.env.PORT_DEV || 3000;
        this.MONGO_URI = process.env.MONGO_URI_DEV;
    }
}
class ConfigPROD {
    constructor() {
        this.env = process.env.NODE_ENV || "prod";
        this.port = process.env.PORT_PROD || 5000;
        this.MONGO_URI = process.env.MONGO_URI_PROD;
    }
}
const dev = new ConfigDEV();
const prod = new ConfigPROD();
const config = { dev, prod };
module.exports = config[process.env.NODE_ENV] || config.dev;
