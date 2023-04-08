/* eslint-disable camelcase */
/* eslint-disable quotes */
const db = require('../database');
const helpers = require('./helpers');
// GET list of reviews
// /reviews/page/count/sort/product_id
module.exports = {
  getReviews: async (req, callback) => {
    let { page, count, product_id } = req;
    if (count === 'NaN') {
      count = 5;
    }
    if (page === undefined) {
      page = 1;
    }

    const queryResults = `SELECT id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, (SELECT json_agg(json_build_object('id', photos.id, 'url', photos.url)) FROM photos WHERE photos.review_id = reviews.id) AS photos FROM reviews WHERE reviews.product_id = $1 LIMIT $2`;

    // const photos = await db.many(queryPhotos);
    const results = await db.many(queryResults, [product_id, count]);
    results.forEach((res) => {
      if (res.photos === null) {
        res.photos = [];
      }
    });
    const review = await {
      product: product_id,
      page,
      count,
      results,
    };
    callback(null, review);
  },

  // GET review meta data
  // /reviews/meta/product_id
  getMeta: async (product_id, callback) => {
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
          console.log('err adding photos', err);
        });
    });

    // TODO: IMPLEMENT ADDING INTO CHAR_REVIEWS and CHARACTERISTICS

    const insertChar_reviews = 'INSERT INTO char_reviews (review_id, characteristic_id, value) VALUES ($1, $2, $3)';
    const keys = Object.keys(characteristics);
    const values = Object.values(characteristics);
    await keys.forEach((trait, index) => {
      db.none(insertChar_reviews, [reviewID, keys[index], values[index]])
        .catch((err) => {
          console.log(`could not add ${trait} to the char_reviews`, err);
        });
    });

    const names = ['Fit', 'Length', 'Comfort', 'Quality'];
    const insertCharacteristics = 'INSERT INTO characteristics (product_id, name) VALUES ($1, $2)';
    await keys.forEach((key, index) => {
      db.none(insertCharacteristics, [product_id, names[index]])
        .catch((err) => {
          console.log(`could not add ${key} to characteristics`, err);
        });
    });

    await callback(null);
  },

  // PUT a review as helpful
  // /reviews/:review_id/helpful
  putHelpful: async (data, callback) => {
    console.log('putHelpful models', data);
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
  putReport: (review_id, callback) => {
    db.none('UPDATE reviews SET reported = TRUE WHERE id = $1', [review_id])
      .then(() => {
        console.log('report successful');
        callback(null);
      })
      .catch((err) => {
        console.log('could not update reported');
        callback(err);
      });
  },
};
