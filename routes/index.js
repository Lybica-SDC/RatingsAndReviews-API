const express = require('express');

const router = express.Router();
const controllers = require('../controllers');

// GET list of reviews
// /reviews/page/count/sort/product_id
router.get('/page', controllers.getReviews);

// GET review meta data
// /reviews/meta/product_id
router.get('/meta', controllers.getMeta);

// POST a review
// /reviews/product_id/rating/summary/body/recommend/name/email/photos/characteristics
router.post('/product_id', controllers.postReview);

// PUT a review as helpful
// /reviews/:review_id/helpful

// PUT a review
// /reviews/:review_id/report

module.exports = router;
