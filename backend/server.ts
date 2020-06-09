export {};
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');
const routes = require('./route/place');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;
const uri = config.get("ATLAS_URL");

mongoose.connect(uri, 
    { useNewUrlParser: true, useUnifiedTopology: true, 
useCreateIndex: true});

const connection = mongoose.connection;

connection.on('open', () => {
    console.log("Connection to MongoDB Atlas established successfully");
});

app.use('/places', routes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../build'));

    app.get("*", (req: any, res: any) => {
        res.sendFile(path.join(__dirname + "../build/index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server running at PORT: ${PORT}`);
})