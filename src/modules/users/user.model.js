import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import { passwordReg } from './user.validations';
import constants from '../../config/constants';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required!'],
    trim: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: '{VALUE} is not a valid email!',
    },
  },
  firstName: {
    type: String,
    required: [true, 'FirstName is required!'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'LastName is required!'],
    trim: true,
  },
  userName: {
    type: String,
    required: [true, 'UserName is required!'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    trim: true,
    minlength: [6, 'Password need to be longer than 6'],
    validate: {
      validator(password) {
        return passwordReg.test(password);
      },
      message: '{VALUE} is not a valid password!',
    },
  },
  picture: {
    type: String,
    trim: true,
  },
},{timestamps:true});

UserSchema.pre('save', function (next){
  // encript only if password modified only
  if(this.isModified('password')){
    this.password = this._hashpassword(this.password);
  }
  return next();
});



UserSchema.methods = {
  _hashpassword(password){
    return hashSync(password);
  },
  authenticateUser(password){
    return compareSync(password, this.password);
  },
  createToken(){
    return jwt.sign(
    {
      _id: this._id,
    },
    constants.JWT_SECRET,
    );
  }, //one } missing ?
  toJSON(){
    return {
      username: this.userName,
      firstname: this.firstName,
      lastname: this.lastname,
      email: this.email,
      picture: this.picture,
    };
  },
  toAuthJSON(){
    return {
      _id: this._id,
      userName: this.userName,
      firstname: this.firstName,
      lastname: this.lastname,
      email: this.email,
      picture: this.picture,
      token: `Bearer ${this.createToken()}`,
    };
  },
}; 

export default mongoose.model('User', UserSchema);