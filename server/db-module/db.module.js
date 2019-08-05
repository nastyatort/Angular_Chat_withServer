const Sequelize = require("sequelize");
const sequelize = new Sequelize("message", "root", "root", {
  dialect: "mysql",
  host: "localhost"
});

sequelize.sync().then(result=>{

})
.catch(err=> console.log(err));

module.exports = {

   messages: sequelize.define("messages", {
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

  users: sequelize.define("users", {
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

  
   }



   sequelize.sync().then(result=>{
    //console.log(result);
  })
  .catch(err=> console.log(err));