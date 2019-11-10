
const {User, Favorite, connection} = require('./models/models');
const parser = require("body-parser");
const express = require('express');
const app = express();
const port = 3000;

app.use(parser.urlencoded({extended: false}));
app.use(parser.json());

connection
    .authenticate()
        .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


app.post('/favorite/:id', function (req, res) {

    const id = req.params.id;

    User.findOne({
        where: {
            id: id
        }
    })
    .then(user => {

        Favorite.create(req.body)
        
        .then((favorite) => {

            user.addFavorite(favorite).then(() => {
                res.status(200).json(favorite);
            });
        });
    });
    
});

app.post('/profile', function(req, res) {

    User.create(req.body)
    .then(user => {
        res.status(200).json(user);
    });

});

app.get('/profile/:id', function(req, res) {
    const id = req.params.id;

    User.findAll({
        where: {
            id: id
        }
    })
    .then(user => {
        res.status(200).json(user);
    });

    
});

app.delete('/profile/:id', function(req, res) {
    const id = req.params.id;

    User.destroy({
        where: {
            id: id
        }
    }).then((user) => {
        res.status(200).json(user);
    });

});


app.put('/profile/:id', function(req, res) {
    const id = req.params.id;

    User.update( req.body, {
        where: {
            id: id
        }
    }).then((user) => {
        res.status(200).json(user);
    });

});



app.listen(port, function () {
    console.log(`Listening on port ${port}!`);
});



