module.exports = {
    phonesAdd: function (request, response) {
        if (!request.body) return response.sendStatus(400);
        //берем данные из формы html
        let text = request.body.title;
        let id = 0;
        let userId = currentUserId;

        connection.query("INSERT INTO phones VALUES ('" + text + "', '" + id + "', '" + userId + "')",
            function (err, results, fields) {
                if (err) {
                    response.send({ "success": false });
                } else {
                    response.send({
                        "success": true,
                        "newItem": {
                            "id": id,
                            "title": text,
                            "userId": userId
                        }
                    });
                }
            });
    },

    phonesGet: function (request, response) {
        let userId = currentUserId;
        connection.query("SELECT * FROM phones WHERE userId = '"+userId+"'",
            function (err, results, fields) {
                console.log(results);
                response.send({ "items": results });
            });
    },

    phonesUpdate: function (request, response) {
        let text = request.body.title;
        let id = request.body._id;
        connection.query("UPDATE phones SET title = '" + text + "' WHERE _id = '" + id + "'",
            function (err, results, fields) {
                response.send({ "success": true });
            });
    },

    phonesDelete: function (request, response) {
        let id = request.params.id;
        connection.query("DELETE FROM phones WHERE _id = '" + id + "'",
            function (err, results, fields) {
                response.send({ "success": true })
            });
    }
}
