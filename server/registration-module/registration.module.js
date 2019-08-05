let sequel = require('../db-module/db.module')

module.exports = {
    registration: function (request, response) {
        if (!request.body) return response.sendStatus(400);
        //берем данные из формы html
        let userName = request.body.login;
        let userPass = request.body.pass;
        let id = 0;

        let hash = bcrypt.hashSync(userPass, salt);
        //создаем юзера
        let user = { name: userName, password: hash };


        sequel.users.create({
            name: userName,
            password: userPass,

        }).then(res => {
            response.send({ "success": true });
        }).catch(err =>
            response.send({ "success": false })
        );
        connection.end();
    }
}