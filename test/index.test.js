import assert from 'assert';
import Maybe from '../index';

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
      true
    );
  });

  it('should return Nothing on null', () => {
    assert.equal(
      Maybe(null).isNothing(),
      true
    );
  });

  it('should return Nothing on undefined', () => {
    assert.equal(
      Maybe(undefined).isNothing(),
      true
    );
  });

  it('should auto-reduce nested Maybes', () => {
    assert.equal(
      Maybe(Maybe(null)).isNothing(),
      true
    );

    assert.equal(
      Maybe(Maybe(5)).valueOr(null),
      5
    );
  });

  it('should process values with Symbol.isNothing on prototype', () => {
    assert.equal(
      Maybe(arr).bind(([x, ...rest]) => x).valueOr(true),
      arr[0]
    );

    assert.equal(
      Maybe([]).bind(([x, ...rest]) => x).valueOr(true),
      true
    );
  });
});

describe('Just', () => {
  it('bind should return Just', () => {
    assert.equal(
      Maybe(5).bind(id).isJust(),
      true
    );
  });

  it('valueOr should return value', () => {
    assert.equal(
      Maybe(5).valueOr(false),
      5
    );
  });

  it('isNothing should return false', () => {
    assert.equal(
      Maybe(5).isNothing(),
      false
    );
  });

  it('isJust should return true', () => {
    assert.equal(
      Maybe(5).isJust(),
      true
    );
  });

  it('toString should return stringified value', () => {
    assert.equal(
      Maybe(5).toString(),
      '5'
    );
  });
});

describe('Nothing', () => {
  it('bind should return Nothing', () => {
    assert.equal(
      Maybe(null).bind(id).isNothing(),
      true
    );
  });

  it('valueOr should return default value', () => {
    assert.equal(
      Maybe(null).valueOr(false),
      false
    );
  });

  it('isNothing should return true', () => {
    assert.equal(
      Maybe(null).isNothing(),
      true
    );
  });

  it('isJust should return false', () => {
    assert.equal(
      Maybe(null).isJust(),
      false
    );
  });

  it('toString should return empty string', () => {
    assert.equal(
      Maybe(null).toString(),
      ''
    );
  });
});

describe('laws', () => {
  it('should have type constructor (left identity)', () => {
    assert.equal(
      Maybe(x).bind(id).valueOr(true),
      Maybe(id(x)).valueOr(false));
  });

  it('should have unit function (right identity)', () => {
    assert.equal(
      Maybe(x).bind(id).valueOr(true),
      Maybe(x).valueOr(false));
  });

  it('should have binding operation (associativity)', () => {
    assert.equal(
      Maybe(x).bind(id).bind(dbl).valueOr(true),
      Maybe(x).bind(x => dbl(id(x))).valueOr(false));
  });
});
