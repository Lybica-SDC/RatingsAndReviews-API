const reviewModel = require('../models');

// GET list of reviews
// /reviews/page/count/sort/product_id
module.exports = {
  getReviews: (req, res) => {
    reviewModel.getReviews(req.params, (err, data) => {
      if (err) {
        console.log('err getting reviews: ', err);
      } else {
        console.log('list of reviews: ', data);
        res.json(data);
      }
    });
  },

  // GET review meta data
  // /reviews/meta/product_id
  getMeta: (req, res) => {
    reviewModel.getMeta(req.params, (err, data) => {
      if (err) {
        console.log('err getting meta: ', err);
      } else {
        console.log('meta data: ', data);
        res.json(data);
      }
    });
  },

  // POST a review
  // /reviews/product_id/rating/summary/body/recommend/name/email/photos/characteristics
  postReview: (req, res) => {
    console.log('post body: ', req.body);
    reviewModel.postReview(req.query, (err) => {
      if (err) {
        console.log('err posting to db');
      } else {
        res.sendStatus(201);
      }
    });
  },

  // PUT a review as helpful
  // /reviews/:review_id/helpful
  putHelpful: (req, res) => {
    console.log('putHelpful controllers');
    reviewModel.putHelpful(req.params, (err) => {
      if (err) {
        console.log('err updating helpful: ', err);
      } else {
        res.sendStatus(204);
      }
    });
  },

  // PUT a review
  // /reviews/:review_id/report
  putReport: (req, res) => {
    // console.log('putReport controllers', req.params);
    reviewModel.putReport(req.params.review_id, (err) => {
      if (err) {
        console.log('err updating helpful: ', err);
      } else {
        res.sendStatus(204);
      }
    });
  },
};
