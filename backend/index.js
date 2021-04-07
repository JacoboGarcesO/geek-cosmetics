const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require("cors");
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Geek Cosmetics API",
            version: "1.0.0",
            description: "Documentation by Geek Cosmetics API"
        },
        servers: [
            {
                url: "http://localhost:7007"
            }
        ],
    },
    apis: ["./src/routers/router.js"]
}

const specs = swaggerJsDoc(options)

app.use(express.json());
app.use(morgan('dev'));
require('dotenv').config();
app.use(cors());

app.use("/", require("./src/routers/router"));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

app.set('port', process.env.PORT || 7005);

app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});

module.exports = app;