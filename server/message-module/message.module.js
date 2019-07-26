module.exports = {
    getMessages: function (request, response) {
        const collection = request.app.locals.collectionMessage;

        connection.query("SELECT * FROM messages",
        function (err, results, fields) {
            response.send({ "items": results });
        });
    },

    createMessages: function (request, response) {

        let userText= request.body.text;
        let date = new Date();
        let id = 0;
        let message = {
            text: userText,
            userId: currentUserId,
            userName: currentUserName,
            _creationDate: date
        };
        connection.query("INSERT INTO messages VALUES ('" + message.text + "', '" + message.userId + "', '" + message.userName + "', '" + message._creationDate + "', '" + id + "')",
        function (err, results, fields) {
            if(err){
                console.log(err)
                writeMessage = false
            }else{
                writeMessage = true
            }
        });

    // закрытие подключения
    //connection.end();
    }
}

