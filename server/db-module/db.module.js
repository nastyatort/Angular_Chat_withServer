const Sequelize = require("sequelize");
const sequelize = new Sequelize("message", "root", "root", {
    dialect: "mysql",
    host: "localhost"
});

module.exports = {
    messages:
        Message = sequelize.define("messages", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            text: {
                type: Sequelize.STRING,
            },
            userId: {
                type: Sequelize.STRING,
                allowNull: false
            },
            img: {
                type: Sequelize.STRING,
            }
        }),

    users:
        User = sequelize.define("users", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            }
        }),

    smiles:
        Smile = sequelize.define("smiles", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            smile: {
                type: Sequelize.STRING,
                allowNull: false
            }
        })
}

User.hasMany(Message, { foreignKey: 'userId' });

sequelize.sync().then(() => {
}).catch(err => console.log(err));