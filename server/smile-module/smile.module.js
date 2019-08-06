let sequel = require('../db-module/db.module')

module.exports = {
    smile: function (request, response) {


        sequel.smiles.findAll({raw:true}).then(smiles=>{
           // console.log(smiles);
            response.send({ "items": smiles });
          }).catch(err=>console.log(err));
    }
}