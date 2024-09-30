require('dotenv').config('../.env');
import { Server } from '@overnightjs/core';
import config from "./environment.config";
import mongoose from 'mongoose';
import * as express from 'express';
import { CourseController } from './controllers/course.controller';
import { CategoryController } from './controllers/category.controller';
import { SubCategoryController } from './controllers/sub-category.controller';

class App extends Server {
    port = config.port

    constructor(){
        super();
        this.corsPolicy();
        this.middleware();
        this.connectDb();
    }

    private corsPolicy() {
        console.log(config)
        express.Router()
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE,OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, user, authorization");
            next();
        });
    }

    private middleware() {
        this.app.enable('trust proxy');
        this.app.use(express.json({ limit: '1024mb' }));
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use((req, res, next) => {
            res.on('finish', () => {
                console.log(`${req.method} ${req.path} ${res.statusCode}`);
            });
            next();
          });
    }

    async connectDb() {
        let dbUrl = 'mongodb://' + config.dbhost + '/' + config.dbname;
        if (config.dbusername && config.dbpassword && config.dbsource) {
            dbUrl = 'mongodb://' + config.dbusername + ':' +
                config.dbpassword + '@' + config.dbhost +
                '/' + config.dbname + '?authSource=' + config.dbsource
        }

        try {
            mongoose.connection.on('connected', () => { console.log('Db connected'); });
            mongoose.connection.on('close', () => { console.log('lost Db connection'); });
            mongoose.connection.on('reconnected', () => { console.log('Db reconnected'); });
            mongoose.connection.on('error', () => { console.log('Db connection error'); });
            mongoose.set('strictQuery', true);
            await mongoose.connect(dbUrl,{}).then(() => {
                this.loadControllers();
            });
        } catch (err) {
            console.log('Error while db connection ' + JSON.stringify(err));
        }
    }
    
    loadControllers() {
        super.addControllers([
            new CourseController(),
            new CategoryController(),
            new SubCategoryController(),
        ])
    }

    public start() {
        this.app.listen(this.port, () => {
            console.log("Server ready at port: " + this.port);
        })
    }
}

export default App;
