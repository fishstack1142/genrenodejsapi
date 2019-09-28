const config = require('config');
var morgan = require('morgan');
// const helmet = require('helmet');
const Joi = require('joi');

const express = require('express');
const app = express();
const logger = require('./logger');

app.use(express.json());
//middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(helmet());

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

const genres = [
    {id: 1, name: 'genre1'},
    {id: 2, name: 'genre2'},
    {id: 3, name: 'genre3'},
];

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.get('/api/v1/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/v1/genres/:id', (req, res) => {
    
    const genre = genres.find(genre => genre.id === parseInt(req.params.id));
    if(!genre) res.status(404).send('error, 404, not found, sorry for your convenience');

    res.send(genre);
});

app.post('/api/v1/genres', (req, res) => {
 
    const { error } = validateGenre(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genres);

});

app.put('/api/v1/genres/:id', (req, res) => {

    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('error, 404, not found, sorry for your convenience');

    const { error } = validateGenre(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

app.delete('/api/v1/genres/:id', (req, res) => {

    const genre = genres.find(g => g.id === parseInt(req.params.id));

    if(!genre) return res.status(404).send('error, 404, not found, sorry for your convenience');

    const index = genres.indexOf(genre)
    genres.splice(index,1 );
    res.send(genres);
    
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}



const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});