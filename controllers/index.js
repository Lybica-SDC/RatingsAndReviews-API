const reviewsModel = require('../models');

//GET list of reviews
// /reviews/page/count/sort/product_id
exports.rList = (req, res) => {
  console.log('made it to controllers');
  reviewsModel.rList()
}


//GET review meta data
// /reviews/meta/product_id


//POST a review
// /reviews/product_id/rating/summary/body/recommend/name/email/photos/characteristics

//PUT a review as helpful
// /reviews/:review_id/helpful

//PUT a review
// /reviews/:review_id/report

