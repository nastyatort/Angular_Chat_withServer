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

        connection.query("INSERT INTO users VALUES ('" + id + "', '" + userName + "', '" + userPass + "')",
            function (err, results, fields) {
                if (err) {
                    console.log(err)
                    response.send({ "success": false });
                } else {
                    response.send({ "success": true });
                }
            });

        // закрытие подключения
        connection.end();
    }
}
