const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const graphqlHttp = require('express-graphql')

const graphqlSchema = require('./graphql/schema')
const graphqlResolver = require('./graphql/resolvers')
const auth = require('./middleware/auth')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, DELETE, PUT, PATCH'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization')
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }
    next();
});

app.use(auth);

app.use(
    '/graphql',
    graphqlHttp({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true,
        formatError(err) {
            if (!err.originalError) {
                return err
            }
            const data = err.originalError.data;
            const message = err.message || 'Um erro ocorreu.';
            const code = err.originalError.code || 500;
            return {
                message: message,
                status: code,
                data: data
            };
        }
    })
);