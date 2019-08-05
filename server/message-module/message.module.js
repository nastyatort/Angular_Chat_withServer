let sequel = require('../db-module/db.module')

module.exports = {
    getMessages: function (request, response) {
        connection.query("SELECT * FROM message.messages JOIN message.users WHERE message.messages.userId = message.users._id",
        function (err, results, fields) {
            response.send({ "items": results });
        });
    },

    createMessages: function (request, response) {

        let userText = request.body.text;
        let img = request.body.img;
        let userId = request.body.img;
        let id = 0;
        let message = {
            text: userText,
            userId: currentUserId,
            userName: currentUserName,
            img: img
        };

        sequel.messages.create({
            text: message.text,
            userId: message.userId,
            img: message.img

          }).then(res=>{
            console.log(res);
          }).catch(err=>console.log(err));

        response.send();
    }
}

