import assert from 'assert';
import Maybe from '../index';

function id (x) { return x; }
function dbl (x) { return x * x; }

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

  it('should ignore non-Maybe objects with a isNothing method on prototype', () => {
    Array.prototype.isNothing = function() {
      return this.length === 0;
    };
    const arr = [1, 2, 3];

    assert.equal(
      Maybe(arr).isJust(),
      true
    );

    assert.equal(
      Maybe(arr).isNothing(),
      false
    );

    assert.equal(
      Maybe([]).isJust(),
      true
    );

    assert.equal(
      Maybe([]).isNothing(),
      false
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
      Maybe(5).bind(id).valueOr(true),
      Maybe(id(5)).valueOr(false));
  });

  it('should have unit function (right identity)', () => {
    assert.equal(
      Maybe(5).bind(id).valueOr(true),
      Maybe(5).valueOr(false));
  });

  it('should have binding operation (associativity)', () => {
    assert.equal(
      Maybe(5).bind(id).bind(dbl).valueOr(true),
      Maybe(5).bind(x => dbl(id(x))).valueOr(false));
  });
});
