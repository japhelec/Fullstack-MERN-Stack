const express = require("express"); //server side common JS module system
const mongoose = require("mongoose");
const cookieSession = require("cookie-session")
const passport = require("passport")
require("./models/user");
require("./services/passport");
const keys = require("./config/keys");

mongoose.connect(keys.mongoURI);

const app = express(); //start an app, there may be more than one app

app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
)

app.use(passport.initialize())
app.use(passport.session())


require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000; //Heroku tells us what port to listen
app.listen(PORT); //tell node to help listen on port PORT
