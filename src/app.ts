import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { createConnection } from 'typeorm';

import api from './api';
import graphql from './graphql';
import { Article } from './entity';

const start = async () => {
    try {
        await createConnection({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            database: 'test',
            username: 'test',
            password: 'test',
            entities: [ Article ],
        });
        // tslint:disable-next-line:no-console
        console.log('connected');

        const app = express();
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(cors());
        app.use(morgan('dev'));
        app.use(express.static(path.join(__dirname, '../public')));
        app.use('/graphql', graphql);
        app.use('/api', api);

        const port = 9000;
        app.listen(port);
        // tslint:disable-next-line:no-console
        console.log('start server');

    } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
    }
};
start();
