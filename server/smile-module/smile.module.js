module.exports = {
    smile: function (request, response) {
        const collection = request.app.locals.collectionSmile;
        collection.find().toArray(function (err, results) {
            response.send({ "items": results });
        });
    }
}