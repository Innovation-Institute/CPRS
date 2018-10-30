var express = require('express');
var app =express();
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//form-urlencoded
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(express.static(__dirname + '/src/public'));
// for parsing multipart/form-data
/*
* Routes
*/
const teamRouter = require(path.join(__dirname, 'src', 'server', 'routes', 'team'));
const indexRouter = require(path.join(__dirname, 'src', 'server', 'routes', 'index'));

/*
* Views 
*/

app.set('views', path.join(__dirname, 'src', 'server', 'View'));
app.set('view engine', 'ejs');
/*app.post('/api/data', (request, response) => {
    const postBody = request.body;
    console.log(postBody);
    response.render('done',{
        Name_Text: postBody
        });
  });*/
  
var server = app.listen(4000, function(){
    console.log('Listening on port 4000');

});

app.get('/team*', teamRouter);
app.post('/team/*', teamRouter);
app.use('/', indexRouter);

module.exports= app;