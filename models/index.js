/* eslint-disable camelcase */
/* eslint-disable quotes */
const db = require('../database');
// GET list of reviews
// /reviews/page/count/sort/product_id
module.exports = {
  getReviews: async (req, callback) => {
    const { page, count, product_id } = req;
    console.log('the prod.id', product_id);

    const queryResults = `SELECT review_id, rating, summary, recommend, response, body, date, reviewer_name, (SELECT json_agg(json_build_object('id', photos.id, 'url', photos.url)) FROM photos WHERE photos.review_id = reviews.review_id) AS photos FROM reviews LIMIT ${count}`;

    // const photos = await db.many(queryPhotos);
    const results = await db.many(queryResults);
    const review = {
      product: product_id,
      page,
      count,
      results,
    };
    callback(null, review);
  },

  // GET review meta data
  // /reviews/meta/product_id
  getMeta: (req, callback) => {
    console.log('getMeta models');
    const queryString = 'SELECT body FROM reviews WHERE id < 10';
    db.many(queryString)
      .then((result) => {
        callback(null, result);
      })
      .catch((err) => {
        console.log('err getting meta', err);
        callback(err);
      });
  },

  // POST a review
  // /reviews/product_id/rating/summary/body/recommend/name/email/photos/characteristics
  postReview: (req, callback) => {
    console.log('postReview models');
  },

  // PUT a review as helpful
  // /reviews/:review_id/helpful
  putHelpful: (req, callback) => {
    console.log('putHelpful models');
  },

  // PUT a review
  // /reviews/:review_id/report
  putReport: (req, callback) => {
    console.log('putReport models');
  },
};
