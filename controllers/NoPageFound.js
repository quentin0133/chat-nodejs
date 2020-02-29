//let model = require("../models/chat_model.js");

// ////////////////////////////////////////////// N O T  F O U N D
module.exports.NoPageFound = function(req, res){
  res.title = "Erreur 404";
  res.render('noPageFound', res);
};
