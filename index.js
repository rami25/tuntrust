//libs
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

mongoose.connect(process.env.DATABASE_URL),(err,done)=>{
    if (err){
        console.log(err);
    }
    if(done){
    console.log('base de donnée connecté avec succés! ');
}}

app.use('/',       require('./routes/visitorRoutes'));
app.use('/admin',  require('./routes/adminRoutes'));
app.use('/user',   require('./routes/userRoutes'));
app.use('/comment',require('./routes/commentRoutes'));
app.use('/logout', require('./routes/logoutRoutes'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log("Serveur en marche"); }); 