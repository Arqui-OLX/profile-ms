
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
        connection.sync();
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

            user.addFavorite(favorite)
            .then(() => {
                res.status(200).json(favorite);
            })

            .catch(err => {
                res.status(500).send(false);
            });   

        })
        .catch(err => {
            res.status(500).send(false);
        });        

    });
    
});


app.get('/favorite/:id', function (req, res) {

    const id = req.params.id;

    User.findOne({
        where: {
            id: id
        }
    })
    .then(user => {

        user.getFavorites()
        .then(favorites => {
            res.status(200).json(favorites);
        })

        .catch(err => {
            res.status(500).send(false);
        });  

    })
    .catch(err => {
        res.status(500).send(false);
    }); 
    
});

app.delete('/favorite', function(req, res) {


    User.findOne({
        where: {
            id: parseInt(req.query.id_profile)
        }
    })
    .then(user => {
        user.getFavorites({
            where: { fk_post: req.query.fk_post }
        })
        .then(favorites => {
            favorites[0].destroy()
            .then((favorite) => {
                res.status(200).json(true);
            })
            .catch(err => {
                res.status(500).send(false);
            });
           
        })

        .catch(err => {
            res.status(500).send(false);
        });

    })
    .catch(err => {
        res.status(500).send(false);
    });  


    

});

app.post('/profile', function(req, res) {

    User.create(req.body)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).send(false);
    });  

});

app.get('/profile/:id', function(req, res) {
    const id = req.params.id;

    User.findOne({
        where: {
            id: id
        }
    })
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).send(false);
    });  

    
});

app.get('/isFavorite', function(req, res) {

    User.findOne({
        where: {
            id: parseInt(req.query.id_profile)
        }
    })
    .then(user => {

        user.getFavorites({
            where: { fk_post: req.query.fk_post }
        })
        .then(favorites => {
            if (favorites.length > 0) {
                res.status(200).send(true);
            } else {
                res.status(500).send(false);            
            }
           
        })

        .catch(err => {
            res.status(500).send(false);
        });

    })
    .catch(err => {
        res.status(500).send(false);
    });  

    
});


app.get('/profile', function(req, res) {
    const email = req.query.email;

    console.log(email);

    User.findOne({
        where: {
            email: email
        }
    })
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).send(false);
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
    })
    .catch(err => {
        res.status(500).send(false);
    });  

});



app.listen(port, function () {
    console.log(`Listening on port ${port}!`);
});



