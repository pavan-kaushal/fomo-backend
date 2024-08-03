"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor() {
        this.port = process.env.PORT;
        this.dbhost = process.env.dbhost;
        this.dbusername = process.env.dbusername;
        this.dbpassword = process.env.dbpassword;
        this.dbname = process.env.dbname;
        this.dbsource = process.env.dbsource;
        this.timezone = process.env.timezone;
        this.currency = process.env.currency;
        this.coinCount = process.env.coinCount;
        this.apiKey = process.env.apiKey;
    }
    get config() {
        return this;
    }
}
exports.default = new Config().config;
//# sourceMappingURL=environment.config.js.map