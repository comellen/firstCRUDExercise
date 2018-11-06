require('dotenv').config();

let express = require('express');
let app = express();
let test = require('./controllers/testcontroller');
let authTest = require('./controllers/authtestcontroller');


let user = require('./controllers/usercontroller');
let sequelize = require('./db');
let bodyParser = require('body-parser');

sequelize.sync(); //{force: true} for resetting tables

app.use(bodyParser.json());
app.use(require('./middleware/headers'));

//EXPOSED ROUTES
app.use('/test', test);
app.use('/api/user', user);

//PROTECTED ROUTES
app.use(require('./middleware/validate-session'));
app.use('/authtest', authTest);


app.listen(3000, function () {
    console.log('App is listening on 3000.')
});

app.use('/api/test', function (req, res) {
    res.send('This is data from the /api/test endpoint. It\'s from the server.');
});

app.use('/test/about', function (req, res) {
    res.send('This is an about route');
});

app.use('/test/contact', function (req, res) {
    res.send(
        {
            'name': 'Connor Mellencamp',
            'email': 'connor.mellencamp@gmail.com'
        }
    );
});

app.use('/test/projects', function (req, res) {
    res.send(
        [
            'Project 1',
            'Project 2',
            'Project 3'
        ]
    );
});

app.use('/test/mycontacts', function (req, res) {
    res.send(
        [
            {
                'name': 'Cory',
                'email': 'cory@friend.com'
            },
            {
                'name': 'Kagan',
                'email': 'kagan@brother.com'
            },
            {
                'name': 'Michelle',
                'email': 'michelle@mom.com'
            }
        ]
    );
});