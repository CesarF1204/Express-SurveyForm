let express = require("express");
let path = require("path");
let bodyParser = require("body-parser");

let app = express();
//body parse
app.use(bodyParser.urlencoded({extended: true}));
//static
app.use(express.static(__dirname + "/static"));
//css
app.use(express.static(__dirname + "/css"));
// ejs
app.set('view engine', 'ejs');

//initializing ninja with empty value
let ninja = {};
//render index
app.get("/", function(request, response) {
    response.render("index");
});
//getting the content of the form to be submitted and will be redirected to result page
app.post("/submit-form", function(request, response) {
    ninja['name'] = request.body['name'];
    ninja['location'] = request.body['location'];
    ninja['language'] = request.body['language'];
    ninja['comment'] = request.body['comment'];
    response.redirect("/result");
});
//result page render
app.get("/result", function(request, response) {
    response.render("result", {ninja: ninja});
});
//go back to root page
app.post("/go-back", function(request, response) {
    response.redirect("/");
});

//port
app.listen(8000, function() {
    console.log("Listening to 8000");
});