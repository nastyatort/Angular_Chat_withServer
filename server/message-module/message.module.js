let sequel = require('../db-module/db.module')

module.exports = {
    getMessages: function (request, response) {
        sequel.users.findAll({
            include: [{
                model: sequel.messages
            }]
        }).then(res => {
            response.send(res);

        })
    },

    createMessages: function (request, response) {

        let userText = request.body.text;
        let img = request.body.img;
        let message = {
            text: userText,
            userId: request.session.userId,
            userName: request.session.userName,
            img: img
        };

        sequel.messages.create({
            text: message.text,
            userId: message.userId,
            img: message.img

        }).then(() => {
            response.send();
        }).catch(err =>
            console.log(err)
        );
    }
}

