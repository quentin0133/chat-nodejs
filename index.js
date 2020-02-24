let express = require('express'),
    session         = require('express-session'),
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'), //pour récupérer les résultats des post
    http            = require('http'),
    path            = require('path'),
    io              = require('socket.io');

appAdmin = express();

appAdmin.use(bodyParser.urlencoded({extended: true}));
appAdmin.set('port', 8600);
appAdmin.set('views', path.join(__dirname, 'views'));

// routes static, le routeur n'y aura pas accès
appAdmin.use(express.static(path.join(__dirname, '/public')));

appAdmin.use(cookieParser());

appAdmin.use(session({
    secret: 'nC0@#1pM/-0qA1+é',
    name: 'ChatTest',
    resave: true,
    saveUninitialized: true
}));

/* ces lignes permettent d'utiliser directement les variables de session dans handlebars
 UTILISATION : {{session.MaVariable}}  */
appAdmin.use(function(request, response, next){
    response.locals.session = request.session;
    next();
});

let exphbs = require('express-handlebars');
appAdmin.set('view engine', 'handlebars'); //nom de l'extension des fichiers
let handlebars  = require('./helpers/handlebars.js')(exphbs); //emplacement des helpers
// helpers : extensions d'handlebars

appAdmin.engine('handlebars', handlebars.engine);

// chargement du routeur
require('./router/router')(appAdmin);

http = http.createServer(appAdmin);

let socket = io.listen(http);
let listUser = [];

socket.on('connection', function(client) {
  client.on('username', function(username) {
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
    console.log(listUser);
    socket.emit("list-user", listUser);
    socket.emit("message-connexion", "'" + client.username + "' vient de se connecter !");
  });

  client.on('message-chat', function(message) {
    socket.emit("message-chat", '<span class="badge badge-primary">' + client.username + '</span> : ' + message.text);
  });

  client.on('disconnect', function() {
    console.log(getIndexOf(listUser, client.id));
    listUser.splice(getIndexOf(listUser, client.id), 1);
    console.log(listUser);
    socket.emit("list-user", listUser);
    socket.emit("message-deconnexion", "'" + client.username + "' vient de se déconnecter !");
  });
});

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

http.listen(appAdmin.get('port'), function(){
    console.log('Serveur Node.js en attente sur le port ' + appAdmin.get('port'));
});
