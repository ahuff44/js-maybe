module.exports = function Maybe (x) {

  return typeof x === 'undefined' || x === null ||
    (x.isNothing && x.isNothing() === true) ?
      Nothing() : Just(x);
};

function Just (x) {

  return {

    bind (fn) { return Maybe(fn.call(null, x)); },
    maybe (defx, fn) { return fn.call(null, x); },
    fromJust() { return x; },
    isNothing() { return false; },
    isJust() { return true; },
    toString() { return x.toString(); },
    valueOf() { return x; }
  };
}

function Nothing() {

  return {

    bind() { return this; },
    maybe (defx, fn) { return defx; },
    fromJust() { return Nothing(); },
    isNothing() { return true; },
    isJust() { return false; },
    toString() { return ''; },
    valueOf() { return null; }
  };
}
