const mongoose = require('mongoose');


/* ---------------------------------
.           sub Schema
--------------------------------- */
const LocalSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  profileImage: String,
})







const GoogleSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  username: String,
  email: String,
  profileImage: String,
});





const GithubSchema = new mongoose.Schema({
  githubId: {
    type: String,    
  },
  username: String,
  email: String,
  profileImage: String,
});






/* ---------------------------------
.           main Schema
--------------------------------- */
const UserSchema = new mongoose.Schema({
  local: LocalSchema,

  google: GoogleSchema,
  facebook: String,

  github: GithubSchema,
  linkedin: String,

  instagram: String,
  twitter: String,


  username: {
    type: String,
  },

  profileImage: {
    type: String,
    required: [true, `Profile image is required`],
  },

  location: {
    type: String,
    default: `Somewhere on the Earth`,
  },

  role: {
    type: String,
    default: 'user',
  },

  createdAt: String,

});


module.exports = User = mongoose.model('user', UserSchema);