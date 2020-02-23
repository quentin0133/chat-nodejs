//let model = require("../models/chat_model.js");

// ////////////////////////////////////////////// C O N N E X I O N
module.exports.Chat = function(req, res){
  res.title = "Un chat";
  res.render('chat', res);
};
