import assert from 'assert';
import Maybe from '../index';

function id (x) { return x; }
function dbl (x) { return x * x; }

Array.prototype[Symbol.isNothing] = function() {

  return this.length === 0;
};

const x = 1;
const arr = [1, 2, 3];

describe('Maybe', () => {

  it('should process values with Symbol.isNothing on prototype', () => {

    assert.equal(
      Maybe(arr).bind(([x, ...rest]) => x).maybe(true, id),
      arr[0]);

    assert.equal(
      Maybe([]).bind(([x, ...rest]) => x).maybe(true, id),
      true);
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
});
