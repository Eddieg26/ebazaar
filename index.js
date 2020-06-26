const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/index.route');
const cors = require('cors');
const path = require("path");

require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGODB_URI || process.env.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(client => {

        app.use(express.static(path.join(__dirname, "client", "build")))

        app.use(bodyParser.urlencoded({ extended: true }));

        app.use(bodyParser.json());

        app.use(cors());

        app.use('/api/', routes);

        if (process.env.NODE_ENV === 'production') {
            // Serve any static files
            // app.use(express.static(path.join(__dirname, 'client/build')));
            // Handle React routing, return all requests to React app
            // app.get('*', function (req, res) {
            //     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
            // });

            app.use(express.static(__dirname)); //here is important thing - no static directory, because all static :)

            app.get("/*", function (req, res) {
                res.sendFile(path.join(__dirname, "index.html"));
            });
        }

        app.listen(process.env.PORT, () => {
            console.log(`listening on port ${process.env.PORT}`);
        });
    })
    .catch(console.error);