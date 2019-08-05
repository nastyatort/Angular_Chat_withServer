module.exports = {
    smile: function (request, response) {
        connection.query("SELECT * FROM smiles",
        function (err, results, fields) {
            console.log(results)
            response.send({ "items": results });
        });
    }
}