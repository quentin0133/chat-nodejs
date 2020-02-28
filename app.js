let express          = require('express'),
    session          = require('express-session'),
    cookieParser     = require('cookie-parser'),
    bodyParser       = require('body-parser'), //pour récupérer les résultats des post
    http             = require('http'),
    path             = require('path'),
    favicon          = require('serve-favicon'),
    io               = require('socket.io');

app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('port', process.env.PORT || 8600);
app.set('views', path.join(__dirname, 'views'));

// favicon
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

// routes static, le routeur n'y aura pas accès
app.use(express.static(path.join(__dirname, '/public')));

app.use(cookieParser());

app.use(session({
    secret: 'nC0@#1pM/-0qA1+é',
    name: 'ChatTest',
    resave: true,
    saveUninitialized: true
}));

/* ces lignes permettent d'utiliser directement les variables de session dans handlebars
 UTILISATION : {{session.MaVariable}}  */
app.use(function(request, response, next){
    response.locals.session = request.session;
    next();
});

let exphbs = require('express-handlebars');
app.set('view engine', 'handlebars'); //nom de l'extension des fichiers
let handlebars  = require('./helpers/handlebars.js')(exphbs); //emplacement des helpers
// helpers : extensions d'handlebars

app.engine('handlebars', handlebars.engine);

http = http.createServer(app);

io = io();
io.listen(http);

// chargement du routeur
require('./router/router')(app, io);

http.listen(app.get('port'), function(){
    console.log('Serveur Node.js en attente sur le port ' + app.get('port'));
});
