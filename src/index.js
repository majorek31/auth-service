const express = require('express');
const config = require('../config.json');
const app = express();

app.use('/api', require('./api'))

app.listen(config.port, (err) => {
    if (err) throw err
    console.log('listening on port ' + config.port)
})