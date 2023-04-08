const path = require('path');
const db = require('./index');

const transferIntoReviews = async () => {
  const filePath = path.resolve(__dirname, './data/reviews.csv');
  console.log('file name: ', filePath);
  const queryString = `COPY reviews(id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness) FROM '${filePath}' DELIMITER ',' CSV HEADER;`;

  try {
    await db.none(queryString);
    console.log('transfer reviews data complete');
  } catch (err) {
    console.log('error transfering reviews data: ', err);
  }
};

const transferIntoPhotos = async () => {
  // create a path to the photos CSV
  const photosPath = path.resolve(__dirname, './data/reviews_photos.csv');
  console.log('file name: ', photosPath);
  const queryString = `COPY photos(id, review_id, url) FROM '${photosPath}' DELIMITER ',' CSV HEADER;`;

  try {
    await db.none(queryString);
    console.log('transfer photos data complete');
  } catch (err) {
    console.log('error transfering reviews data: ', err);
  }
};

const transferCharacteristicReviews = async () => {
  // create a path to characteristic reviews
  const charReviewPath = path.resolve(__dirname, './data/characteristic_reviews.csv');
  console.log('file name: ', charReviewPath);
  const queryString = `COPY char_reviews(id,characteristic_id,review_id,value) FROM '${charReviewPath}' DELIMITER ',' CSV HEADER ALTER SEQUENCE photos_id_seq RETSART WITH (SELECT MAX(id) FROM photos);`;

  try {
    await db.none(queryString);
    console.log('transfer charReviews data complete');
  } catch (err) {
    console.log('error transfering charReviews data: ', err);
  }
};

const transferCharacteristics = async () => {
  // create a path to characteristics
  const characteristicPath = path.resolve(__dirname, './data/characteristics.csv');
  console.log('file name: ', characteristicPath);
  const queryString = `COPY characteristics(id,product_id,name) FROM '${characteristicPath}' DELIMITER ',' CSV HEADER;`;

  try {
    await db.none(queryString);
    console.log('transfer characteristics data complete');
  } catch (err) {
    console.log('error transfering characteristics data: ', err);
  }
};

// transferIntoReviews();
// transferCharacteristics();
transferIntoPhotos();
// transferCharacteristicReviews();
