require('./config/config');
require("./models/user.model");
require("./models/book.model");
require("./models/comment.model");
require("./models/app.model");
require("./models/review.model");
const rtsIndex = require('./index.routes');
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      cors = require('cors');


mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', rtsIndex);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
