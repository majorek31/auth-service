const express = require('express');
const config = require('./config.json');
const app = express();

app.listen(config.port)