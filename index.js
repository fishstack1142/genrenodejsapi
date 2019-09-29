const config = require('config');
var morgan = require('morgan');
// const helmet = require('helmet');
const Joi = require('joi');
const genres = require('./routes/genres')

const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const home = require('./routes/home');

app.use(express.json());
//middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(helmet());

app.use('/api/v1/genres', genres);

app.use('/home', home);

console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
// console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled....');
}

app.use(logger);
//custom middleware

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});