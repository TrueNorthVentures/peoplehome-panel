const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new mongoose.Schema({
	created_by: String,		//should be changed to ObjectId, ref "User"
	created_at: {type: Date, default: Date.now},
	text: String
});

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  Addemail: String, 
  facebook: String,
 
  google: String,
  
  linkedin: String,
  tokens: Array,
  created_by: String,		//should be changed to ObjectId, ref "User"
  created_at: {type: Date, default: Date.now},
  text: String,
  profile: {
    name: String,
    contactNumber:String,
    position:String,  
    location: String,
    website: String,
    picture: String
  },
  organization:{
    organizationToken:String,
    organizationTokenExpires: Date,
    organizationPurpose:String,
    organizationImportantWork:String,
    organizationFundamentalValues:String,
    organizationDriven:{
      strategicApproach:String,
      processesByResult:String 
    },
    personalTraits:String,
    OrganizationWellPerformer :{
      expected:String,
      getRecognition:String
  },
    issueHandling :{
      ignore:String,
      feedback:String
  },
    projectHandling :{
      managementResponsibility:String,
      ownResponsibility:String
  },
    autonomy :{
      managementTellEmployees:String,
      employeesChoice:String
  }
}
}, { timestamps: true });

//
//const addleadershipSchema = new mongoose.Schema({
//
//    question: String
//}, { timestamps: true });
//


//
//const botuserSchema = new mongoose.Schema({
// basic: {
//        first_name: String,
//        last_name: String
//    }
//}, { timestamps: true });
//
//


/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);
//const addleadership = mongoose.model('addleadership', addleadershipSchema);
module.exports = User;
//module.exports = Botuser;
