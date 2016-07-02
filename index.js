function Maybe (x) {
  if (typeof x === 'undefined' || x === null || (x.isNothing && x.isNothing() === true)) {
      return Nothing();
  } else if (x.isJust && x.isJust() === true) {
    return x.bind(x => x);
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
    toString() { return x.toString(); }
  };
}

function Nothing() {
  return {
    bind(fn) { return this; },
    valueOr(defx) { return defx; },
    isNothing() { return true; },
    isJust() { return false; },
    toString() { return ''; }
  };
}

module.exports = Maybe;