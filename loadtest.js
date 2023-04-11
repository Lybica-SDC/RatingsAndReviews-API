import http from 'k6/http';
import { check } from 'k6';
import { randomIntBetween, randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
  vus: 1000,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests should complete within 500ms
    http_req_failed: ['rate<0.1'], // error rate should be less than 10%
  },
  discardResponseBodies: true,
//   stages: [
//     { duration: '30s', target: 50 },
//     { duration: '30s', target: 75 },
//     { duration: '30s', target: 100 },
//     { duration: '2m', target: 70 },
//     { duration: '30s', target: 50 },
//     { duration: '30s', target: 30 },
//   ],
};

export default function() {
  const prodID = randomIntBetween(999600, 1000000);
  const sortType = randomItem(['newest']);
  const req1 = {
    method: 'GET',
    url: `http://127.0.0.1:3000/reviews?product_id=${prodID}&count=5&sort=${sortType}`,
    name: 'getReviews',
  };

  const req2 = {
    method: 'GET',
    url: `http://127.0.0.1:3000/reviews/meta?product_id=${prodID}`,
    name: 'getMeta',
  };
  // const req3 = {
  //   method: 'POST',
  //   url: 'http://127.0.0.1:3000/reviews',
  //   body: {
  //     product_id: prodID,
  //     rating: 5,
  //     date: 12133423,
  //     summary: 'asdfasfasdfsadfsadfasdfsfsfasf',
  //     body: 'dafasdfsadfsadgdgsasdgasdgsaggasgflsalkfjlsjafljasfljalsfjlsafj;lafs',
  //     recommend: true,
  //     reviewer_name: 'test',
  //     reported: false,
  //     photos: ['urlplaceholder/review_5_photo_number_1.jpg', 'urlplaceholder/review_5_photo_number_2.jpg'],
  //     characteristics: {
  //       1: 1, 2: 2, 3: 3, 4: 4,
  //     },
  //     reviewer_email: 'test@email.com',
  //   },
  // };
  const batch = http.batch([req1, req2]);
  // httpbin.test.k6.io should return our POST data in the response body, so
  // we check the third response object to see that the POST worked.
  batch.forEach((test) => {
    check(test, {
      'is status 200': (r) => (r.status === 200),
    });

    console.log(`[${test.name}] ${test.timings.duration} ms`);
  });
}
