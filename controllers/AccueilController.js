//let model = require("../models/chat_model.js");

// ////////////////////////////////////////////// A C C U E I L
module.exports.Accueil = function(req, res){
  res.title = "Accueil";
  res.render('accueil', res);
};
