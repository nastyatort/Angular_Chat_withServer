let sequel = require('../db-module/db.module')

module.exports = {
    getUsers: function (request, response) {
        sequel.users.findAll({
        }).then(res => {
            response.send(res);
        })
    },

    updateUsers: function (request, response) {

        console.log('body name')
        console.log(request.session.userId)

        sequel.users.update({
            name: request.body.name,
            img: request.body.img
        },
            {
                where: {
                    id: request.session.userId
                }
            }
        ).then(res => {
            console.log(res)
            response.send(res);
        })
    }
}