let AccueilController = require('./../controllers/AccueilController');
let ChatController = require('./../controllers/ChatController');
let Chat2Controller = require('./../controllers/Chat2Controller');
let NoPageFound = require('./../controllers/NoPageFound');

// Routes
module.exports = function(app, io) {
  app.get('/', AccueilController.Accueil);
  app.post('/', AccueilController.Accueil);

  app.get('/chat', ChatController.Chat);
  app.post('/chat', ChatController.Chat);

  app.get('/chat2', Chat2Controller.Chat);
  app.post('/chat2', Chat2Controller.Chat);

  app.get('*', NoPageFound.NoPageFound);
  app.post('*', NoPageFound.NoPageFound);

  var chat = io
  .of('/chat')
  .on('connection', function(client) {
    ChatController.respond(chat, client);
  });

  var chatLogin = io
  .of('/chat2')
  .on('connection', function(client) {
    Chat2Controller.respond(chatLogin, client);
  });
};
