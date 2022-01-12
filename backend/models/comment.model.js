const mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({
  bookID: Number,
  userID: ObjectId,
  message: String
});

// Compile model from schema
var Book = mongoose.model('Comment', CommentSchema);
