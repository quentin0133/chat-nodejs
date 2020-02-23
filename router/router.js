let ChatController = require('./../controllers/ChatController');

// Routes
module.exports = function(appAdmin) {
  appAdmin.get('*', ChatController.Chat);
  appAdmin.post('*', ChatController.Chat);
};
