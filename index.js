const isMaybe = Symbol('isMaybe');

function Maybe (x) {
  if (typeof x === 'undefined' || x === null) {
      return Nothing();
  } else if (x[isMaybe] === true) {
    return x;
  } else {
    return Just(x);
  }
}

function Just (x) {
  return {
    bind (fn) { return Maybe(fn.call(null, x)); },
    valueOr(defx) { return x; },
    isNothing() { return false; },
    isJust() { return true; },
    toString() { return x.toString(); },
    [isMaybe]: true
  };
}

function Nothing() {
  return {
    bind(fn) { return this; },
    valueOr(defx) { return defx; },
    isNothing() { return true; },
    isJust() { return false; },
    toString() { return ''; },
    [isMaybe]: true
  };
}

module.exports = Maybe;