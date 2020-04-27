require('dotenv').config();

var express = require('express');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var sessionMiddleware = require('./middlewares/session.middleware');

var authMiddleware = require('./middlewares/auth.middleware');


app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.render('index', {
		name: 'AAA'
	});
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);

app.listen(port, function() {
	console.log('Server listening on port ' + port);
});