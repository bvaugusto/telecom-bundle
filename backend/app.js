var app = require('./config/app_config.js');

var packageController = require('./controller/packageController.js');

app.get('/', function(req, res){
    res.end('on');
});

app.get('/api/list-all-broadband', function(req, res){
    packageController.list(function(resp){
        res.json(resp);
    })
});