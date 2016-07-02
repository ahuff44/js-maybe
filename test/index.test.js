import assert from 'assert';
import Maybe from '../maybe';

function id (x) { return x; }
function dbl (x) { return x * x; }

Array.prototype.isNothing = function() {

  return this.length === 0;
};

const x = 1;
const arr = [1, 2, 3];

describe('Maybe', () => {

  it('should return Just', () => {

    assert.equal(
      Maybe(5).isJust(),
      true);
  });

  it('should return Nothing', () => {

    assert.equal(
      Maybe(null).isNothing(),
      true);
  });

  it('should process values with Symbol.isNothing on prototype', () => {

    assert.equal(
      Maybe(arr).bind(([x, ...rest]) => x).maybe(true, id),
      arr[0]);

    assert.equal(
      Maybe([]).bind(([x, ...rest]) => x).maybe(true, id),
      true);
  });
});

describe('Just', () => {

  it('bind should return Just', () => {

    assert.equal(
      Maybe(5).bind(id).isJust(),
      true);
  });

  it('maybe should return final value', () => {

    assert.equal(
      Maybe(5).maybe(false, id),
      5);
  });

  it('fromJust should return value', () => {

    assert.equal(
      Maybe(5).fromJust(),
      5);
  });

  it('[Symbol.isNothing] should return false', () => {

    assert.equal(
      Maybe(5).isNothing(),
      false);
  });

  it('[Symbol.isJust] should return true', () => {

    assert.equal(
      Maybe(5).isJust(),
      true);
  });

  it('toString should return stringified value', () => {

    assert.equal(
      Maybe(5).toString(),
      '5');
  });

  it('valueOf should return value', () => {

    assert.equal(
      Maybe(5).valueOf(),
      5);
  });
});

describe('Nothing', () => {

  it('bind should return Nothing', () => {

    assert.equal(
      Maybe(null).bind(id).toString(),
      '');
  });

  it('maybe should return default value', () => {

    assert.equal(
      Maybe(null).maybe(false, id),
      false);
  });

  it('fromJust should return Nothing', () => {

    assert.equal(
      Maybe(null).fromJust().toString(),
      '');
  });

  it('[Symbol.isNothing] should return true', () => {

    assert.equal(
      Maybe(null).isNothing(),
      true);
  });

  it('[Symbol.isJust] should return false', () => {

    assert.equal(
      Maybe(null).isJust(),
      false);
  });

  it('toString should return empty string', () => {

    assert.equal(
      Maybe(null).toString(),
      '');
  });

  it('valueOf should return null', () => {

    assert.equal(
      Maybe(null).valueOf(),
      null);
  });
});

describe('laws', () => {

  it('should have type constructor (left identity)', () => {

    assert.equal(
      Maybe(x).bind(id).maybe(true, id),
      Maybe(id(x)).maybe(false, id));
  });

  it('should have unit function (right identity)', () => {

    assert.equal(
      Maybe(x).bind(id).maybe(true, id),
      Maybe(x).maybe(false, id));
  });

  it('should have binding operation (associativity)', () => {

    assert.equal(
      Maybe(x).bind(id).bind(dbl).maybe(true, id),
      Maybe(x).bind(x => dbl(id(x))).maybe(false, id));
  });
});
