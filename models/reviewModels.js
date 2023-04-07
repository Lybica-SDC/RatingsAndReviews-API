const db = require('../database/db.js');
// GET list of reviews
// /reviews/page/count/sort/product_id
module.exports = {
  getReviews: (req, callback) => {
    const queryString = 'SELECT body FROM reviews WHERE id < 10';
    db.many(queryString)
      .then((result) => {
        callback(null, result);
      })
      .catch((err) => {
        console.log('err getting reviews', err);
        callback(err);
      });
  },

  // GET review meta data
  // /reviews/meta/product_id
  getMeta: (req, res) => {
    console.log('getMeta models');
  },

  // POST a review
  // /reviews/product_id/rating/summary/body/recommend/name/email/photos/characteristics
  postReview: (req, res) => {
    console.log('postReview models');
  },

  // PUT a review as helpful
  // /reviews/:review_id/helpful
  putHelpful: (req, res) => {
    console.log('putHelpful models');
  },

  // PUT a review
  // /reviews/:review_id/report
  putReport: (req, res) => {
    console.log('putReport models');
  },
};
