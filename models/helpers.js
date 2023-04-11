const db = require('../database');

module.exports = {
  calculateRatings: (array) => {
    const ratingCount = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    array.forEach((obj) => {
      ratingCount[obj.rating] += 1;
    });

    return ratingCount;
  },

  totalRec: (array) => {
    const recCount = {
      false: 0,
      true: 0,
    };

    array.forEach((obj) => {
      if (obj.recommend === false) {
        recCount.false += 1;
      }

      if (obj.recommend === true) {
        recCount.true += 1;
      }
    });

    return recCount;
  },

  calculateChars: (array) => {
    const char = {};

    array.forEach((obj) => {
      if (char[obj.name] === undefined) {
        char[obj.name] = {};
      }

      if (char[obj.name].id === undefined) {
        char[obj.name].id = obj.characteristic_id;
      }

      if (char[obj.name].value === undefined) {
        char[obj.name].value = obj.value;
      } else {
        char[obj.name].value = (char[obj.name].value + obj.value) / 2;
      }
    });

    return char;
  },

  generateSort: (sort) => {
    let string = '';
    if (sort === 'newest') {
      string = 'ORDER BY reviews.date DESC';
    }

    if (sort === 'helpful') {
      string = 'ORDER BY reviews.helpfulness != null DESC';
    }

    if (sort === 'relevant') {
      string = 'ORDER BY reviews.date DESC, reviews.helpfulness != null DESC';
    }

    return string;
  },

  // generateNumber: (newProdID) => {

  // },
};
