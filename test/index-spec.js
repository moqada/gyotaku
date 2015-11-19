import fs from 'fs';
import path from 'path';
import assert from 'power-assert';
import nock from 'nock';
import Gyotaku from '../src';

const FIXTURE_DIR = './test/fixtures';


/** @test {Gyotaku} */
describe('Gyotaku', () => {
  let mockServer = null;

  beforeEach(() => {
    mockServer = nock('http://megalodon.jp');
  });

  afterEach(() => {
    nock.cleanAll();
  });

  /** @test {Gyotaku#take} */
  it('#take()', () => {
    const expected = 'http://megalodon.jp/2007-1006-1745-56/google.com/';
    mockServer
      .post('/pc/get_simple/decide')
      .reply(302, '', {location: expected});
    return new Gyotaku('http://google.com').take().then(url => {
      assert(url === expected);
    });
  });

  /** @test {Gyotaku#list} */
  it('#list()', () => {
    const targetUrl = 'http://google.com';
    const response = fs.readFileSync(path.join(FIXTURE_DIR, 'list.html')).toString();
    mockServer
      .get('/')
      .query({url: targetUrl})
      .reply(200, response);
    return new Gyotaku(targetUrl).list().then(urls => {
      assert(urls.length === 121);
      assert(urls[0] === 'http://megalodon.jp/2007-1006-1745-56/google.com/');
    });
  });

  /** @test {Gyotaku.parseListHTML} */
  it('.parseListHTML()', () => {
    const ret = Gyotaku.parseListHTML(fs.readFileSync(path.join(FIXTURE_DIR, 'list.html')));
    assert(ret.length === 121);
    assert(ret[0] === 'http://megalodon.jp/2007-1006-1745-56/google.com/');
  });
});
