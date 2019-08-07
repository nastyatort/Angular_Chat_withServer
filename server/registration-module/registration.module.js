let sequel = require('../db-module/db.module')
let bcrypt = require('bcrypt');
let salt = bcrypt.genSaltSync(10);

module.exports = {
    registration: function (request, response) {
        if (!request.body) return response.sendStatus(400);

        let hash = bcrypt.hashSync(request.body.pass, salt);

        sequel.users.create({
            name:  request.body.login,
            password: hash,

        }).then(() => {
            response.send({ "success": true });
        }).catch(() =>
            response.send({ "success": false })
        );
    }
}