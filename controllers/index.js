const reviewModel = require('../models');

// GET list of reviews
// /reviews/page/count/sort/product_id
module.exports = {
  getReviews: (req, res) => {
    reviewModel.getReviewsPromise(req.query)
      .then((response) => {
        console.log(response);
        res.json(response);
      })
      .catch((err) => {
        console.log(err);
        res.send('could not get reviews');
      });
  },
  // GET review meta data
  // /reviews/meta/product_id
  getMeta: (req, res) => {
    reviewModel.getMetaPromise(req.query.product_id)
      .then((data) => {
        res.json(data);
      })
      .catch(() => {
        res.send('problem getting meta');
      });
  },

  // POST a review
  // /reviews/product_id/rating/summary/body/recommend/name/email/photos/characteristics
  postReview: (req, res) => {
    reviewModel.postReview(req.body, (err) => {
      if (err) {
        res.send('could not post review');
      } else {
        res.sendStatus(201);
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
        res.send('could not report the review');
      } else {
        res.sendStatus(204);
      }
    });
  },
};
