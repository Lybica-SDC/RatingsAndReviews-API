/* eslint-disable prefer-template */
/* eslint-disable camelcase */
/* eslint-disable quotes */
const db = require('../database');
const helpers = require('./helpers');
// GET list of reviews
// /reviews/page/count/sort/product_id
module.exports = {
  getReviews: async (req, callback) => {
    let {page, count, product_id, sort } = req;

    const num = count || 5;
    const pages = page || 1;

    const sortString = helpers.generateSort(sort);
    const queryResults = "SELECT id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, (SELECT json_agg(json_build_object('id', photos.id, 'url', photos.url)) FROM photos WHERE photos.review_id = reviews.id) AS photos FROM reviews WHERE reviews.product_id = $1 AND reviews.reported = false " + sortString + " LIMIT $2";

    // const photos = await db.many(queryPhotos);
    db.any(queryResults, [product_id, count])
      .then((values) => {
        values.forEach((value) => {
          if (value.photos === null) {
            value.photos = [];
          }
          value.date = new Date(value.date * 100).toISOString();
        });
        const review = {
          product: product_id,
          page: pages,
          count: num,
          results: values,
        };
        callback(null, review);
      })
      .catch((err) => {
        callback(err);
      });
  },

  // GET review meta data
  // /reviews/meta/product_id
  getMeta: async (product_id, callback) => {
    const metaData = {
      product_id,
    };

    db.many('SELECT rating, recommend FROM reviews WHERE product_id = $1', [product_id])
      .then((data) => {
        metaData.ratings = helpers.calculateRatings(data);
        metaData.recommended = helpers.totalRec(data);
      })
      .then(() => (
        db.many('SELECT char_reviews.characteristic_id, characteristics.name, char_reviews.review_id, char_reviews.value FROM characteristics JOIN char_reviews ON char_reviews.characteristic_id = characteristics.id WHERE characteristics.product_id = $1', [product_id])
      ))
      .then((data) => {
        metaData.characteristics = helpers.calculateChars(data);
        callback(null, metaData);
      })
      .catch((err) => {
        callback(err);
      });

    // const charTotals = helpers.calculateChars(chars);
    // metaData.characteristics = charTotals;

    // callback(null, metaData);
  },

  // POST a review
  // /reviews/product_id/rating/summary/body/recommend/name/email/photos/characteristics
  postReview: async (data, callback) => {
    const {
      product_id, rating, summary, body, date, recommend,
      name, email, photos, characteristics, reported, response, helpfulness,
    } = data;

    let reviewID = 0;
    const queryString = 'INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email, reported, response, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id';
    await db.one(
      queryString,
      [product_id, rating, date, summary, body,
        recommend, name, email, reported, response, helpfulness],
    )
      .then((value) => {
        reviewID = value.id;
      })
      .catch((err) => {
        callback(err);
      });

    // const maxPhotoID = await db.one('SELECT MAX(id) FROM photos');
    // let photoID = maxPhotoID.max + 1;
    await photos.forEach(async (url) => {
      db.one('INSERT INTO photos (url, review_id) VALUES ($1, $2) RETURNING id', [url, reviewID])
        .catch((err) => {
          callback(err);
        });
    });

    // TODO: IMPLEMENT ADDING INTO CHAR_REVIEWS and CHARACTERISTICS

    const insertChar_reviews = 'INSERT INTO char_reviews (review_id, characteristic_id, value) VALUES ($1, $2, $3)';
    const keys = Object.keys(characteristics);
    const values = Object.values(characteristics);
    await keys.forEach((trait, index) => {
      db.none(insertChar_reviews, [reviewID, keys[index], values[index]])
        .catch((err) => {
          callback(err);
        });
    });

    const names = ['Fit', 'Length', 'Comfort', 'Quality'];
    const insertCharacteristics = 'INSERT INTO characteristics (product_id, name) VALUES ($1, $2)';
    await keys.forEach((key, index) => {
      db.none(insertCharacteristics, [product_id, names[index]])
        .catch((err) => {
          callback(err);
        });
    });

    await callback(null);
  },

  // PUT a review as helpful
  // /reviews/:review_id/helpful
  putHelpful: async (review_id, callback) => {
    const helpfulCount = await db.one('SELECT helpfulness FROM reviews WHERE id = $1', [review_id])
      .catch((err) => {
        callback(err);
      });

    const newVal = helpfulCount.helpfulness + 1;

    db.none('UPDATE reviews SET helpfulness = $1 WHERE id = $2', [newVal, review_id])
      .then(() => {
        callback(null);
      })
      .catch((err) => {
        callback(err);
      });
  },

  // PUT a review
  // /reviews/:review_id/report
  putReport: (review_id, callback) => {
    db.none('UPDATE reviews SET reported = TRUE WHERE id = $1', [review_id])
      .then(() => {
        callback(null);
      })
      .catch((err) => {
        callback(err);
      });
  },
};
