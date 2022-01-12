const mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var BookSchema = new Schema({
  bookID: Number,
  title: String,
  authors: String,
  average_rating: Number,
  isbn: Number,
  isbn13: Number,
  language_code: String,
  num_pages: Number,
  ratings_count: Number,
  text_reviews_count: Number,
  publication_date: Date,
  publisher: String,
  comments: [{ type: String, ref: "User" }]

});

// Compile model from schema
var Book = mongoose.model('Book', BookSchema);
