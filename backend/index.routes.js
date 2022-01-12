const express = require('express');
const router = express.Router();

const ctrlUser = require('./controllers/user.controller');
const ctrlBook = require('./controllers/book.controller');
const ctrlApp = require('./controllers/app.controller');
const jwtHelper = require('./config/jwtHelper');


router.get('', (req, res) => res.send('LiveCicle Backend'));
router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.post('/refresh', ctrlUser.refresh);
router.post('/logout', ctrlUser.logout);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/users', jwtHelper.verifyJwtToken, ctrlUser.users);

router.get('/books', ctrlBook.books)
router.post('/addBook', ctrlBook.addBook)
router.post('/addComment', ctrlBook.addComment)
router.get('/getComments/:bookId', ctrlBook.getComments)
router.get('/getSearch/:search', ctrlBook.getSearch)

router.get('/apps', ctrlApp.apps)
router.get('/getReviews/:id', ctrlApp.getReviews)
router.post('/addReview', ctrlApp.addReview) 
router.post('/updateReview', ctrlApp.updateReview)
router.post('/deleteReview', ctrlApp.deleteReview)


module.exports = router;
