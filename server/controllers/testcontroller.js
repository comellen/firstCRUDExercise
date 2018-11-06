let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let TestModel = sequelize.import('../models/test');


router.get('/helloclient', function (req, res) {
    res.send('This is a message from the server to the client.')
})

//Controller Method #1: Simple Response
router.post('/one', function (req, res) {
    res.send("Test 1 sent through!")
});

//Controller Method #2: Persisting Data
router.post('/two', function (req, res) {
    let testData = "Test data for endpoint two";

    TestModel
        .create({
            testdata: testData
        }).then(dataFromDatabase => {
            res.send("Test two went through!")
        })
});

//Controller Method #3: req.body
router.post('/three', function (req, res) {
    let testData = req.body.testdata.item;

    TestModel
        .create({
            testdata: testData
        })
    res.send("Test three went through!")
    console.log("Test three went through!")
});

router.post('/four', function (req, res) {
    let testData = req.body.testdata.item;
    TestModel
        .create({
            testdata: testData
        })
        .then(
            function message() {
                res.send("Test 4 went through!");
            }
        );
});

//Route 5: Return Data in a Promise
router.post('/five', function (req, res) {
    let testData = req.body.testdata.item;
    TestModel
        .create({
        testdata: testData
        })
        .then(function message(data) {
                res.send(data)
            });
});

//Route 6: Return Response as JSON
router.post('/six', function (req, res) {
    let testData = req.body.testdata.item;
    TestModel
    .create({
        testdata: testData
    })
    .then(function message(testdata) {
        res.json({
            testdata: testdata
        });
    });
});

//Route 7: Handle Errors
router.post('/seven', function (req, res) {
    let testData = req.body.testdata.item;

    TestModel
    .create({
        testdata: testData
    })
    .then(
        function createSuccess(testdata) {
            res.json({
                testdata: testdata
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

router.get('/one', function (req, res) {

    TestModel
    .findAll({
        attributes: ['id', 'testdata']
    })
    .then(
        function findAllSuccess(data) {
            console.log("Controller data:", data);
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
        }
    );
});

module.exports = router;