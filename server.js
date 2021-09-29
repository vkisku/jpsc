require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');
var path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/paper', require('./paper/paper.controller'));
app.use('/series', require('./series/series.controller'));
app.use('/key', require('./answerkey/key.controller'));
// app.use('/organizers', require('./organizers/organizers.controller'));

app.use(express.static(path.join(__dirname, 'public')))
app.get('/admin', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/admin/index.html'));
})
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})
// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));