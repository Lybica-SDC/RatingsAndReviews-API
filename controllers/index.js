const reviewModel = require('../models/reviewModels.js');

// GET list of reviews
// /reviews/page/count/sort/product_id
module.exports = {
  getReviews: (req, res) => {
    console.log('getReview controllers');
    reviewModel.getReviews();
  },

  // GET review meta data
  // /reviews/meta/product_id
  getMeta: (req, res) => {
    console.log('getMeta controllers');
    reviewModel.getMeta();
  },

  // POST a review
  // /reviews/product_id/rating/summary/body/recommend/name/email/photos/characteristics
  postReview: (req, res) => {
    console.log('postReview controllers');
    reviewModel.postReview();
  },

  // PUT a review as helpful
  // /reviews/:review_id/helpful
  putHelpful: (req, res) => {
    console.log('putHelpful controllers');
    reviewModel.putHelpful();
  },

  // PUT a review
  // /reviews/:review_id/report
  putReport: (req, res) => {
    console.log('putReport controllers');
    reviewModel.putReport();
  },
};
