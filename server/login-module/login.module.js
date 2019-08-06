let sequel = require('../db-module/db.module');
const session = require('express-session');

module.exports = {
    login: function (request, response) {

        // console.log('Cookies: ', request.cookies);
        // console.log('Signed Cookies: ', request.signedCookies);

        let counter = 0;
        if (!request.body) return response.sendStatus(400);
        //берем данные из формы html
        let userName = request.body.login;
        let userPass = request.body.pass;
        //создаем юзера, пытаемся логиниться
        let userLog = { name: userName, password: userPass };
        //взяли из базы чтоб все сравнить


        sequel.users.findOne({where: {name: userName}})
        .then(users=>{
            // console.log(users);
            if(!users) return;
            if(bcrypt.compareSync(userLog.password, users.password) == true){

                request.session.userId = users.id;
                request.session.name = users.name;
                request.session.save();
                
            response.send({
                "success": true,
                "user": {
                    "name": users.name,
                    "_id":  users.id
                }
            })
        }
          }).catch(err => {
              console.log(err)
              response.send({
                "success": false
            })
            });
        
    }
}
