import WebVitals from './main.js'
console.log(WebVitals, 'test');
const wv = new WebVitals();
console.log(wv, 'wv');

var runInContext = (function runInContext(context) {
  function lodash(value) {
    return new LodashWrapper(value)
  }
  return lodash
})

// NOTE: 借用原型继承
var baseCreate = (function() {
  function object() {}

  return function(proto) {
    if (!isObject(proto)) return {}

    if (objectCreate) {
      return objectCreate(proto)
    }

    object.prototype = proto
    var result = new Object
    object.prototype = undefined
    return result
  }
})

function isObject(value) {
  var type = typeof value
  return value != null && (type == 'object' || type == 'function')
}

function mixin(object, source, options) {
  var props = keys(source),
    methodNames = baseFunctions(source, props);

  if (options == null &&
    !(isObject(source) && (methodNames.length || !props.length))) {
      options = source;
      source = object;
      object = this;
      methodNames = baseFunctions(source, keys(source));
    }
}

function arrayPush(array, values) {
  var index = -1,
    length = values.length,
    offset = array.length

  while(++index < length) {
    array[offset + index] = values[index]
  }

  return array;
}
// 测试