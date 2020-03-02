let model = require("../models/AjoutCompteModel.js");

module.exports.AjoutCompte = function(req, res){
  res.title = "Test d'ajout et de liste dynamique";
  res.render('ajoutCompte', res);
}

module.exports.respond = function(socket, client){

  model.selectCompte(function(err, res){
    if (err) {
      console.log(res);
      return;
    }
    client.emit("liste-compte", res);
  });

  client.on("ajoutCompte", function(compte){

    model.addCompte(compte, function(err, res){
      if (err) {
        console.log(res);
        return;
      }
    });

    model.selectCompte(function(err, res){
      if (err) {
        console.log(res);
        return;
      }
      client.emit("liste-compte", res);
    });

  });

  client.on("effacerCompte", function(idCompte){

    console.log("Je supprime.");

    model.delCompte(idCompte, function(err, res){
      if (err) {
        console.log(res);
        return;
      }
    });

    model.selectCompte(function(err, res){
      if (err) {
        console.log(res);
        return;
      }
      client.emit("liste-compte", res);
    });

  });

}
