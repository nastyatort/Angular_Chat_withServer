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
    }
}

