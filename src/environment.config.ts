interface IConfig {
    port: any,
    dbhost: any,
    dbusername: any,
    dbpassword: any,
    dbname: any,
    dbsource: any,
    timezone: any,
    currency: any,
    coinCount: any,
    apiKey: any,
    COIN_PRICE_CRON_CONFIG: any,
    socketPort: any,
}

class Config implements IConfig {
    readonly port = process.env.PORT;
    readonly dbhost = process.env.dbhost;
    readonly dbusername = process.env.dbusername;
    readonly dbpassword = process.env.dbpassword;
    readonly dbname = process.env.dbname ;
    readonly dbsource = process.env.dbsource;
    readonly timezone = process.env.timezone;
    readonly currency = process.env.currency;
    readonly coinCount = process.env.coinCount;
    readonly apiKey = process.env.apiKey;
    readonly COIN_PRICE_CRON_CONFIG = process.env.COIN_PRICE_CRON_CONFIG;
    readonly socketPort = process.env.socketPort;

    public get config(): IConfig{
        return this;
    }
}

export default new Config().config