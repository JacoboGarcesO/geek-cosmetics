const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require("cors");

app.use(express.json());
app.use(morgan('dev'));
require('dotenv').config();
app.use(cors());

app.use("/", require("./src/router/router"))

app.set('port', process.env.PORT || 7005);

app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});

module.exports = app;