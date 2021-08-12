const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

/* Database Connection Setup. */
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(config.DATABASE);
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

/* Model importations. */
const { User } = require('./models/user');
const { Book } = require('./models/book');
const { auth } = require('./middleware/auth');

/* Middleware Setup. */
app.use(bodyParser.json());
app.use(cookieParser());


/**************************************************************/
/***** ROUTES FOR USER AUTHENTICATION AND AUTHORISATION. ******/
/**************************************************************/
// Route for verifying user authorisation.
app.get('/api/auth', auth, (req, res) => {
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        firstname: req.user.firstname,
        lastname: req.user.lastname
    })
});

app.post('/api/register',(req, res) => {
    const user = new User(req.body);

    user.save((err, data) => {
        if(err) return res.json({success: false});
        res.status(200).json({
            success: true,
            user: data
        })
    })
})

app.post('/api/login', (req, res) => {
    User.findOne({'email': req.body.email}, (err, user) => {
        if(!user) return res.json({isAuth: false, message: 'Auth failed, email not found!'})

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({
                isAuth: false,
                message: "Wrong password"
            });

            user.generateToken((err,user) => {
                if(err) return res.status(400).send(err);
                res.cookie('auth',user.token).json({
                    isAuth: true,
                    id: user._id,
                    email: user.email
                })
            })
        })
    })
})

app.get('/api/logout', auth, (req, res) => {
// Logging out entails deleting user token from the database.
    req.user.deleteToken(req.token, (err, user) => {
        if(err) return res.status(400).send(err);
        res.sendStatus(200).json({message: "You have logged out successfully!"})
    })
})


/********************************************/
/********* USER ROUTES AND LOGIC. ***********/
/********************************************/
app.get('/api/getReviewer',(req,res) => {
    let id = req.query.id;

    User.findById(id,(err, data) => {
        if(err) return res.status(400).send(err);
        res.json({
            name: data.name,
            lastname: data.lastname
        })
    })
})

app.get('/api/users',(req, res) => {
    User.find({},(err, users) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(users)
    })
})

app.get('/api/user_posts', (req, res) => {
    Book.find({ownerId: req.query.user}).exec((err, data) => {
        if(err) return res.status(400).send(err);
        res.send(data)
    })
})


/*************************************************/
/********* ROUTES FOR BOOK CONTROLLER. ***********/
/*************************************************/
// Getting a single book
app.get('/api/book', (req, res) => {
    let id = req.query.id;

    Book.findById(id, (err, data) => {
        if(err) return res.status(404).send(err);
        res.status(200).send(data);
    })
})

app.get('/api/books',(req, res) => {
    // locahost:3001/api/books?skip=3&limit=2&order=asc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    Book.find().skip(skip).sort({_id:order}).limit(limit).exec((err, data) => {
        if(err) return res.status(400).send(err);
        res.send(data);
    })
})

app.post('/api/book', (req, res) => {
    const book = new Book(req.body);

    book.save((err, data) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post: true,
            bookId: data._id
        })
    })
});

app.put('/api/book', (req, res) => {
    const id = req.query._id;

    Book.findByIdAndUpdate(id, req.body, {new: true}, (err, data) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            message: "Book updated successfully!",
            data
        })
    })
});

app.delete('/api/book', (req, res) => {
    const id = req.query._id;
    Book.findByIdAndDelete(id, (err, data) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({message: "Book Deleted successfully!"})
    })
})


const port = process.env.PORT || 4000;
app.listen(port, function() {
    console.log(`Server started successfully on port: ${port}`);
});