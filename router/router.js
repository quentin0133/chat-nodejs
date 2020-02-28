let AccueilController = require('./../controllers/AccueilController');
let ChatController = require('./../controllers/ChatController');

// Routes
module.exports = function(app, io) {
  app.get('/chat', ChatController.Chat);
  app.post('/chat', ChatController.Chat);

  app.get('*', AccueilController.Accueil);
  app.post('*', AccueilController.Accueil);

  var chat = io
  .on('connection', function(client) {
    console.log("Connecté à socket.io !")
    ChatController.respond(chat, client);
  });
};
