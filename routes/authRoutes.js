const router = require('express').Router();
const passport = require('passport');





router.get('/logout', (req, res)=>{
  req.logOut();
  res.redirect();
})









/* ----------------------------------------
.               GOOGLE
---------------------------------------- */
// -------------------AUTH-------------------
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// -------------------CALLBACK-------------------
router.get('/google/callback', passport.authenticate('google'), (req, res)=>{
  res.redirect('/');
})











/* ----------------------------------------
.               GOOGLE
---------------------------------------- */
// -------------------AUTH-------------------
router.get('/github', passport.authenticate('github'));

// -------------------CALLBACK-------------------
router.get('/github/callback', passport.authenticate('github'), (req, res)=>{
  res.redirect('/');
})




module.exports = router;
