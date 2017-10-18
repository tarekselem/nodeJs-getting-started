var express = require('express');
var app = express();

var fs = require('fs');
var _ = require('lodash');
var engines = require('consolidate');

var users = [];

fs.readFile('users.json', { encoding: 'utf8' }, function(err, data) {
    if (err) throw err

    JSON.parse(data).forEach(function(user) {
        user.fullName = _.startCase(user.firstName + ' ' + user.lastName);
        users.push(user);
    });
});

app.engine('hbs', engines.handlebars)
app.set('views', './views')
app.set('view engine', 'hbs')

app.get('/', function(req, res) {
    res.render('index', { users: users })
});

app.get('/:lastname', function(req, res) {
    var lastname = req.params.lastname;
    res.send(lastname);
});

var server = app.listen(3000, function() {
    console.log('Server running at http://localhost:' + server.address().port)
});