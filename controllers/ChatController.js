var listUser = [];

// ////////////////////////////////////////////// C H A T
module.exports.Chat = function(req, res){
  res.title = "Chat";
  res.render('chat', res);
}

module.exports.respond = function(socket, client){
  // Connexion au chat (après avoir rempli le formulaire)
  client.on('username', function(username) {
    client.connect = true;
    client.id = searchPlaceForUserId(listUser);
    client.username = username;
    let user = {
      id: client.id,
      username: client.username
    }
    if(client.id == listUser.length) {
      listUser.push(user);
    }
    else {
      listUser.splice(client.id, 0, user);
    }
    socket.emit("maj-list-user", listUser);
    socket.emit("message-connexion", "'" + client.username + "' vient de se connecter !");
  });

  client.on('message-chat', function(message) {
    socket.emit("message-chat", '<span class="badge badge-primary">' + client.username + '</span> : ' + message.text);
  });

  client.on('disconnect', function() {
    if(client.connect) {
      listUser.splice(getIndexOf(listUser, client.id), 1);
      socket.emit("maj-list-user", listUser);
      socket.emit("message-deconnexion", "'" + client.username + "' vient de se déconnecter !");
    }
  });
}

function searchPlaceForUserId(listUser) {
  if(listUser[0] == undefined || listUser[0].id != 0) {
    return 0;
  }
  if(listUser.length > 1) {
    for(let i = 0; i < listUser.length - 1; i++) {
      // Si l'id précédente + 1 est différent à l'id suivante
      if(listUser[i].id + 1 != listUser[i+1].id) {
        return listUser[i].id + 1;
      }
    }
  }
  return listUser.length;
}

function getIndexOf(listUser, idUser) {
  for(let i = 0; i < listUser.length; i++) {
    if(idUser == listUser[i].id) {
      return i;
    }
  }
  listUser.forEach((userFromList, i) => {

  });
  return null;
}
