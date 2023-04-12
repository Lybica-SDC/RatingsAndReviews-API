const reviewModel = require('../models');

// GET list of reviews
// /reviews/page/count/sort/product_id
module.exports = {
  getReviews: (req, res) => {
    reviewModel.getReviews(req.query, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.json(data);
      }
    });
  },

  // GET review meta data
  // /reviews/meta/product_id
  getMeta: (req, res) => {
    reviewModel.getMeta(req.query.product_id, (err, data) => {
      if (err) {
        res.send('problem getting meta');
      } else {
        res.json(data);
      }
    });
  },

  // POST a review
  // /reviews/product_id/rating/summary/body/recommend/name/email/photos/characteristics
  postReview: (req, res) => {
    // console.log('post query: ', req.body);
    // console.log('post param', req.param);
    // console.log('post body', req.body);
    reviewModel.postReview(req.body, (err) => {
      if (err) {
        res.send('could not post review');
      } else {
        res.end();
      }
    });
  },

  // PUT a review as helpful
  // /reviews/:review_id/helpful
  putHelpful: (req, res) => {
    reviewModel.putHelpful(req.params.review_id, (err) => {
      if (err) {
        res.send('could not mark as helpful');
      } else {
        res.end();
      }
    });
  },

  // PUT a review
  // /reviews/:review_id/report
  putReport: (req, res) => {
    // console.log('putReport controllers', req.params);
    reviewModel.putReport(req.params.review_id, (err) => {
      if (err) {
        res.send('could not report the review');
      } else {
        res.end();
      }
    });
  },
};
