interface IConfig {
    port: number,
    dbhost: string,
    dbusername: string,
    dbpassword: string,
    dbname: string,
    dbsource: string,
    timezone: string,
    currency: string,
    coinCount: number,
    apiKey: string,
    COIN_PRICE_CRON_CONFIG: string,
    socketPort: number,
    numberOfRecords: number,
}

class Config implements IConfig {
    readonly port = this.convertToNumber(process.env.PORT);
    readonly dbhost = process.env.dbhost;
    readonly dbusername = process.env.dbusername;
    readonly dbpassword = process.env.dbpassword;
    readonly dbname = process.env.dbname ;
    readonly dbsource = process.env.dbsource;
    readonly timezone = process.env.timezone;
    readonly currency = process.env.currency;
    readonly coinCount = this.convertToNumber(process.env.coinCount);
    readonly apiKey = process.env.apiKey;
    readonly COIN_PRICE_CRON_CONFIG = process.env.COIN_PRICE_CRON_CONFIG;
    readonly socketPort = this.convertToNumber(process.env.socketPort);
    readonly numberOfRecords = this.convertToNumber(process.env.numberOfRecords);

    public get config(): IConfig{
        return this;
    }

    private convertToNumber(val: string) {
        return Number(val).valueOf()
    }
}

export default new Config().config