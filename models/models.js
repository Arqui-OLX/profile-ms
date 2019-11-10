const Sequelize = require('sequelize');
const connection = new Sequelize('mysql://root:my-secret@localhost:3306/profile_db');


class User extends Sequelize.Model {}
User.init({
    // attributes
    nickname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    phone: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
    }, {
    sequelize: connection,
    modelName: 'user',
    timestamps: true
    // options
});


class Favorite extends Sequelize.Model {}
Favorite.init({
    // attributes
    fk_post: {
        type: Sequelize.STRING,
        allowNull: false
    }
    }, {
    sequelize: connection,
    modelName: 'favorite',
    timestamps: true
    // options
});

User.hasMany(Favorite); // Will add userId to Favorite model
Favorite.belongsTo(User, {foreignKey: 'fk_user'}); // Will also add userId to Favorite model



module.exports = {User, Favorite, connection};
