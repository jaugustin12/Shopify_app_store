const mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var AppSchema = new Schema({
    _id:ObjectId,
    id:String,
    url:String,
    title:String,
    developer:String,
    developer_link:String,
    icon: String,
    rating:Number,
    reviews_count:Number,
    description_raw:String,
    description:String,
    tagline:String,
    pricing_hint:String
});

// Compile model from schema
var App = mongoose.model('App', AppSchema);
