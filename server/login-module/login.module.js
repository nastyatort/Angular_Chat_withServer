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

        connection.query("SELECT * FROM users WHERE name = '" + userLog.name + "'",
            function (err, results, fields) {
                if (results[0] != undefined && bcrypt.compareSync(userLog.password, results[0].password) == true) {
                        currentUserId = results[0]._id;
                        currentUserName = results[0].name;
                        response.send({
                            "success": true,
                            "user": {
                                "name": results[0].name,
                                "_id": results[0]._id,
                                "firstName": results[0].firstName,
                                "lastName": results[0].lastName,
                                "email": results[0].email,
                                "phone": results[0].phone
                            }
                        }) 
                } else {
                    response.send({
                        "success": false
                    })
                }
            });
    }
}
