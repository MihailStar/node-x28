/* eslint-disable no-console */
const needle = require('needle');
const cheerio = require('cheerio');

const URL = 'https://www.skysports.com/premier-league-table';

needle('get', URL)
  .then((response) => {
    const $ = cheerio.load(response.body);
    const $rows = $('.standing-table__row').slice(1, 6);
    /** @type {Array<{name: string, games: string, pts: string}>} */
    let result = [];

    $rows.each((_, row) => {
      result = result.concat({
        name: $('.standing-table__cell:nth-child(2)', row).text().trim(),
        games: $('.standing-table__cell:nth-child(3)', row).text().trim(),
        pts: $('.standing-table__cell:nth-child(10)', row).text().trim(),
      });
    });

    console.info('Premier League Table');
    console.table(result);
  })
  .catch((error) => {
    console.error(error);
  });

// и https://github.com/caolan/async для многостраничного парсинга
