var express = require('express');
var app = express();

var fs = require('fs');
var _ = require('lodash');
var users = [];

fs.readFile('users.json', { encoding: 'utf8' }, function(err, data) {
    if (err) throw err

    JSON.parse(data).forEach(function(user) {
        user.fullName = _.startCase(user.firstName + ' ' + user.lastName);
        users.push(user);
    });
});



app.get('/', function(req, res) {
    var buffer = '';
    users.forEach(function(user) {
        buffer += '<a href="/' + user.lastName + '">' +
            user.fullName + '</a><br>'
    })
    res.send(buffer);
});

app.get('/:lastname', function(req, res) {
    var lastname = req.params.lastname;
    res.send(lastname);
});

var server = app.listen(3000, function() {
    console.log('Server running at http://localhost:' + server.address().port)
});