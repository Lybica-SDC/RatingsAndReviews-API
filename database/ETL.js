const path = require('path');
// console.log(__dirname);
const transferReviews = async () => {
  const filePath = path.resolve(__dirname, './data/reviews.csv');
  console.log('file name: ', fileName);
  const queryString = `COPY reviews(id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness) FROM '${filePath}' DELIMITER ',' CSV HEADER;`

  try {
    await db.none(queryString);
    console.log('transfer reviews data complete')
  } catch (err) {
    console.log('error transfering reviews data: ', err);
  }


}

transferReviews();