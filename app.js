const express = require('express');
const passport = require('passport');





// -------------------FIRING EXPRESS APP
const app = express();
app.use('/staticURL', express.static('./staticFOL'));
app.set('view engine', 'ejs');






const cookieSession = require('cookie-session');
/* ---------------------------------
.           COOKIE and PASSPORT
--------------------------------- */
app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: ['orehasaikyounizettainaru']
}))


app.use(passport.initialize());
app.use(passport.session());








/* ---------------------------------
.              config
--------------------------------- */
require('./config/passportConfig');





/* ---------------------------------
.              routes
--------------------------------- */
app.use('/auth', require('./routes/authRoutes'));




// -------------------LISTEN TO PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
})