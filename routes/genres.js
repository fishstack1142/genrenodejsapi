const express = require('express');
const app = express.Router();


const genres = [
    {id: 1, name: 'genre1'},
    {id: 2, name: 'genre2'},
    {id: 3, name: 'genre3'},
];

app.get('/', (req, res) => {
    res.send(genres);
});

app.get('/:id', (req, res) => {
    
    const genre = genres.find(genre => genre.id === parseInt(req.params.id));
    if(!genre) res.status(404).send('error, 404, not found, sorry for your convenience');

    res.send(genre);
});

app.post('/', (req, res) => {
 
    const { error } = validateGenre(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genres);

});

app.put('/:id', (req, res) => {

    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('error, 404, not found, sorry for your convenience');

    const { error } = validateGenre(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

app.delete('/:id', (req, res) => {

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

module.exports = app;