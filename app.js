const express = require('express');
const cors = require("cors");
// const morgan = require('morgan');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

app.use(cors());

// express app
const app = express();
// enable CORS for all resources
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// connect to mongodb
const dbURI = 'mongodb+srv://adriano:ftblrwhy@cluster0.sqqdi.mongodb.net/social_media_feed_db?retryWrites=true&w=majority';
// const dbURI = 'mongodb+srv://adriano:<password>@cluster0.sqqdi.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected to db');
        app.listen(process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 8080);
    })
    .catch((error) => console.log(error));

// register view engine
app.set('view engine', 'ejs');

// MIDDLEWARE
// EXAMPLE USAGE OF THE 'MORGAN' LOGGER MIDDLEWARE
// app.use(morgan('dev'));

// STATIC FILES(images, styles, etc) are searched for in the 'public' folder
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

// routes
/* app.get('/', (req, res) => {
    res.redirect('/posts');
});

app.get('/about', (req, res) => {
    res.json({aboutUs: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia quibusdam quaerat illo a modi tenetur ut blanditiis, illum quo consectetur recusandae excepturi natus impedit rem, tempora cum fuga quae in.'});
}); */

// post routes
app.use('/posts', postRoutes);


// user routes
app.use('/users', userRoutes);

// 404 page
app.use((req, res) => {
    res.json({ message: 'Oops can\'t find that' });
})