const mongoose = require('mongoose');
const Book = mongoose.model('Book');
const Comment = mongoose.model('Comment');
const User = mongoose.model('User');

module.exports.books = (req, res) => {
  Book.find({}, function (err, books) {
    console.log('hi')
    if (err) {
      throw err;
    }
    res.status(200).json(books);
  })
}

module.exports.addBook = (req, res) => {
  Book.create({
    title: req.body.title,
    authors: req.body.authors,
    isbn: req.body.isbn
  })
    .then(() => {
      res.status(200).json({ 'book': 'Added successfully'});
    })
    .catch(err => {
        res.status(400).send(['Failed to create new record']);
    });
}

module.exports.addComment = (req, res) => {
  console.log(req.body)

  Comment.create({
    bookID: req.body.book.bookID,
    userID: req.body.user,
    message: req.body.message
  })
    .then((comment) => {
      User.findOne({_id: req.body.user}, function (err, user) {
        if(user) {
          console.log('hello', comment._id)
          user.comments.commentIDs.push(comment._id);
        }
        if(!user) {
          console.log('no user')
          res.send('no user!!');
        }
        if (err) {
          console.log(err)
          res.send(err);
        }
      })
    }).then(() => {
      Book.findOneAndUpdate({bookID: req.body.book.bookID}, {$push: {comments: req.body.user}}, (err, book) => {
        if(err) {
          console.log(err)
        }
        if (book) {
          console.log(book)
        }
      })
    });
      console.log('cool');
  }

module.exports.getComments = (req, res) => {
  Comment.find({bookID: req.params.bookId}, (err, result) => {
    if (result) {
      res.json(result)
    }
    if(!result) {
      console.log('no result')
      res.send('no result!!');
    }
    if (err) {
      console.log(err)
      res.send(err);
    }
  });
}

module.exports.getSearch = (req, res) => {
  console.log(req.params.search);
  Book.find({$or: [
    {'title' : new RegExp(req.params.search, 'i')},
    {'author' : new RegExp(req.params.search, 'i')},
    {'publisher' : new RegExp(req.params.search, 'i')},
    {'language_code' : new RegExp(req.params.search, 'i')}
  ]}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
}
