const mongoose = require('mongoose');
const App = mongoose.model('App');
const Review = mongoose.model('Review');
var JSONStream = require('JSONStream');
var Stream = require('stream');

module.exports.apps = async function (req, res) {
    await App.find({ $and: [ {"id":{$ne:null}}, {"id":{$ne:'\n'}}] }, function (err, apps) {
      console.log('hi')
      if (err) {
        throw err;
      }
      res.status(200).json(apps);
    })
  }

  
  module.exports.deleteReview = async function (req, res) {
    
    id = req.body.id
    console.log('id', typeof id)
    await Review.deleteOne({_id: id}, function(err){

      if(err){
        console.log(err)
        res.status(400).json({message: 'Failed to delete record'});
      }
      else{
        res.status(200).json({message: 'Deleted successfully'});
      }

  });
  }
  module.exports.updateReview = async function (req, res) {
    
    id = req.body.id
    console.log('id', typeof id)
    await Review.findOneAndUpdate({_id: id}, {body:req.body.form.text}, {
      new: true
    }, function(err, result){

      if(err){
        console.log(err)
        res.status(400).json({message: 'Failed to update new record'});
      }
      else{
        res.status(200).json({message: 'Updated successfully'});
      }

  });
  }

  module.exports.addReview = function (req, res) {
    let ts = Date.now();
    Review.create({
      
      app_id: req.body.app.id,
      author: req.body.profile.fullName,
      rating: req.body.form.rating,
      posted_at: ts,
      body:req.body.form.text
    })
      .then(() => {
        res.status(200).json({message: 'Review added successfully'});
      })
      .catch(err => {
        console.log(err)
          res.status(400).json({message: 'Failed to create new record'});
      });
  }

  // { id: { $regex: /a1781df5-32a1-4d31-a9a5-460788d0bdc2/ } } 

module.exports.getReviews = async function (req, res) {
  Review.find({ "app_id": { "$regex": req.params.id, "$options": "i" } })
  .cursor()
  .pipe(JSONStream.stringify())
  .pipe(res.type('json'));

  console.log(req.params.id);
}
  // await Review.find({}, function (err, reviews) {
  //     console.log('during func')
  //     console.log('err', err)
  //     console.log('reviews', reviews)
  //     if (err) {
  //       throw err;
  //     }
  //     res.status(200).json(reviews);
  //   })