const express=require('express');
const app=express();
const path=require('path');
const mongoose = require('mongoose');
const seed=require('./seed');
const ejsMate=require('ejs-mate')
const User=require('./models/User');
const methodOverride=require('method-override');
const session=require('express-session')
const passport=require('passport');
const LocalStrategy=require('passport-local')
const flash=require('connect-flash');
mongoose.connect('mongodb://127.0.0.1:27017/students-data') // it return a promise
    .then(()=>{
        console.log('db connected successfully');
    })
    .catch((err)=>{
        console.log("db error");
        console.log(err);
    })
// seed();

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

app.set('view engine','ejs');
app.engine('ejs',ejsMate);
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true,   /// taki hamari session id koi churaa na paye
        expires:Date.now()+1000*60*60*24*7*1,  // 1 week tk login rakhna chahte h
        maxAge:1000*60*60*24*7*1 /// chahe expire dedo chahe max age dedo
    }
    
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(User.serializeUser()); // to store user information into session
passport.deserializeUser(User.deserializeUser()); //to remove user information when it logged out

passport.use(new LocalStrategy(User.authenticate()))

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// seed()
const student_route=require('./routes/student_route');
const auth_route=require('./routes/auth_route')

app.use(student_route);
app.use(auth_route);

app.listen('4000',()=>{
    console.log('server open at port 4000')
})
