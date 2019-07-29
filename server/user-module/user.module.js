module.exports = {
    getUser: function (request, response) {
        let id = currentUserId;
        console.log('----------');
        console.log(id);
        console.log('----------');
        connection.query("SELECT * FROM users WHERE _id = '" + id + "'",
            function (err, results, fields) {
                console.log(results)
                response.send({ "items": results });
            });
    },

    updateUser: function (request, response) {
        let firstName = request.body.firstName;
        let lastName = request.body.lastName;
        let email = request.body.email;
        let phone = request.body.phone;
        let id = currentUserId;
        connection.query("UPDATE users SET firstName = '" + firstName + "', lastName = '" + lastName + "', email = '" + email + "', phone = '" + phone + "' WHERE _id = '" + id + "'",
            function (err, results, fields) {
                console.log(results);
                console.log(err);
                console.log(id);
                response.send({ "success": true });
            });
    }
}