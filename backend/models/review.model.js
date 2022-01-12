const mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ReviewSchema = new Schema({
    app_id:String,
    author:String,
    rating:Number,
    posted_at:Date,
    body:String,
    helpful_count:Number,
    developer_reply:String,
    developer_reply_posted_at:Date
});

// Compile model from schema
var Review = mongoose.model('Review', ReviewSchema);
