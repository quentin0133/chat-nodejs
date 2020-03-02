let db = require('../configDb');

module.exports.selectCompte = function(callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT * FROM compte";
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.addCompte = function(data, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "INSERT INTO compte(IDENTIFIANT, MOT_DE_PASSE)" +
      " VALUES ?";
      connexion.query(sql, [data], callback);
      connexion.release();
    }
  });
};

module.exports.delCompte = function(data, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "DELETE FROM compte WHERE ID_COMPTE = ?";
      connexion.query(sql, data, callback);
      connexion.release();
    }
  });
};
