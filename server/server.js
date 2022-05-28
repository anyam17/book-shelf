const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileupload = require("express-fileupload");
const fs = require('fs');
const AWS = require('aws-sdk');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);

const app = express();

/* Model importations. */
const { User } = require('./models/user');
const { Book } = require('./models/book');
const { Favorite } = require('./models/favorite');
const { UserPhoto } = require('./models/userPhoto');
const { auth } = require('./middleware/auth');

/* Middleware Setup. */
app.use(bodyParser.json({limit: '50mb'}))
app.use(cookieParser());
app.use(fileupload());
app.use(express.static("files"));

const fileStoragePath = __dirname + "/files/";

/**
 * Initialising S3 bucket interface.
 */
 const s3 = new AWS.S3({
    accessKeyId: config.ACCESS_KEY_ID,
    secretAccessKey: config.SECRET_ACCESS_KEY
});

const uploadFile = async (filePath, fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(filePath);

    // Setting up S3 upload parameters
    const params = {
        Bucket: config.BUCKET_NAME,
        Key: fileName, // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    return await s3.upload(params, function(err) {
        if (err) throw err;
    }).promise();
};

/**************************************************************/
/***** ROUTES FOR USER AUTHENTICATION AND AUTHORISATION. ******/
/**************************************************************/
// Route for verifying user authorisation.
app.get('/api/auth', auth, (req, res) => {
    let photoData = {};
    if (req.data) {
        photoData = {
            id: req.data._id,
            photo: req.data.photo
        }
    }

    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        firstname: req.user.firstname,
        role: req.user.role,
        isActive: req.user.isActive,
        updatedAt: req.user.updatedAt,
        photo: photoData.photo,
        photoId: photoData.id,
    })
});

app.post('/api/register',(req, res) => {
    // Check for existing user
    User.findOne({'email': req.body.email}, (err, oldUser) => {
        if(oldUser) return res.json({isAuth: false, message: 'User with that email already exist!', success: false})

        const user = new User(req.body);

        user.save((err, data) => {
            if(err) return res.json({success: false});

            /*Added by Heen*/
            /*Once a user is created, directly log that user in with the login function. */
            user.generateToken((err,user) => {
                if(err) return res.status(400).send(err);
                res.cookie('auth',user.token).json({
                    isAuth: true,
                    id: user._id,
                    success: true,
                    user: data
                })
            })
        })
    })
})

app.post('/api/login', (req, res) => {
    User.findOne({'email': req.body.email}, (err, user) => {
        if(!user) return res.json({isAuth: false, message: 'Auth failed, email not found!', success: false})

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({
                isAuth: false,
                success: false,
                message: "Incorrect password!"
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
        res.status(200).json({message: "You have logged out successfully!", success: true})
    })
})


/********************************************/
/********* USER ROUTES AND LOGIC. ***********/
/********************************************/
app.get('/api/profile_photo',(req, res) => {
    let userId = req.query.id;

    UserPhoto.findById(userId, (err, data) => {
        if(err) return res.status(400).send(err);
        res.send(data)
    })
})

app.post('/api/profile_photo', (req, res) => {
        try {
            // to declare some path to store your converted image
            // const path = './server/public/images/photo_' + Date.now() + '.' + req.body.type;
            const path = './client/public/images/photo_' + Date.now() + '.' + req.body.type;
            const filePath = path.split("s/")[1];
            const file = req.body.photo;
     
            // to convert base64 format into random filename
            const base64Data = file.replace(/^data:([A-Za-z-+/]+);base64,/, '');
            
            fs.writeFileSync(path, base64Data,  {encoding: 'base64'});

            req.body["photo"] = filePath;

            // Check if it's the first time setting up a profile photo
            if (req.query.id !== "") {
                UserPhoto.findByIdAndUpdate(req.query.id, req.body, {new: true}, (err, data) => {
                    if(err) return res.status(400).send(err);
                    if (data) {
                        res.status(200).json({
                            message: "Profile photo updated successfully!",
                            success: true,
                            data
                        })
                    }
                })
            } else {
                const userPhoto = new UserPhoto(req.body);
                userPhoto.save((err, data) => {
                    if(err) return res.json({success: false});
                    res.status(200).json({
                        message: "Profile photo saved successfully!",
                        success: true,
                        data
                    })
                })
            }
        } catch (e) {
            console.log(e);
        }
})

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

    Book.find({isApproved: true}).skip(skip).sort({_id:order}).limit(limit).exec((err, data) => {
        if(err) return res.status(400).send(err);
        res.send(data);
    })
})

// Getting a books of logged in user
app.get('/api/my_books', (req, res) => {
    let userId = req.query.id;

    Book.find({ownerId: userId}).sort({_id: 'desc'}).exec((err, data) => {
        if(err) return res.status(404).send(err);
        res.status(200).send(data);
    })
})

app.post('/api/book', (req, res) => {
    const fileName = `${Date.now()}_${req.body.fileName}`;
    const filePath = `${fileStoragePath}${fileName}`;

    req.files.file.mv(filePath, (error) => {
        if(error) res.status(500).send({message: "File upload failed!", success: false});

        uploadFile(filePath, fileName).then((path) => {
            const book = new Book(req.body);
            book["file"] = path.Location;

            book.save((err, data) => {
                if(err) return res.status(400).send(err);
                res.status(200).json({
                    post: true,
                    bookId: data._id,
                    message: "Book Added successfully!",
                    success: true
                })
            })
        });
    })
});

app.put('/api/book', (req, res) => {
    const id = req.query._id;

    Book.findByIdAndUpdate(id, req.body, {new: true}, (err, data) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            message: "Book updated successfully!",
            success: true,
            data
        })
    })
});

app.delete('/api/book', (req, res) => {
    const id = req.query.id;
    Book.findByIdAndDelete(id, (err, data) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({message: "Book Deleted successfully!", success: true})
    })
})

app.get('/api/book/favorite', (req, res) => {
    let ownerId = req.query.id;

    Favorite.find({ownerId: ownerId}).sort({_id: 'desc'}).exec((err, favorite) => {
        if(err) return res.status(404).send(err);

        let bookIds = favorite.map((d) => (d.bookId));
        Book.find({"_id": {$in: bookIds}}, (err, books) => {
            if(err) return res.status(404).send(err);
            
            let combined = []
            favorite.forEach(d => {
                books.forEach((book, i) => {
                    if (d.bookId === book._id.toString()) {
                        combined[i] = {
                            _id: d._id,
                            bookId: d.bookId,
                            createdAt: d.createdAt,
                            updatedAt: d.updatedAt,
                            book
                        }
                    }
                })
            })

            res.status(200).send(combined);
        })
    })
})

app.post('/api/book/favorite', (req, res) => {
    try {
        const favorite = new Favorite(req.body);

        favorite.save((err, data) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({
                post: true,
                message: "Book added to favorite successfully!",
                success: true
            })
        })
    } catch (e) {
        console.log(e);
    }
});

app.delete('/api/book/favorite', (req, res) => {
    Favorite.findByIdAndDelete(req.query.favoriteId, (err, data) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({message: "Book Removed from favorite successfully!", success: true})
    });
});


/*************************************************/
/********* ROUTES FOR ADMIN ACTIONS.   ***********/
/*************************************************/
app.get('/api/admin/users',(req, res) => {
    User.find({},(err, users) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(users)
    })
})

app.post('/api/admin/user/role', (req, res) => {
    let userId = req.query.userId;
    let role = req.body.role;

    if (role == 1) role = 0;
    else role = 1;
    
    User.findByIdAndUpdate(userId, {role}, {new: true}, (err, data) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            message: "User role updated successfully!",
            success: true,
        })
    })
})

app.post('/api/admin/user/status', (req, res) => {
    let userId = req.query.userId;
    
    User.findByIdAndUpdate(userId, {isActive: req.body.isActive}, {new: true}, (err, data) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            message: "User status updated successfully!",
            success: true,
        })
    })
})

app.delete('/api/admin/user', (req, res) => {
    User.findByIdAndDelete(req.query.userId, (err, data) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({message: "User account deleted successfully!", success: true})
    });
});

app.get('/api/admin/books', (req, res) => {
    Book.find().sort({_id: 'desc'}).exec((err, data) => {
        if(err) return res.status(404).send(err);
        res.status(200).send(data);
    })
})

app.post('/api/admin/book/approve', (req, res) => {
    let bookId = req.query.bookId;
    
    Book.findByIdAndUpdate(bookId, {isApproved: req.body.isApproved}, {new: true}, (err, data) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            message: "Book approved successfully!",
            success: true,
        })
    })
})



// Database Connection Setup. 
mongoose.Promise = global.Promise;

/** 
 * Mongoose v6.0.6 already sets useNewUrlParser , useUnifiedTopology , and useCreateIndex to true, 
 * and useFindAndModify is false. So explicitely setting them is not required. */
mongoose.connect(config.DATABASE_URL)
  .then(() => app.listen(config.PORT, () => {
    console.log("\n" + "* ".repeat(36));
    console.log(`MongoDB database started sucessfully! \nServer started successfully on port: [${config.PORT}]`);
    console.log("_ ".repeat(36));
  }))
  .catch((error) => console.log(error.message));