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
  client.on('username', function(user) {
    client.username = user.username;
    client.id = user.id;
    listUser.push(client.username);
    socket.emit("list-user", listUser);
    socket.emit("message-connexion", "'" + client.username + "' vient de se connecter !");
  });

  client.on('message-chat', function(message) {
    socket.emit("message-chat", '<span class="badge badge-primary">' + client.username + '</span> : ' + message.text);
  });

  client.on('disconnect', function() {
    socket.emit("list-user", listUser);
    socket.emit("message-deconnexion", "'" + client.username + "' vient de se déconnecter !");
  });
});

http.listen(appAdmin.get('port'), function(){
    console.log('Serveur Node.js en attente sur le port ' + appAdmin.get('port'));
});
