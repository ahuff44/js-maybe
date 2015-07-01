# js-maybe
Maybe monad

## Installation

```
npm i js-maybe
```

## Usage

```javascript
var obj = {

  props: {
    prop: 'value'
  }
};

// instead of this
var value;

if (typeof obj === 'object' && obj.props && obj.props.prop) {

  value = obj.props.prop;
}
else { value = 'No value'; }

console.log(value); // 'value'

// you could write this
console.log(Maybe(obj)
  .bind(x => x.props)
  .bind(x => x.prop)
  .maybe('No value', x => x)); // 'value'
```

Bonus with [js-lenses](https://github.com/roman01la/js-lenses)

```javascript
console.log(Maybe(obj)
  .bind(x => L.get(L.ofPath('props', 'prop'), x))
  .maybe('No value', x => x))); // 'value'

console.log(Maybe(obj)
  .bind(x => L.get(L.ofPath('props', 'otherProp'), x))
  .maybe('No value', x => x))); // 'No value'
```
