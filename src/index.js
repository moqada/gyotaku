import cheerio from 'cheerio';
import request from 'superagent';

const GYOTAKU_HOST = 'http://megalodon.jp';
const GYOTAKU_URL_REGEX = /http:\/\/megalodon\.jp\/\d{4}-\d{4}-\d{4}-\d+\//;


/**
 * Gyotaku
 */
export default class Gyotaku {

  /**
   * constructor
   *
   * @param {string} url target URL
   */
  constructor(url) {
    this.url = url;
  }

  /**
   * take GYOTAKU
   *
   * @return {Promise<string, Object>}
   */
  take() {
    return new Promise((resolve, reject) => {
      request
      .post(`${GYOTAKU_HOST}/pc/get_simple/decide`)
      .type('form')
      .send({url: this.url})
      .redirects(0)
      .end((err, res) => {
        if (res.redirect && GYOTAKU_URL_REGEX.test(res.headers.location)) {
          resolve(res.headers.location);
        } else {
          reject(err || res);
        }
      });
    });
  }

  /**
   * list GYOTAKU URLs
   *
   * @return {Promise<string[], Object>}
   */
  list() {
    return new Promise((resolve, reject) => {
      request
        .get(`${GYOTAKU_HOST}/`)
        .query({url: this.url})
        .redirects(0)
        .end((err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(this.constructor.parseListHTML(res.text));
          }
        });
    });
  }

  /**
   * Return GYOTAKU URLs from HTML of list page
   *
   * @param {string} html html body
   * @return {string[]}
   */
  static parseListHTML(html) {
    const $ = cheerio.load(html);
    return $('.container')
      .find('a[id^=fish]')
      .map((idx, el) => $(el).attr('href'))
      .get()
      .filter((el, idx, array) => array.indexOf(el) === idx);
  }
}
