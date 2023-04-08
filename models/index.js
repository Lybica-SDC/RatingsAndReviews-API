/* eslint-disable camelcase */
/* eslint-disable quotes */
const db = require('../database');
const helpers = require('./helpers');
// GET list of reviews
// /reviews/page/count/sort/product_id
module.exports = {
  getReviews: async (req, callback) => {
    const { page, count, product_id } = req;
    console.log('the prod.id', product_id);

    const queryResults = `SELECT review_id, rating, summary, recommend, response, body, date, reviewer_name, (SELECT json_agg(json_build_object('id', photos.id, 'url', photos.url)) FROM photos WHERE photos.review_id = reviews.review_id) AS photos FROM reviews WHERE reviews.product_id = $3 LIMIT $2`;

    // const photos = await db.many(queryPhotos);
    const results = await db.many(queryResults, [page, count, product_id]);
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
  getMeta: async (req, callback) => {
    const { product_id } = req;
    const metaData = {
      product_id,
    };

    const ratings = await db.many('SELECT rating FROM reviews WHERE product_id = $1', [product_id]);
    const results = helpers.calculateRatings(ratings);
    metaData.ratings = results;

    const rec = await db.many('SELECT recommend FROM reviews WHERE product_id = $1', [product_id]);
    const recCount = helpers.totalRec(rec);
    metaData.recommended = recCount;

    const chars = await db.many('SELECT char_reviews.characteristic_id, characteristics.name, char_reviews.review_id, char_reviews.value FROM characteristics JOIN char_reviews ON char_reviews.characteristic_id = characteristics.id WHERE characteristics.product_id = $1', [product_id]);
    const charTotals = helpers.calculateChars(chars);
    metaData.characteristics = charTotals;

    callback(null, metaData);
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
