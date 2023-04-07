const express = require('express');

const router = express.Router();
const controllers = require('../controllers');

// GET list of reviews
// /reviews/page/count/sort/product_id
router.get('/:page/:count/:sort/:product_id', controllers.getReviews);

// GET review meta data
// /reviews/meta/product_id
router.get('/meta', controllers.getMeta);

// POST a review
// /reviews/product_id/rating/summary/body/recommend/name/email/photos/characteristics
router.post('/', controllers.postReview);

// PUT a review as helpful
// /reviews/:review_id/helpful
router.put('/:review_id/helpful', controllers.putHelpful);

// PUT a review
// /reviews/:review_id/report
router.put('/:review_id/report', controllers.putReport);

module.exports = router;
