const express = require("express")
const cors = require ("cors")
const userRouters = require ("./routers/user.routers.js")
const viajeRouters = require ("./routers/viajes.routers.js")
const registerRouters = require("./routers/register.routers.js")
const loginRouters = require("./routers/login.routers")
const chatsRouters= require("./routers/chats.routers")
const emailRouters= require("./routers/email.routers")
const errorHandling = require("./error/errorHandling")
const bodyParser = require('body-parser');
const app = express();

app.set("port", process.env.PORT || 3000)
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/email', emailRouters);
app.use(registerRouters);
app.use(loginRouters);    
app.use(viajeRouters);

app.use(chatsRouters);


app.use(userRouters);
app.use(function(req, res, next){
    res.status(404).json({error:true, 
                          codigo:404,
                          message: "End point doesn't found"})
})

app.use(errorHandling);
module.exports = app



