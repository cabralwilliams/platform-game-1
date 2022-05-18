
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const PORT = 4000;
//Import helpers here
const hbs = exphbs.create({  });
const routes = require('./controllers');

const app = express();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Allow usage of javascript and stylesheets folders
app.use(express.static(path.join(__dirname + "/public")));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});