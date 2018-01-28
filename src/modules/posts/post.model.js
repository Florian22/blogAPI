import mongoose, { Schema } from 'mongoose';
import slug from 'slug';
import uniqueValidator from 'mongoose-unique-validator';

import constants from '../../config/constants';

const PostSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: [true, 'title is required!'],
    trim: true,
    minlength: [5, 'title need to be longer'],
  },
  body:{
  	type: String,
    required: [true, 'body is required!'],
  },
  slug:{
    type: String,
    trim: true,
    lowercase: true,
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  imgURL:{
    type: String,
    trim: true,
  },
},{timestamps:true});

PostSchema.plugin(uniqueValidator,{
  message: '{VALUE} already exist',
});
PostSchema.pre('validate', function(next){
  this._slugify();
  next();
});

PostSchema.methods = {
  _slugify(){
    this.slug = slug(this.title);
  },
	toJSON(){
    return {
      _id: this._id,
      title: this.title,
      body: this.body,
      slug: this.slug,
      createdAt: this.createdAt,
      user: this.user,
      imgURL: this.imgURL,
    };
  },
	};

PostSchema.statics = {
  createPost(args){
    return this.create({
      ...args,
    });
  },
  list({skip = 0, limit = 25} = {}){
    return this.find()
    .sort({createdAt: -1}) //order by created desc
    .skip(skip)
    .limit(limit)
    .populate('User')
  },
};

export default mongoose.model('Post', PostSchema);