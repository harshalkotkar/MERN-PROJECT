const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
app.use(express.json());
dotenv.config({path:'./config.env'})

require('./db/conn');
const User = require('./models/userSchema');
app.use(require('./router/auth'));

const PORT = process.env.PORT || 4000;




// app.get("/about", (req, res) => {
//     res.send("about");
// })
// app.get("/contact", (req, res) => {
//     res.send("contact");
// })
app.get("/signin", (req, res) => {
    res.send("getting signin");
})
app.get("/signup", (req, res) => {
    res.send("getting signup");
})

if (process.env.NODE_ENV=="production"){
    app.use(express.static("client/build"));
}


app.listen(PORT, () => {
    console.log(`listeining to ${PORT}`);
})
