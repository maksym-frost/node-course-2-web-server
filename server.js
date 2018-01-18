const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

// app.use((req, res, next)=>{
// res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomeMessage: 'Hello, my name is Maksym!',
        pageTitle: 'Home Page',
        test: 'testing'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        welcomeMessage: 'Hello, my name is Maksym!',
        pageTitle: 'About Page',
    });
});


app.get('/bad', (req, res) => {
    res.send('My Bad!!!');
});


app.listen(3000, () => {
    console.log("Server is up on port 3000");
});