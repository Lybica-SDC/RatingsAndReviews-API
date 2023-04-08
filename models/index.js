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

    const queryResults = `SELECT id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, (SELECT json_agg(json_build_object('id', photos.id, 'url', photos.url)) FROM photos WHERE photos.review_id = reviews.id) AS photos FROM reviews WHERE reviews.product_id = $3 LIMIT $2`;

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
  postReview: (data, callback) => {
    console.log('postReview models', data);
    const {
      product_id, rating, summary, body, date, recommend,
      name, email, photos, characteristics, reported, response, helpfulness,
    } = data;
    const queryString = 'INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email, reported, response, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) ON CONFLICT DO NOTHING';
    db.none(
      queryString,
      [product_id, rating, date, summary, body,
        recommend, name, email, reported, response, helpfulness],
    )
      .then(() => {
        console.log('post successful');
        callback(null);
      })
      .catch((err) => {
        console.log('err posting review: ', err);
        callback(err);
      });
  },

  // PUT a review as helpful
  // /reviews/:review_id/helpful
  putHelpful: async (data, callback) => {
    console.log('putHelpful models');
    const { review_id } = data;
    const query = await db.one('SELECT helpfulness FROM reviews WHERE id = $1', [review_id])
      .catch((err) => {
        console.log('here', err);
      });

    const newVal = query.helpfulness + 1;

    db.none('UPDATE reviews SET helpfulness = $1 WHERE id = $2', [newVal, review_id])
      .then(() => {
        console.log('put successfull');
        callback(null);
      })
      .catch((err) => {
        console.log('could not put helpful');
        callback(err);
      });
  },

  // PUT a review
  // /reviews/:review_id/report
  putReport: (req, callback) => {
    console.log('putReport models');
  },
};
