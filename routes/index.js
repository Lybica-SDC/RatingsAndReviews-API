const express = require("express");
const router = express.Router();
const reviewController = require('../controllers');


//GET list of reviews
// /reviews/page/count/sort/product_id
router.get('/reviews/page/count/sort/product_id', reviewController.rList);



//GET review meta data
// /reviews/meta/product_id


//POST a review
// /reviews/product_id/rating/summary/body/recommend/name/email/photos/characteristics

//PUT a review as helpful
// /reviews/:review_id/helpful

//PUT a review
// /reviews/:review_id/report

