const Sequelize = require('sequelize');
const connection = new Sequelize('mysql://root:secret@profile-db/profile');


class User extends Sequelize.Model {}
User.init({
    // attributes
    nickname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
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

    userId: {
        unique: 'compositeIndex',
        type: Sequelize.INTEGER,

       references: {
         // This is a reference to another model
         model: User,

         // This is the column name of the referenced model
         key: 'id'
       }
    },

    fk_post: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'compositeIndex'
    }

    }, {
    sequelize: connection,
    modelName: 'favorite',
    timestamps: true
    // options
});

User.hasMany(Favorite); // Will add userId to Favorite model
Favorite.belongsTo(User); // Will also add userId to Favorite model




module.exports = {User, Favorite, connection};
