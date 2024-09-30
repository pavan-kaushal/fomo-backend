interface IConfig {
    port: number,
    dbhost: string,
    dbusername: string,
    dbpassword: string,
    dbname: string,
    dbsource: string,
    timezone: string,
}

class Config implements IConfig {
    readonly port = this.convertToNumber(process.env.PORT);
    readonly dbhost = process.env.dbhost;
    readonly dbusername = process.env.dbusername;
    readonly dbpassword = process.env.dbpassword;
    readonly dbname = process.env.dbname ;
    readonly dbsource = process.env.dbsource;
    readonly timezone = process.env.timezone;

    public get config(): IConfig{
        return this;
    }

    private convertToNumber(val: string) {
        return Number(val).valueOf()
    }
}

export default new Config().config