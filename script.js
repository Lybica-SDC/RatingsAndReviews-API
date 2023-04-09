const http = require('k6/http');
const { sleep } = require('k6');

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  http.get('http://127.0.0.1:3000/reviews?product_id=40348&count=5&sort=relevant');
  sleep(1);
}

//k6 run --vus 10 --duration 30s script.js