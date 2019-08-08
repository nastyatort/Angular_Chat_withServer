let sequel = require('../db-module/db.module');
let bcrypt = require('bcrypt');

module.exports = {
    login: function (request, response) {
        if (!request.body) return response.sendStatus(400);

        sequel.users.findOne({where: {name: request.body.login}})
        .then(users=>{
            // console.log(users);
            //if(!users) return;
            if(bcrypt.compareSync(request.body.pass, users.password) == true){

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
        }else{
            response.send({
                "success": false
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
