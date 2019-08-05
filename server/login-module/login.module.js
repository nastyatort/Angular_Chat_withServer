let sequel = require('../db-module/db.module')

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



        sequel.users.findOne({where: {name: userName, password: userPass}})
        .then(users=>{
            if(!users) return;
            
            response.send({
                "success": true,
                "user": {
                    "name": users.name,
                    "_id":  users._id
                }
            })

          }).catch(err => {
              console.log(err)
              response.send({
                "success": false
            })
            });



        // connection.query("SELECT * FROM users WHERE name = '" + userName + "' AND password = '" + userPass + "' ",
        //     function (err, results, fields) {
        //         if (results[0] != undefined) {
        //             currentUserId = results[0]._id;
        //             currentUserName = results[0].name;
        //             response.send({
        //                 "success": true,
        //                 "user": {
        //                     "name": results[0].name,
        //                     "_id":  results[0]._id
        //                 }
        //             })
        //     }else{
        //         response.send({
        //             "success": false
        //         })
        //     }
        //     });
    }
}
