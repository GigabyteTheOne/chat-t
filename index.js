/*jslint nomen: true, vars: true*/
/*global require: false, __dirname: false*/

(function () {
    'use strict';

    var PORT = 8080,
        http = require('http'),
        express = require('express'),
        server = express();

    server.use(express['static'](__dirname + '/public'));

    server.get(/(.*)/, function (req, res) {
        var url = req.params[0];
        http.get('http://chat.radio-t.com' + url, function (result) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            result.on('data', function (response) {
                res.write(response.toString('utf-8'));
                res.end();
            });
        });
    });

    server.listen(PORT);
}());
