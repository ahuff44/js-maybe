const isNothing = Symbol('isNothing');

Symbol.isNothing = isNothing;

function Maybe (x) {

  return typeof x === 'undefined' || x === null ||
    (x[Symbol.isNothing] && x[Symbol.isNothing]() === true) ?
      Nothing() : Just(x);
}

function Just (x) {

  return {

    bind (fn) { return Maybe(fn.call(null, x)); },
    maybe (defx, fn) { return fn.call(null, x); },
    [Symbol.isNothing]() { return false; }
  };
}

function Nothing() {

  return {

    bind() { return this; },
    maybe (defx, fn) { return defx; },
    [Symbol.isNothing]() { return true; }
  };
}

export default Maybe;
