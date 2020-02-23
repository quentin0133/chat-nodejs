let db = require('../configDb');

module.exports.users = function(callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT * FROM compte";
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};
