/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 492);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(60);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(116);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(25)))

/***/ }),

/***/ 116:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(25), __webpack_require__(59)))

/***/ }),

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);
var bind = __webpack_require__(60);
var Axios = __webpack_require__(118);
var mergeConfig = __webpack_require__(66);
var defaults = __webpack_require__(63);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(67);
axios.CancelToken = __webpack_require__(132);
axios.isCancel = __webpack_require__(62);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(133);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);
var buildURL = __webpack_require__(61);
var InterceptorManager = __webpack_require__(119);
var dispatchRequest = __webpack_require__(120);
var mergeConfig = __webpack_require__(66);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);
var transformData = __webpack_require__(121);
var isCancel = __webpack_require__(62);
var defaults = __webpack_require__(63);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(65);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(126);
var combineURLs = __webpack_require__(127);

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ 129:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);
var isValidXss = __webpack_require__(130);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (isValidXss(url)) {
          throw new Error('URL contains XSS injection attempt');
        }

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Generate a string containing static keys from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "production" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "production" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (false) { var repeat, classify, classifyRE, hasConsole; }

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if (false) {}
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (false) {}
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (false
  ) {}
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     false && false;
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (false
  ) {}
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     false && false;
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (false) {}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       false && false;

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     false && false;
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (false) {}
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "production" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (false) {}
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (false) {}
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (false) {}
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (false) {}

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (false) {}
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    false
  ) {}
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (false) {}
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (false) {}
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var isUsingMicroTask = false;

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

if (false) { var perf; }

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (false) { var getHandler, hasHandler, isBuiltInModifier, hasProxy, warnReservedPrefix, warnNonPresent, allowedGlobals; }

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       false && false;
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (false) { var keyInLowerCase; }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (false) {} else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (false) {}
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (false) {}
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       false && false;
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       false && false;
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if (false) {}
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (false) {}
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (false) {}
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     false && false;
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (false
  ) {}
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if (false) {}
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (false) {} else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (false) {} else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (false) {}
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       false && false;
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 false
                  ? (undefined)
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (false) { var lowerCaseEvent; }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (false) {}
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (false) {} else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (false) {}

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (false) {}
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (false) {}
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (false) {}
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if (false) {}
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  false
    ? undefined
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       false && false;
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (false) { var hyphenatedKey; } else {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     false && false;
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (false) {}
    if (props && hasOwn(props, key)) {
       false && false;
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (false) {}

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (false) {}
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if (false) {}
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (false) {}
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (false) {}
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (false) {}

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (false) {} else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (false) {}

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if (false
  ) {}
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (false) {}

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (false) {}
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (false) {}
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false'
    ? 'false'
    // allow arbitrary string value for contenteditable
    : key === 'contenteditable' && isValidContentEditableValue(value)
      ? value
      : 'true'
};

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
       false && false;
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (false) {}

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (false) {}
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (false) {}
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (false) {}

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (
    oldVnode,
    vnode,
    insertedVnodeQueue,
    ownerArray,
    index,
    removeOnly
  ) {
    if (oldVnode === vnode) {
      return
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (false) {}
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (false) {}
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (false
              ) {}
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (false
              ) {}
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (false) {}
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && value !== '' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
  }
}

/*  */



/* eslint-disable no-unused-vars */
function baseWarn (msg, range) {
  console.error(("[Vue compiler]: " + msg));
}
/* eslint-enable no-unused-vars */

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value, range, dynamic) {
  (el.props || (el.props = [])).push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
  el.plain = false;
}

function addAttr (el, name, value, range, dynamic) {
  var attrs = dynamic
    ? (el.dynamicAttrs || (el.dynamicAttrs = []))
    : (el.attrs || (el.attrs = []));
  attrs.push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value, range) {
  el.attrsMap[name] = value;
  el.attrsList.push(rangeSetItem({ name: name, value: value }, range));
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  isDynamicArg,
  modifiers,
  range
) {
  (el.directives || (el.directives = [])).push(rangeSetItem({
    name: name,
    rawName: rawName,
    value: value,
    arg: arg,
    isDynamicArg: isDynamicArg,
    modifiers: modifiers
  }, range));
  el.plain = false;
}

function prependModifierMarker (symbol, name, dynamic) {
  return dynamic
    ? ("_p(" + name + ",\"" + symbol + "\")")
    : symbol + name // mark the event as captured
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn,
  range,
  dynamic
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    false
  ) {}

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (modifiers.right) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'contextmenu':(" + name + ")";
    } else if (name === 'click') {
      name = 'contextmenu';
      delete modifiers.right;
    }
  } else if (modifiers.middle) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'mouseup':(" + name + ")";
    } else if (name === 'click') {
      name = 'mouseup';
    }
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = prependModifierMarker('!', name, dynamic);
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = prependModifierMarker('~', name, dynamic);
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = prependModifierMarker('&', name, dynamic);
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = rangeSetItem({ value: value.trim(), dynamic: dynamic }, range);
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getRawBindingAttr (
  el,
  name
) {
  return el.rawAttrsMap[':' + name] ||
    el.rawAttrsMap['v-bind:' + name] ||
    el.rawAttrsMap[name]
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

function getAndRemoveAttrByRegex (
  el,
  name
) {
  var list = el.attrsList;
  for (var i = 0, l = list.length; i < l; i++) {
    var attr = list[i];
    if (name.test(attr.name)) {
      list.splice(i, 1);
      return attr
    }
  }
}

function rangeSetItem (
  item,
  range
) {
  if (range) {
    if (range.start != null) {
      item.start = range.start;
    }
    if (range.end != null) {
      item.end = range.end;
    }
  }
  return item
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
      "? " + baseValueExpression + ".trim()" +
      ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: JSON.stringify(value),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len, str, chr, index$1, expressionPos, expressionEndPos;



function parseModel (val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (false) {}

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (false) {}

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
      "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  if (false) { var binding, typeBinding, value$1; }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1 (event, handler, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

// #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.
var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1 (
  name,
  handler,
  capture,
  passive
) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;
    handler = original._wrapper = function (e) {
      if (
        // no bubbling, should always fire.
        // this is just a safety net in case event.timeStamp is unreliable in
        // certain weird environments...
        e.target === e.currentTarget ||
        // event is fired after handler attachment
        e.timeStamp >= attachedTimestamp ||
        // bail for environments that have buggy event.timeStamp implementations
        // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
        // #9681 QtWebEngine event.timeStamp is negative value
        e.timeStamp <= 0 ||
        // #9448 bail if event is fired in another document in a multi-page
        // electron/nw.js app, since event.timeStamp will be using a different
        // starting reference
        e.target.ownerDocument !== document
      ) {
        return original.apply(this, arguments)
      }
    };
  }
  target$1.addEventListener(
    name,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  name,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    name,
    handler._wrapper || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

var svgContainer;

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;
      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }
      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if (
      // skip the update if old and new VDOM state is the same.
      // `value` is handled separately because the DOM value may be temporarily
      // out of sync with VDOM state due to focus, composition and modifiers.
      // This  #4521 by skipping the unnecesarry `checked` update.
      cur !== oldProps[key]
    ) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

var whitespaceRE = /\s+/;

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  // JSDOM may return undefined for transition properties
  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

// Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors
function toMs (s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (false) {}

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (false) {}

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
     false && false;
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };

var isVShowDirective = function (d) { return d.name === 'show'; };

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(isNotTextNode);
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (false) {}

    var mode = this.mode;

    // warn invalid mode
    if (false
    ) {}

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  beforeMount: function beforeMount () {
    var this$1 = this;

    var update = this._update;
    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1);
      // force removing pass
      this$1.__patch__(
        this$1._vnode,
        this$1.kept,
        false, // hydrating
        true // removeOnly (!important, avoids unnecessary moves)
      );
      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (false) { var name, opts; }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (e && e.target !== el) {
            return
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if (
        false
      ) {}
    }
    if (false
    ) {}
  }, 0);
}

/*  */

var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (false) { var res; }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (false) { var res; }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + (unicodeRegExp.source) + "]*";
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being passed as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t',
  '&#39;': "'"
};
var encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3);
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
      }

      if (textEnd < 0) {
        text = html;
      }

      if (text) {
        advance(text.length);
      }

      if (options.chars && text) {
        options.chars(text, index - text.length, index);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (false) {}
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
        attr.start = index;
        advance(attr[0].length);
        attr.end = index;
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
      if (false) {}
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    // Find the closest opened tag of the same type
    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (false
        ) {}
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:|^#/;
var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;
var dynamicArgRE = /^\[.*\]$/;

var argRE = /:(.*)$/;
var bindRE = /^:|^\.|^v-bind:/;
var modifierRE = /\.[^.\]]+(?=[^\]]*$)/g;

var slotRE = /^v-slot(:|$)|^#/;

var lineBreakRE = /[\r\n]/;
var whitespaceRE$1 = /\s+/g;

var invalidAttributeRE = /[\s"'<>\/=]/;

var decodeHTMLCached = cached(he.decode);

var emptySlotScopeToken = "_empty_";

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;
var maybeComponent;

function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    rawAttrsMap: {},
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;
  var isReservedTag = options.isReservedTag || no;
  maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var whitespaceOption = options.whitespace;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg, range) {
    if (!warned) {
      warned = true;
      warn$2(msg, range);
    }
  }

  function closeElement (element) {
    trimEndingWhitespace(element);
    if (!inVPre && !element.processed) {
      element = processElement(element, options);
    }
    // tree management
    if (!stack.length && element !== root) {
      // allow root elements with v-if, v-else-if and v-else
      if (root.if && (element.elseif || element.else)) {
        if (false) {}
        addIfCondition(root, {
          exp: element.elseif,
          block: element
        });
      } else if (false) {}
    }
    if (currentParent && !element.forbidden) {
      if (element.elseif || element.else) {
        processIfConditions(element, currentParent);
      } else {
        if (element.slotScope) {
          // scoped slot
          // keep it in the children list so that v-else(-if) conditions can
          // find it as the prev node.
          var name = element.slotTarget || '"default"'
          ;(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        }
        currentParent.children.push(element);
        element.parent = currentParent;
      }
    }

    // final children cleanup
    // filter out scoped slots
    element.children = element.children.filter(function (c) { return !(c).slotScope; });
    // remove trailing whitespace node again
    trimEndingWhitespace(element);

    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  function trimEndingWhitespace (el) {
    // remove trailing whitespace node
    if (!inPre) {
      var lastNode;
      while (
        (lastNode = el.children[el.children.length - 1]) &&
        lastNode.type === 3 &&
        lastNode.text === ' '
      ) {
        el.children.pop();
      }
    }
  }

  function checkRootConstraints (el) {
    if (el.tag === 'slot' || el.tag === 'template') {
      warnOnce(
        "Cannot use <" + (el.tag) + "> as component root element because it may " +
        'contain multiple nodes.',
        { start: el.start }
      );
    }
    if (el.attrsMap.hasOwnProperty('v-for')) {
      warnOnce(
        'Cannot use v-for on stateful component root element because ' +
        'it renders multiple elements.',
        el.rawAttrsMap['v-for']
      );
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    outputSourceRange: options.outputSourceRange,
    start: function start (tag, attrs, unary, start$1, end) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (false) {}

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
         false && false;
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
      }

      if (!root) {
        root = element;
        if (false) {}
      }

      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end (tag, start, end$1) {
      var element = stack[stack.length - 1];
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      if (false) {}
      closeElement(element);
    },

    chars: function chars (text, start, end) {
      if (!currentParent) {
        if (false) {}
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      if (inPre || text.trim()) {
        text = isTextTag(currentParent) ? text : decodeHTMLCached(text);
      } else if (!children.length) {
        // remove the whitespace-only node right after an opening tag
        text = '';
      } else if (whitespaceOption) {
        if (whitespaceOption === 'condense') {
          // in condense mode, remove the whitespace node if it contains
          // line break, otherwise condense to a single space
          text = lineBreakRE.test(text) ? '' : ' ';
        } else {
          text = ' ';
        }
      } else {
        text = preserveWhitespace ? ' ' : '';
      }
      if (text) {
        if (!inPre && whitespaceOption === 'condense') {
          // condense consecutive whitespaces into single space
          text = text.replace(whitespaceRE$1, ' ');
        }
        var res;
        var child;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          child = {
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          };
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          child = {
            type: 3,
            text: text
          };
        }
        if (child) {
          if (false) {}
          children.push(child);
        }
      }
    },
    comment: function comment (text, start, end) {
      // adding anyting as a sibling to the root node is forbidden
      // comments should still be allowed, but ignored
      if (currentParent) {
        var child = {
          type: 3,
          text: text,
          isComment: true
        };
        if (false) {}
        currentParent.children.push(child);
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var list = el.attrsList;
  var len = list.length;
  if (len) {
    var attrs = el.attrs = new Array(len);
    for (var i = 0; i < len; i++) {
      attrs[i] = {
        name: list[i].name,
        value: JSON.stringify(list[i].value)
      };
      if (list[i].start != null) {
        attrs[i].start = list[i].start;
        attrs[i].end = list[i].end;
      }
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (
  element,
  options
) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = (
    !element.key &&
    !element.scopedSlots &&
    !element.attrsList.length
  );

  processRef(element);
  processSlotContent(element);
  processSlotOutlet(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
  return element
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if (false) { var parent, iterator; }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else if (false) {}
  }
}



function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '').trim();
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (false) {}
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (false) {}
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

// handle content being passed to a component as slot,
// e.g. <template slot="xxx">, <div slot-scope="xxx">
function processSlotContent (el) {
  var slotScope;
  if (el.tag === 'template') {
    slotScope = getAndRemoveAttr(el, 'scope');
    /* istanbul ignore if */
    if (false) {}
    el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
  } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
    /* istanbul ignore if */
    if (false) {}
    el.slotScope = slotScope;
  }

  // slot="xxx"
  var slotTarget = getBindingAttr(el, 'slot');
  if (slotTarget) {
    el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    el.slotTargetDynamic = !!(el.attrsMap[':slot'] || el.attrsMap['v-bind:slot']);
    // preserve slot as an attribute for native shadow DOM compat
    // only for non-scoped slots.
    if (el.tag !== 'template' && !el.slotScope) {
      addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'));
    }
  }

  // 2.6 v-slot syntax
  {
    if (el.tag === 'template') {
      // v-slot on <template>
      var slotBinding = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding) {
        if (false) {}
        var ref = getSlotName(slotBinding);
        var name = ref.name;
        var dynamic = ref.dynamic;
        el.slotTarget = name;
        el.slotTargetDynamic = dynamic;
        el.slotScope = slotBinding.value || emptySlotScopeToken; // force it into a scoped slot for perf
      }
    } else {
      // v-slot on component, denotes default slot
      var slotBinding$1 = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding$1) {
        if (false) {}
        // add the component's children to its default slot
        var slots = el.scopedSlots || (el.scopedSlots = {});
        var ref$1 = getSlotName(slotBinding$1);
        var name$1 = ref$1.name;
        var dynamic$1 = ref$1.dynamic;
        var slotContainer = slots[name$1] = createASTElement('template', [], el);
        slotContainer.slotTarget = name$1;
        slotContainer.slotTargetDynamic = dynamic$1;
        slotContainer.children = el.children.filter(function (c) {
          if (!c.slotScope) {
            c.parent = slotContainer;
            return true
          }
        });
        slotContainer.slotScope = slotBinding$1.value || emptySlotScopeToken;
        // remove children as they are returned from scopedSlots now
        el.children = [];
        // mark el non-plain so data gets generated
        el.plain = false;
      }
    }
  }
}

function getSlotName (binding) {
  var name = binding.name.replace(slotRE, '');
  if (!name) {
    if (binding.name[0] !== '#') {
      name = 'default';
    } else if (false) {}
  }
  return dynamicArgRE.test(name)
    // dynamic [name]
    ? { name: name.slice(1, -1), dynamic: true }
    // static name
    : { name: ("\"" + name + "\""), dynamic: false }
}

// handle <slot/> outlets
function processSlotOutlet (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (false) {}
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, syncGen, isDynamic;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name.replace(dirRE, ''));
      // support .foo shorthand syntax for the .prop modifier
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        if (
          false
        ) {}
        if (modifiers) {
          if (modifiers.prop && !isDynamic) {
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel && !isDynamic) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            syncGen = genAssignmentCode(value, "$event");
            if (!isDynamic) {
              addHandler(
                el,
                ("update:" + (camelize(name))),
                syncGen,
                null,
                false,
                warn$2,
                list[i]
              );
              if (hyphenate(name) !== camelize(name)) {
                addHandler(
                  el,
                  ("update:" + (hyphenate(name))),
                  syncGen,
                  null,
                  false,
                  warn$2,
                  list[i]
                );
              }
            } else {
              // handler w/ dynamic event name
              addHandler(
                el,
                ("\"update:\"+(" + name + ")"),
                syncGen,
                null,
                false,
                warn$2,
                list[i],
                true // dynamic
              );
            }
          }
        }
        if ((modifiers && modifiers.prop) || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value, list[i], isDynamic);
        } else {
          addAttr(el, name, value, list[i], isDynamic);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        addHandler(el, name, value, modifiers, false, warn$2, list[i], isDynamic);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        isDynamic = false;
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
          if (dynamicArgRE.test(arg)) {
            arg = arg.slice(1, -1);
            isDynamic = true;
          }
        }
        addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i]);
        if (false) {}
      }
    } else {
      // literal attribute
      if (false) { var res; }
      addAttr(el, name, JSON.stringify(value), list[i]);
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true', list[i]);
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      false
    ) {}
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead.",
        el.rawAttrsMap['v-model']
      );
    }
    _el = _el.parent;
  }
}

/*  */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (!map['v-model']) {
      return
    }

    var typeBinding;
    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type');
    }
    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = "(" + (map['v-bind']) + ").type";
    }

    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$1 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"), dir);
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"), dir);
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/;
var fnInvokeRE = /\([^)]*?\);*$/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// KeyboardEvent.key aliases
var keyNames = {
  // #7880: IE11 and Edge use `Esc` for Escape key name.
  esc: ['Esc', 'Escape'],
  tab: 'Tab',
  enter: 'Enter',
  // #9112: IE11 uses `Spacebar` for Space key name.
  space: [' ', 'Spacebar'],
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  // #9112: IE11 uses `Del` for Delete key name.
  'delete': ['Backspace', 'Delete', 'Del']
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative
) {
  var prefix = isNative ? 'nativeOn:' : 'on:';
  var staticHandlers = "";
  var dynamicHandlers = "";
  for (var name in events) {
    var handlerCode = genHandler(events[name]);
    if (events[name] && events[name].dynamic) {
      dynamicHandlers += name + "," + handlerCode + ",";
    } else {
      staticHandlers += "\"" + name + "\":" + handlerCode + ",";
    }
  }
  staticHandlers = "{" + (staticHandlers.slice(0, -1)) + "}";
  if (dynamicHandlers) {
    return prefix + "_d(" + staticHandlers + ",[" + (dynamicHandlers.slice(0, -1)) + "])"
  } else {
    return prefix + staticHandlers
  }
}

function genHandler (handler) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);
  var isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ''));

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    return ("function($event){" + (isFunctionInvocation ? ("return " + (handler.value)) : handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? ("return " + (handler.value) + "($event)")
      : isFunctionExpression
        ? ("return (" + (handler.value) + ")($event)")
        : isFunctionInvocation
          ? ("return " + (handler.value))
          : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return (
    // make sure the key filters only apply to KeyboardEvents
    // #9441: can't use 'keyCode' in $event because Chrome autofill fires fake
    // key events that do not have keyCode property...
    "if(!$event.type.indexOf('key')&&" +
    (keys.map(genFilterCode).join('&&')) + ")return null;"
  )
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(keyCode)) + "," +
    "$event.key," +
    "" + (JSON.stringify(keyName)) +
    ")"
  )
}

/*  */

function on (el, dir) {
  if (false) {}
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */





var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
  this.pre = false;
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre;
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data;
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        data = genData$2(el, state);
      }

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  // Some elements (templates) need to behave differently inside of a v-pre
  // node.  All pre nodes are static roots, so we can use this as a location to
  // wrap a state change and reset it upon exiting the pre node.
  var originalPreState = state.pre;
  if (el.pre) {
    state.pre = el.pre;
  }
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  state.pre = originalPreState;
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
       false && false;
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (false
  ) {}

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:" + (genProps(el.attrs)) + ",";
  }
  // DOM props
  if (el.props) {
    data += "domProps:" + (genProps(el.props)) + ",";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el, el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind dynamic argument wrap
  // v-bind with dynamic arguments must be applied using the same v-bind object
  // merge helper so that class/style/mustUseProp attrs are handled correctly.
  if (el.dynamicAttrs) {
    data = "_b(" + data + ",\"" + (el.tag) + "\"," + (genProps(el.dynamicAttrs)) + ")";
  }
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:" + (dir.isDynamicArg ? dir.arg : ("\"" + (dir.arg) + "\""))) : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if (false) {}
  if (ast && ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  el,
  slots,
  state
) {
  // by default scoped slots are considered "stable", this allows child
  // components with only scoped slots to skip forced updates from parent.
  // but in some cases we have to bail-out of this optimization
  // for example if the slot contains dynamic names, has v-if or v-for on them...
  var needsForceUpdate = el.for || Object.keys(slots).some(function (key) {
    var slot = slots[key];
    return (
      slot.slotTargetDynamic ||
      slot.if ||
      slot.for ||
      containsSlotChild(slot) // is passing down slot from parent which may be dynamic
    )
  });

  // #9534: if a component with scoped slots is inside a conditional branch,
  // it's possible for the same component to be reused but with different
  // compiled slot content. To avoid that, we generate a unique key based on
  // the generated code of all the slot contents.
  var needsKey = !!el.if;

  // OR when it is inside another scoped slot or v-for (the reactivity may be
  // disconnected due to the intermediate scope variable)
  // #9438, #9506
  // TODO: this can be further optimized by properly analyzing in-scope bindings
  // and skip force updating ones that do not actually use scope variables.
  if (!needsForceUpdate) {
    var parent = el.parent;
    while (parent) {
      if (
        (parent.slotScope && parent.slotScope !== emptySlotScopeToken) ||
        parent.for
      ) {
        needsForceUpdate = true;
        break
      }
      if (parent.if) {
        needsKey = true;
      }
      parent = parent.parent;
    }
  }

  var generatedSlots = Object.keys(slots)
    .map(function (key) { return genScopedSlot(slots[key], state); })
    .join(',');

  return ("scopedSlots:_u([" + generatedSlots + "]" + (needsForceUpdate ? ",null,true" : "") + (!needsForceUpdate && needsKey ? (",null,false," + (hash(generatedSlots))) : "") + ")")
}

function hash(str) {
  var hash = 5381;
  var i = str.length;
  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return hash >>> 0
}

function containsSlotChild (el) {
  if (el.type === 1) {
    if (el.tag === 'slot') {
      return true
    }
    return el.children.some(containsSlotChild)
  }
  return false
}

function genScopedSlot (
  el,
  state
) {
  var isLegacySyntax = el.attrsMap['slot-scope'];
  if (el.if && !el.ifProcessed && !isLegacySyntax) {
    return genIf(el, state, genScopedSlot, "null")
  }
  if (el.for && !el.forProcessed) {
    return genFor(el, state, genScopedSlot)
  }
  var slotScope = el.slotScope === emptySlotScopeToken
    ? ""
    : String(el.slotScope);
  var fn = "function(" + slotScope + "){" +
    "return " + (el.tag === 'template'
      ? el.if && isLegacySyntax
        ? ("(" + (el.if) + ")?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  // reverse proxy v-slot without scope on this.$slots
  var reverseProxy = slotScope ? "" : ",proxy:true";
  return ("{key:" + (el.slotTarget || "\"default\"") + ",fn:" + fn + reverseProxy + "}")
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      var normalizationType = checkSkip
        ? state.maybeComponent(el$1) ? ",1" : ",0"
        : "";
      return ("" + ((altGenElement || genElement)(el$1, state)) + normalizationType)
    }
    var normalizationType$1 = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType$1 ? ("," + normalizationType$1) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } else if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs || el.dynamicAttrs
    ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(function (attr) { return ({
        // slot props are camelized
        name: camelize(attr.name),
        value: attr.value,
        dynamic: attr.dynamic
      }); }))
    : null;
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var staticProps = "";
  var dynamicProps = "";
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    var value = transformSpecialNewlines(prop.value);
    if (prop.dynamic) {
      dynamicProps += (prop.name) + "," + value + ",";
    } else {
      staticProps += "\"" + (prop.name) + "\":" + value + ",";
    }
  }
  staticProps = "{" + (staticProps.slice(0, -1)) + "}";
  if (dynamicProps) {
    return ("_d(" + staticProps + ",[" + (dynamicProps.slice(0, -1)) + "])")
  } else {
    return staticProps
  }
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */



// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast, warn) {
  if (ast) {
    checkNode(ast, warn);
  }
}

function checkNode (node, warn) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          var range = node.rawAttrsMap[name];
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), warn, range);
          } else if (name === 'v-slot' || name[0] === '#') {
            checkFunctionParameterExpression(value, (name + "=\"" + value + "\""), warn, range);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), warn, range);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), warn, range);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], warn);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, warn, node);
  }
}

function checkEvent (exp, text, warn, range) {
  var stripped = exp.replace(stripStringRE, '');
  var keywordMatch = stripped.match(unaryOperatorsRE);
  if (keywordMatch && stripped.charAt(keywordMatch.index - 1) !== '$') {
    warn(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim()),
      range
    );
  }
  checkExpression(exp, text, warn, range);
}

function checkFor (node, text, warn, range) {
  checkExpression(node.for || '', text, warn, range);
  checkIdentifier(node.alias, 'v-for alias', text, warn, range);
  checkIdentifier(node.iterator1, 'v-for iterator', text, warn, range);
  checkIdentifier(node.iterator2, 'v-for iterator', text, warn, range);
}

function checkIdentifier (
  ident,
  type,
  text,
  warn,
  range
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      warn(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())), range);
    }
  }
}

function checkExpression (exp, text, warn, range) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      warn(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim()),
        range
      );
    } else {
      warn(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n",
        range
      );
    }
  }
}

function checkFunctionParameterExpression (exp, text, warn, range) {
  try {
    new Function(exp, '');
  } catch (e) {
    warn(
      "invalid function parameter expression: " + (e.message) + " in\n\n" +
      "    " + exp + "\n\n" +
      "  Raw expression: " + (text.trim()) + "\n",
      range
    );
  }
}

/*  */

var range = 2;

function generateCodeFrame (
  source,
  start,
  end
) {
  if ( start === void 0 ) start = 0;
  if ( end === void 0 ) end = source.length;

  var lines = source.split(/\r?\n/);
  var count = 0;
  var res = [];
  for (var i = 0; i < lines.length; i++) {
    count += lines[i].length + 1;
    if (count >= start) {
      for (var j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) { continue }
        res.push(("" + (j + 1) + (repeat$1(" ", 3 - String(j + 1).length)) + "|  " + (lines[j])));
        var lineLength = lines[j].length;
        if (j === i) {
          // push underline
          var pad = start - (count - lineLength) + 1;
          var length = end > count ? lineLength - pad : end - start;
          res.push("   |  " + repeat$1(" ", pad) + repeat$1("^", length));
        } else if (j > i) {
          if (end > count) {
            var length$1 = Math.min(end - count, lineLength);
            res.push("   |  " + repeat$1("^", length$1));
          }
          count += lineLength + 1;
        }
      }
      break
    }
  }
  return res.join('\n')
}

function repeat$1 (str, n) {
  var result = '';
  if (n > 0) {
    while (true) { // eslint-disable-line
      if (n & 1) { result += str; }
      n >>>= 1;
      if (n <= 0) { break }
      str += str;
    }
  }
  return result
}

/*  */



function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    if (false) {}

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (false) {}

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (false) {}

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];

      var warn = function (msg, range, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        if (false) { var leadingSpaceLength; }
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      finalOptions.warn = warn;

      var compiled = baseCompile(template.trim(), finalOptions);
      if (false) {}
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compile = ref$1.compile;
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
     false && false;
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (false) {}
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (false) {}
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (false) {}

      var ref = compileToFunctions(template, {
        outputSourceRange: "production" !== 'production',
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (false) {}
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions;

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(25), __webpack_require__(115).setImmediate))

/***/ }),

/***/ 130:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isValidXss(requestURL) {
  var xssRegex = /(\b)(on\w+)=|javascript|(<\s*)(\/*)script/gi;
  return xssRegex.test(requestURL);
};



/***/ }),

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(67);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e(__webpack_require__(13)):undefined}(window,function(e){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/dist/",n(n.s=130)}({0:function(t,e,n){"use strict";function i(t,e,n,i,o,r,a,A){var s,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=n,c._compiled=!0),i&&(c.functional=!0),r&&(c._scopeId="data-v-"+r),a?(s=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},c._ssrRegister=s):o&&(s=A?function(){o.call(this,this.$root.$options.shadowRoot)}:o),s)if(c.functional){c._injectStyles=s;var l=c.render;c.render=function(t,e){return s.call(e),l(t,e)}}else{var u=c.beforeCreate;c.beforeCreate=u?[].concat(u,s):[s]}return{exports:t,options:c}}n.d(e,"a",function(){return i})},1:function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||"",i=t[3];if(!i)return n;if(e&&"function"==typeof btoa){var o=(a=i,A=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(A),"/*# ".concat(s," */")),r=i.sources.map(function(t){return"/*# sourceURL=".concat(i.sourceRoot).concat(t," */")});return[n].concat(r).concat([o]).join("\n")}var a,A,s;return[n].join("\n")}(e,t);return e[2]?"@media ".concat(e[2],"{").concat(n,"}"):n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var i={},o=0;o<this.length;o++){var r=this[o][0];null!=r&&(i[r]=!0)}for(var a=0;a<t.length;a++){var A=t[a];null!=A[0]&&i[A[0]]||(n&&!A[2]?A[2]=n:n&&(A[2]="(".concat(A[2],") and (").concat(n,")")),e.push(A))}},e}},10:function(t,e){t.exports="data:application/vnd.ms-fontobject;base64,UgoAAIgJAAABAAIAAAAAAAIABQMAAAAAAAABQJABAAAAAExQAAAAABAAAAAAAAAAAAAAAAAAAAEAAAAA96LQiQAAAAAAAAAAAAAAAAAAAAAAACgAAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0AZQA1ADYAYQAxADIAMQAAAAAAABYAAFYAZQByAHMAaQBvAG4AIAAxAC4AMAAAKAAAaQBjAG8AbgBmAG8AbgB0AC0AdgB1AGUALQBlADUANgBhADEAMgAxAAAAAAABAAAACgCAAAMAIE9TLzJ045CIAAAArAAAAGBjbWFw6iTrvAAAAQwAAAFKZ2x5ZnQFn1kAAAJYAAADPGhlYWQm5i6+AAAFlAAAADZoaGVhJxwTgAAABcwAAAAkaG10eBOHAAAAAAXwAAAAGmxvY2EDmgSgAAAGDAAAABhtYXhwARgAVwAABiQAAAAgbmFtZdjPeAgAAAZEAAACpnBvc3T7yw12AAAI7AAAAJwABBOIAZAABQAADGUNrAAAArwMZQ2sAAAJYAD1BQoAAAIABQMAAAAAAAAAAAAAEAAAAAAAAAAAAAAAUGZFZABA6gHqCxOIAAABwhOIAAAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQAAAAAARAADAAEAAAAcAAQAKAAAAAYABAABAALqBuoL//8AAOoB6gf//xYAFf8AAQAAAAAAAAAAAQYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAA6mD0MABQALAAAJAhEJBBEJAQ6m+oIFfvu6BEb6gvqCBX77ugRGD0L6gvqCATgERgRGATj6gvqCATgERgRGAAEAAAAADW4SUAAFAAAJAREJAREGGwdT93QIjAnE+K3+yAiLCIz+xwACAAAAAA/fD0MABQALAAAJAhEJBBEJAQTiBX76ggRG+7oFfgV/+oEERvu6BEYFfgV+/sj7uvu6/sgFfgV+/sj7uvu6AAEAAAAADqYSUAAFAAAJAREJARENbvitCIv3dQnEB1MBOfd093UBOAABAAAAABEXERcACwAACQsRF/3t+sD6wP3tBUD6wAITBUAFQAIT+sAEhP3tBUD6wAITBUAFQAIT+sAFQP3t+sAAAf//AAATkxLsADMAAAEiBw4BFxYXASEmBwYHBgcGFBcWFxYXFjchAQYHBhcWFx4BFxYXFjc2NwE2NzYnJicBLgEKYGVPSkYQEkgF1/HgTT46KScUFBQUJyk6Pk0OIPopNxoYAwMbGVY1Nzs+Oj81B+07FRUUFTz4Eyx0Euw5NKxZYEf6KgEbGC4sOTh4ODksLhgbAvopNT87Pjo3NlYZGgMDGBk4B+w8UVBPUjwH7C0yAAAAAwAAAAARFxEXAAMABwALAAABESERAREhEQERIRECcQ6m8VoOpvFaDqYRF/2PAnH55v2PAnH55f2PAnEAAwAAAAASUAw1ABgAMQBKAAABIgcOAQcGFhceARcWMjc+ATc2NCcuAScmISIHDgEHBhQXHgEXFjI3PgE3NjQnLgEnJiEiBw4BBwYUFx4BFxYyNz4BNzY0Jy4BJyYDqoB0cK0vMgExL61wdP90cK0vMjIvrXB0BZt/dHCtMDExMK1wdP50cK0wMTEwrXB0BZyAdHCtLzExL61wdP90cK0vMjIvrXB0DDUxMK1wdP50cK0wMTEwrXB0/nRwrTAxMTCtcHT+dHCtMDExMK1wdP50cK0wMTEwrXB0/nRwrTAxMTCtcHT+dHCtMDEAAAACAAAAAA/fD98AAwAHAAABESERIREhEQOqBOICcQTiD9/zyww188sMNQAAAAEAAAAAERcRFwACAAAJAgJxDqbxWhEX+K34rQABAAAAAQAAidCi918PPPUACxOIAAAAANpDU6YAAAAA2fJ3p///AAATkxLsAAAACAACAAAAAAAAAAEAABOIAAAAABOI////9ROTAAEAAAAAAAAAAAAAAAAAAAACAAAAABOIAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAIgA2AFgAbACMAOYBBAF6AZABngABAAAACwBLAAMAAAAAAAIAAAAKAAoAAAD/AAAAAAAAAAAAEADGAAEAAAAAAAEAFAAAAAEAAAAAAAIABwAUAAEAAAAAAAMAFAAbAAEAAAAAAAQAFAAvAAEAAAAAAAUACwBDAAEAAAAAAAYAFABOAAEAAAAAAAoAKwBiAAEAAAAAAAsAEwCNAAMAAQQJAAEAKACgAAMAAQQJAAIADgDIAAMAAQQJAAMAKADWAAMAAQQJAAQAKAD+AAMAAQQJAAUAFgEmAAMAAQQJAAYAKAE8AAMAAQQJAAoAVgFkAAMAAQQJAAsAJgG6aWNvbmZvbnQtdnVlLWU1NmExMjFSZWd1bGFyaWNvbmZvbnQtdnVlLWU1NmExMjFpY29uZm9udC12dWUtZTU2YTEyMVZlcnNpb24gMS4waWNvbmZvbnQtdnVlLWU1NmExMjFHZW5lcmF0ZWQgYnkgc3ZnMnR0ZiBmcm9tIEZvbnRlbGxvIHByb2plY3QuaHR0cDovL2ZvbnRlbGxvLmNvbQBpAGMAbwBuAGYAbwBuAHQALQB2AHUAZQAtAGUANQA2AGEAMQAyADEAUgBlAGcAdQBsAGEAcgBpAGMAbwBuAGYAbwBuAHQALQB2AHUAZQAtAGUANQA2AGEAMQAyADEAaQBjAG8AbgBmAG8AbgB0AC0AdgB1AGUALQBlADUANgBhADEAMgAxAFYAZQByAHMAaQBvAG4AIAAxAC4AMABpAGMAbwBuAGYAbwBuAHQALQB2AHUAZQAtAGUANQA2AGEAMQAyADEARwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABzAHYAZwAyAHQAdABmACAAZgByAG8AbQAgAEYAbwBuAHQAZQBsAGwAbwAgAHAAcgBvAGoAZQBjAHQALgBoAHQAdABwADoALwAvAGYAbwBuAHQAZQBsAGwAbwAuAGMAbwBtAAAAAgAAAAAAAAAyAAAAAAAAAAAAAAAAAAAAAAAAAAAACwALAAABAgEDAQQBBQEGAQcBCAEJAQoBCxFhcnJvdy1sZWZ0LWRvdWJsZQphcnJvdy1sZWZ0EmFycm93LXJpZ2h0LWRvdWJsZQthcnJvdy1yaWdodAVjbG9zZQxjb25maXJtLWZhZGUEbWVudQRtb3JlBXBhdXNlBHBsYXk="},11:function(t,e){t.exports="data:font/woff;base64,d09GRgABAAAAAAnQAAoAAAAACYgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAAA9AAAAGAAAABgdOOQiGNtYXAAAAFUAAABSgAAAUrqJOu8Z2x5ZgAAAqAAAAM8AAADPHQFn1loZWFkAAAF3AAAADYAAAA2JuYuvmhoZWEAAAYUAAAAJAAAACQnHBOAaG10eAAABjgAAAAaAAAAGhOHAABsb2NhAAAGVAAAABgAAAAYA5oEoG1heHAAAAZsAAAAIAAAACABGABXbmFtZQAABowAAAKmAAACptjPeAhwb3N0AAAJNAAAAJwAAACc+8sNdgAEE4gBkAAFAAAMZQ2sAAACvAxlDawAAAlgAPUFCgAAAgAFAwAAAAAAAAAAAAAQAAAAAAAAAAAAAABQZkVkAEDqAeoLE4gAAAHCE4gAAAAAAAEAAAAAAAAAAAAAACAAAAAAAAMAAAADAAAAHAABAAAAAABEAAMAAQAAABwABAAoAAAABgAEAAEAAuoG6gv//wAA6gHqB///FgAV/wABAAAAAAAAAAABBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAADqYPQwAFAAsAAAkCEQkEEQkBDqb6ggV++7oERvqC+oIFfvu6BEYPQvqC+oIBOARGBEYBOPqC+oIBOARGBEYAAQAAAAANbhJQAAUAAAkBEQkBEQYbB1P3dAiMCcT4rf7ICIsIjP7HAAIAAAAAD98PQwAFAAsAAAkCEQkEEQkBBOIFfvqCBEb7ugV+BX/6gQRG+7oERgV+BX7+yPu6+7r+yAV+BX7+yPu6+7oAAQAAAAAOphJQAAUAAAkBEQkBEQ1u+K0Ii/d1CcQHUwE593T3dQE4AAEAAAAAERcRFwALAAAJCxEX/e36wPrA/e0FQPrAAhMFQAVAAhP6wASE/e0FQPrAAhMFQAVAAhP6wAVA/e36wAAB//8AABOTEuwAMwAAASIHDgEXFhcBISYHBgcGBwYUFxYXFhcWNyEBBgcGFxYXHgEXFhcWNzY3ATY3NicmJwEuAQpgZU9KRhASSAXX8eBNPjopJxQUFBQnKTo+TQ4g+ik3GhgDAxsZVjU3Oz46PzUH7TsVFRQVPPgTLHQS7Dk0rFlgR/oqARsYLiw5OHg4OSwuGBsC+ik1Pzs+Ojc2VhkaAwMYGTgH7DxRUE9SPAfsLTIAAAADAAAAABEXERcAAwAHAAsAAAERIREBESERAREhEQJxDqbxWg6m8VoOphEX/Y8Ccfnm/Y8Ccfnl/Y8CcQADAAAAABJQDDUAGAAxAEoAAAEiBw4BBwYWFx4BFxYyNz4BNzY0Jy4BJyYhIgcOAQcGFBceARcWMjc+ATc2NCcuAScmISIHDgEHBhQXHgEXFjI3PgE3NjQnLgEnJgOqgHRwrS8yATEvrXB0/3RwrS8yMi+tcHQFm390cK0wMTEwrXB0/nRwrTAxMTCtcHQFnIB0cK0vMTEvrXB0/3RwrS8yMi+tcHQMNTEwrXB0/nRwrTAxMTCtcHT+dHCtMDExMK1wdP50cK0wMTEwrXB0/nRwrTAxMTCtcHT+dHCtMDExMK1wdP50cK0wMQAAAAIAAAAAD98P3wADAAcAAAERIREhESERA6oE4gJxBOIP3/PLDDXzyww1AAAAAQAAAAARFxEXAAIAAAkCAnEOpvFaERf4rfitAAEAAAABAACJ0KL3Xw889QALE4gAAAAA2kNTpgAAAADZ8nen//8AABOTEuwAAAAIAAIAAAAAAAAAAQAAE4gAAAAAE4j////1E5MAAQAAAAAAAAAAAAAAAAAAAAIAAAAAE4gAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAiADYAWABsAIwA5gEEAXoBkAGeAAEAAAALAEsAAwAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAAAQAMYAAQAAAAAAAQAUAAAAAQAAAAAAAgAHABQAAQAAAAAAAwAUABsAAQAAAAAABAAUAC8AAQAAAAAABQALAEMAAQAAAAAABgAUAE4AAQAAAAAACgArAGIAAQAAAAAACwATAI0AAwABBAkAAQAoAKAAAwABBAkAAgAOAMgAAwABBAkAAwAoANYAAwABBAkABAAoAP4AAwABBAkABQAWASYAAwABBAkABgAoATwAAwABBAkACgBWAWQAAwABBAkACwAmAbppY29uZm9udC12dWUtZTU2YTEyMVJlZ3VsYXJpY29uZm9udC12dWUtZTU2YTEyMWljb25mb250LXZ1ZS1lNTZhMTIxVmVyc2lvbiAxLjBpY29uZm9udC12dWUtZTU2YTEyMUdlbmVyYXRlZCBieSBzdmcydHRmIGZyb20gRm9udGVsbG8gcHJvamVjdC5odHRwOi8vZm9udGVsbG8uY29tAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0AZQA1ADYAYQAxADIAMQBSAGUAZwB1AGwAYQByAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0AZQA1ADYAYQAxADIAMQBpAGMAbwBuAGYAbwBuAHQALQB2AHUAZQAtAGUANQA2AGEAMQAyADEAVgBlAHIAcwBpAG8AbgAgADEALgAwAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0AZQA1ADYAYQAxADIAMQBHAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAHMAdgBnADIAdAB0AGYAIABmAHIAbwBtACAARgBvAG4AdABlAGwAbABvACAAcAByAG8AagBlAGMAdAAuAGgAdAB0AHAAOgAvAC8AZgBvAG4AdABlAGwAbABvAC4AYwBvAG0AAAACAAAAAAAAADIAAAAAAAAAAAAAAAAAAAAAAAAAAAALAAsAAAECAQMBBAEFAQYBBwEIAQkBCgELEWFycm93LWxlZnQtZG91YmxlCmFycm93LWxlZnQSYXJyb3ctcmlnaHQtZG91YmxlC2Fycm93LXJpZ2h0BWNsb3NlDGNvbmZpcm0tZmFkZQRtZW51BG1vcmUFcGF1c2UEcGxheQ=="},12:function(t,e){t.exports="data:font/ttf;base64,AAEAAAAKAIAAAwAgT1MvMnTjkIgAAACsAAAAYGNtYXDqJOu8AAABDAAAAUpnbHlmdAWfWQAAAlgAAAM8aGVhZCbmLr4AAAWUAAAANmhoZWEnHBOAAAAFzAAAACRobXR4E4cAAAAABfAAAAAabG9jYQOaBKAAAAYMAAAAGG1heHABGABXAAAGJAAAACBuYW1l2M94CAAABkQAAAKmcG9zdPvLDXYAAAjsAAAAnAAEE4gBkAAFAAAMZQ2sAAACvAxlDawAAAlgAPUFCgAAAgAFAwAAAAAAAAAAAAAQAAAAAAAAAAAAAABQZkVkAEDqAeoLE4gAAAHCE4gAAAAAAAEAAAAAAAAAAAAAACAAAAAAAAMAAAADAAAAHAABAAAAAABEAAMAAQAAABwABAAoAAAABgAEAAEAAuoG6gv//wAA6gHqB///FgAV/wABAAAAAAAAAAABBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAADqYPQwAFAAsAAAkCEQkEEQkBDqb6ggV++7oERvqC+oIFfvu6BEYPQvqC+oIBOARGBEYBOPqC+oIBOARGBEYAAQAAAAANbhJQAAUAAAkBEQkBEQYbB1P3dAiMCcT4rf7ICIsIjP7HAAIAAAAAD98PQwAFAAsAAAkCEQkEEQkBBOIFfvqCBEb7ugV+BX/6gQRG+7oERgV+BX7+yPu6+7r+yAV+BX7+yPu6+7oAAQAAAAAOphJQAAUAAAkBEQkBEQ1u+K0Ii/d1CcQHUwE593T3dQE4AAEAAAAAERcRFwALAAAJCxEX/e36wPrA/e0FQPrAAhMFQAVAAhP6wASE/e0FQPrAAhMFQAVAAhP6wAVA/e36wAAB//8AABOTEuwAMwAAASIHDgEXFhcBISYHBgcGBwYUFxYXFhcWNyEBBgcGFxYXHgEXFhcWNzY3ATY3NicmJwEuAQpgZU9KRhASSAXX8eBNPjopJxQUFBQnKTo+TQ4g+ik3GhgDAxsZVjU3Oz46PzUH7TsVFRQVPPgTLHQS7Dk0rFlgR/oqARsYLiw5OHg4OSwuGBsC+ik1Pzs+Ojc2VhkaAwMYGTgH7DxRUE9SPAfsLTIAAAADAAAAABEXERcAAwAHAAsAAAERIREBESERAREhEQJxDqbxWg6m8VoOphEX/Y8Ccfnm/Y8Ccfnl/Y8CcQADAAAAABJQDDUAGAAxAEoAAAEiBw4BBwYWFx4BFxYyNz4BNzY0Jy4BJyYhIgcOAQcGFBceARcWMjc+ATc2NCcuAScmISIHDgEHBhQXHgEXFjI3PgE3NjQnLgEnJgOqgHRwrS8yATEvrXB0/3RwrS8yMi+tcHQFm390cK0wMTEwrXB0/nRwrTAxMTCtcHQFnIB0cK0vMTEvrXB0/3RwrS8yMi+tcHQMNTEwrXB0/nRwrTAxMTCtcHT+dHCtMDExMK1wdP50cK0wMTEwrXB0/nRwrTAxMTCtcHT+dHCtMDExMK1wdP50cK0wMQAAAAIAAAAAD98P3wADAAcAAAERIREhESERA6oE4gJxBOIP3/PLDDXzyww1AAAAAQAAAAARFxEXAAIAAAkCAnEOpvFaERf4rfitAAEAAAABAACJ0KL3Xw889QALE4gAAAAA2kNTpgAAAADZ8nen//8AABOTEuwAAAAIAAIAAAAAAAAAAQAAE4gAAAAAE4j////1E5MAAQAAAAAAAAAAAAAAAAAAAAIAAAAAE4gAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAiADYAWABsAIwA5gEEAXoBkAGeAAEAAAALAEsAAwAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAAAQAMYAAQAAAAAAAQAUAAAAAQAAAAAAAgAHABQAAQAAAAAAAwAUABsAAQAAAAAABAAUAC8AAQAAAAAABQALAEMAAQAAAAAABgAUAE4AAQAAAAAACgArAGIAAQAAAAAACwATAI0AAwABBAkAAQAoAKAAAwABBAkAAgAOAMgAAwABBAkAAwAoANYAAwABBAkABAAoAP4AAwABBAkABQAWASYAAwABBAkABgAoATwAAwABBAkACgBWAWQAAwABBAkACwAmAbppY29uZm9udC12dWUtZTU2YTEyMVJlZ3VsYXJpY29uZm9udC12dWUtZTU2YTEyMWljb25mb250LXZ1ZS1lNTZhMTIxVmVyc2lvbiAxLjBpY29uZm9udC12dWUtZTU2YTEyMUdlbmVyYXRlZCBieSBzdmcydHRmIGZyb20gRm9udGVsbG8gcHJvamVjdC5odHRwOi8vZm9udGVsbG8uY29tAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0AZQA1ADYAYQAxADIAMQBSAGUAZwB1AGwAYQByAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0AZQA1ADYAYQAxADIAMQBpAGMAbwBuAGYAbwBuAHQALQB2AHUAZQAtAGUANQA2AGEAMQAyADEAVgBlAHIAcwBpAG8AbgAgADEALgAwAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0AZQA1ADYAYQAxADIAMQBHAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAHMAdgBnADIAdAB0AGYAIABmAHIAbwBtACAARgBvAG4AdABlAGwAbABvACAAcAByAG8AagBlAGMAdAAuAGgAdAB0AHAAOgAvAC8AZgBvAG4AdABlAGwAbABvAC4AYwBvAG0AAAACAAAAAAAAADIAAAAAAAAAAAAAAAAAAAAAAAAAAAALAAsAAAECAQMBBAEFAQYBBwEIAQkBCgELEWFycm93LWxlZnQtZG91YmxlCmFycm93LWxlZnQSYXJyb3ctcmlnaHQtZG91YmxlC2Fycm93LXJpZ2h0BWNsb3NlDGNvbmZpcm0tZmFkZQRtZW51BG1vcmUFcGF1c2UEcGxheQ=="},13:function(t,e){t.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCIgPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48bWV0YWRhdGE+PC9tZXRhZGF0YT48ZGVmcz48Zm9udCBpZD0iaWNvbmZvbnQtdnVlLWU1NmExMjEiIGhvcml6LWFkdi14PSI1MDAwIj48Zm9udC1mYWNlIGZvbnQtZmFtaWx5PSJpY29uZm9udC12dWUtZTU2YTEyMSIgZm9udC13ZWlnaHQ9IjQwMCIgZm9udC1zdHJldGNoPSJub3JtYWwiIHVuaXRzLXBlci1lbT0iNTAwMCIgcGFub3NlLTE9IjIgMCA1IDMgMCAwIDAgMCAwIDAiIGFzY2VudD0iNTAwMCIgZGVzY2VudD0iMCIgeC1oZWlnaHQ9IjAiIGJib3g9Ii0xIDAgNTAxMSA0ODQ0IiB1bmRlcmxpbmUtdGhpY2tuZXNzPSIwIiB1bmRlcmxpbmUtcG9zaXRpb249IjUwIiB1bmljb2RlLXJhbmdlPSJVK2VhMDEtZWEwYiIgLz48bWlzc2luZy1nbHlwaCBob3Jpei1hZHYteD0iMCIgIC8+PGdseXBoIGdseXBoLW5hbWU9ImFycm93LWxlZnQtZG91YmxlIiB1bmljb2RlPSImI3hlYTAxOyIgZD0iTTM3NTAgMzkwNiBsLTE0MDYgLTE0MDYgbDE0MDYgLTE0MDYgbDAgMzEyIGwtMTA5NCAxMDk0IGwxMDk0IDEwOTQgbDAgMzEyIFpNMjM0NCAzOTA2IGwtMTQwNiAtMTQwNiBsMTQwNiAtMTQwNiBsMCAzMTIgbC0xMDk0IDEwOTQgbDEwOTQgMTA5NCBsMCAzMTIgWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0iYXJyb3ctbGVmdCIgdW5pY29kZT0iJiN4ZWEwMjsiIGQ9Ik0xNTYzIDI1MDAgbDE4NzUgLTE4NzUgbDAgLTMxMiBsLTIxODggMjE4NyBsMjE4OCAyMTg4IGwwIC0zMTMgbC0xODc1IC0xODc1IFoiIC8+PGdseXBoIGdseXBoLW5hbWU9ImFycm93LXJpZ2h0LWRvdWJsZSIgdW5pY29kZT0iJiN4ZWEwMzsiIGQ9Ik0xMjUwIDEwOTQgbDE0MDYgMTQwNiBsLTE0MDYgMTQwNiBsMCAtMzEyIGwxMDk0IC0xMDk0IGwtMTA5NCAtMTA5NCBsMCAtMzEyIFpNMjY1NiAxMDk0IGwxNDA3IDE0MDYgbC0xNDA3IDE0MDYgbDAgLTMxMiBsMTA5NCAtMTA5NCBsLTEwOTQgLTEwOTQgbDAgLTMxMiBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJhcnJvdy1yaWdodCIgdW5pY29kZT0iJiN4ZWEwNDsiIGQ9Ik0zNDM4IDI1MDAgbC0xODc1IDE4NzUgbDAgMzEzIGwyMTg3IC0yMTg4IGwtMjE4NyAtMjE4NyBsMCAzMTIgbDE4NzUgMTg3NSBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJjbG9zZSIgdW5pY29kZT0iJiN4ZWEwNTsiIGQ9Ik00Mzc1IDExNTYgbC01MzEgLTUzMSBsLTEzNDQgMTM0NCBsLTEzNDQgLTEzNDQgbC01MzEgNTMxIGwxMzQ0IDEzNDQgbC0xMzQ0IDEzNDQgbDUzMSA1MzEgbDEzNDQgLTEzNDQgbDEzNDQgMTM0NCBsNTMxIC01MzEgbC0xMzQ0IC0xMzQ0IGwxMzQ0IC0xMzQ0IFoiIC8+PGdseXBoIGdseXBoLW5hbWU9ImNvbmZpcm0tZmFkZSIgdW5pY29kZT0iJiN4ZWEwNjsmI3hlYTA3OyIgZD0iTTI2NTYgNDg0NCBxLTEwMSAwIC0xODAgLTU3IHEtNzQgLTUyIC0xMDkgLTEzOCBxLTM1IC04NiAtMTkgLTE3NSBxMTggLTk2IDkwIC0xNjcgbDE0OTUgLTE0OTQgbC0zNjE2IDAgcS03NyAxIC0xMzkgLTI2IHEtNTggLTI0IC05OSAtNzAgcS0zOSAtNDQgLTU5IC0xMDEgcS0yMCAtNTYgLTIwIC0xMTYgcTAgLTYwIDIwIC0xMTYgcTIwIC01NyA1OSAtMTAxIHE0MSAtNDYgOTkgLTcwIHE2MiAtMjcgMTM5IC0yNSBsMzYxNiAwIGwtMTQ5NSAtMTQ5NSBxLTU1IC01MyAtODEgLTExNiBxLTI0IC01OSAtMjEgLTEyMSBxMyAtNTggMzAgLTExMyBxMjUgLTU0IDY4IC05NyBxNDMgLTQzIDk2IC02OCBxNTUgLTI2IDExNCAtMjkgcTYyIC0zIDEyMCAyMSBxNjMgMjUgMTE2IDgxIGwyMDI5IDIwMjggcTU5IDYwIDgwIDE0MSBxMjEgODAgMSAxNTkgcS0yMSA4MiAtODEgMTQyIGwtMjAyOSAyMDI4IHEtNDQgNDUgLTEwMiA3MCBxLTU4IDI1IC0xMjIgMjUgWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0ibWVudSIgdW5pY29kZT0iJiN4ZWEwODsiIGQ9Ik02MjUgNDM3NSBsMCAtNjI1IGwzNzUwIDAgbDAgNjI1IGwtMzc1MCAwIFpNNjI1IDI4MTMgbDAgLTYyNSBsMzc1MCAwIGwwIDYyNSBsLTM3NTAgMCBaTTYyNSAxMjUwIGwwIC02MjUgbDM3NTAgMCBsMCA2MjUgbC0zNzUwIDAgWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0ibW9yZSIgdW5pY29kZT0iJiN4ZWEwOTsiIGQ9Ik05MzggMzEyNSBxLTEyOCAwIC0yNDQgLTQ5IHEtMTEyIC00OCAtMTk4LjUgLTEzNC41IHEtODYuNSAtODYuNSAtMTMzLjUgLTE5OC41IHEtNTAgLTExNiAtNDkuNSAtMjQzIHEwLjUgLTEyNyA0OS41IC0yNDMgcTQ3IC0xMTIgMTMzLjUgLTE5OC41IHE4Ni41IC04Ni41IDE5OC41IC0xMzQuNSBxMTE2IC00OSAyNDMuNSAtNDkgcTEyNy41IDAgMjQzLjUgNDkgcTExMiA0OCAxOTguNSAxMzQuNSBxODYuNSA4Ni41IDEzMy41IDE5OC41IHE1MCAxMTYgNTAgMjQzIHEwIDEyNyAtNTAgMjQzIHEtNDcgMTEyIC0xMzMuNSAxOTguNSBxLTg2LjUgODYuNSAtMTk4LjUgMTM0LjUgcS0xMTYgNDkgLTI0MyA0OSBaTTI1MDAgMzEyNSBxLTEyNyAwIC0yNDMgLTQ5IHEtMTEyIC00OCAtMTk4LjUgLTEzNC41IHEtODYuNSAtODYuNSAtMTM0LjUgLTE5OC41IHEtNDkgLTExNiAtNDkgLTI0MyBxMCAtMTI3IDQ5IC0yNDMgcTQ4IC0xMTIgMTM0LjUgLTE5OC41IHE4Ni41IC04Ni41IDE5OC41IC0xMzQuNSBxMTE2IC00OSAyNDMgLTQ5IHExMjcgMCAyNDMgNDkgcTExMiA0OCAxOTguNSAxMzQuNSBxODYuNSA4Ni41IDEzNC41IDE5OC41IHE0OSAxMTYgNDkgMjQzIHEwIDEyNyAtNDkgMjQzIHEtNDggMTEyIC0xMzQuNSAxOTguNSBxLTg2LjUgODYuNSAtMTk4LjUgMTM0LjUgcS0xMTYgNDkgLTI0MyA0OSBaTTQwNjMgMzEyNSBxLTEyOCAwIC0yNDQgLTQ5IHEtMTEyIC00OCAtMTk4LjUgLTEzNC41IHEtODYuNSAtODYuNSAtMTMzLjUgLTE5OC41IHEtNDkgLTExNiAtNDkgLTI0MyBxMCAtMTI3IDQ5IC0yNDMgcTQ3IC0xMTIgMTMzLjUgLTE5OC41IHE4Ni41IC04Ni41IDE5OC41IC0xMzQuNSBxMTE2IC00OSAyNDMuNSAtNDkgcTEyNy41IDAgMjQzLjUgNDkgcTExMiA0OCAxOTguNSAxMzQuNSBxODYuNSA4Ni41IDEzMy41IDE5OC41IHE1MCAxMTYgNTAgMjQzIHEwIDEyNyAtNTAgMjQzIHEtNDcgMTEyIC0xMzMuNSAxOTguNSBxLTg2LjUgODYuNSAtMTk4LjUgMTM0LjUgcS0xMTYgNDkgLTI0MyA0OSBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJwYXVzZSIgdW5pY29kZT0iJiN4ZWEwYTsiIGQ9Ik05MzggNDA2MyBsMCAtMzEyNSBsMTI1MCAwIGwwIDMxMjUgbC0xMjUwIDAgWk0yODEzIDQwNjMgbDAgLTMxMjUgbDEyNTAgMCBsMCAzMTI1IGwtMTI1MCAwIFoiIC8+PGdseXBoIGdseXBoLW5hbWU9InBsYXkiIHVuaWNvZGU9IiYjeGVhMGI7IiBkPSJNNjI1IDQzNzUgbDM3NTAgLTE4NzUgbC0zNzUwIC0xODc1IGwwIDM3NTAgWiIgLz48L2ZvbnQ+PC9kZWZzPjwvc3ZnPg=="},130:function(e,n,i){"use strict";i.r(n);var o=i(23),r=i(40),a=i.n(r),A=i(30),s=i(67),c=i(7);
/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
function l(t,e){var n,i,o,r=e;this.start=function(){o=!0,i=new Date,n=setTimeout(t,r)},this.pause=function(){o=!1,clearTimeout(n),r-=new Date-i},this.clear=function(){o=!1,clearTimeout(n),r=0},this.getTimeLeft=function(){return o&&(this.pause(),this.start()),r},this.getStateRunning=function(){return o},this.start()}var u={name:"Modal",components:{Actions:A.default,ActionButton:s.default},directives:{tooltip:c.default},props:{title:{type:String,default:""},hasPrevious:{type:Boolean,default:!1},hasNext:{type:Boolean,default:!1},outTransition:{type:Boolean,default:!1},enableSlideshow:{type:Boolean,default:!1},clearViewDelay:{type:Number,default:5e3},slideshowDelay:{type:Number,default:3e3},slideshowPaused:{type:Boolean,default:!1},enableSwipe:{type:Boolean,default:!0},spreadNavigation:{type:Boolean,default:!1},size:{type:String,default:"normal",validator:function(t){return-1!==["normal","large","full"].indexOf(t)}},canClose:{type:Boolean,default:!0}},data:function(){return{mc:null,showModal:!1,clearView:!1,clearViewTimeout:null,playing:!1,slideshowTimeout:null}},computed:{modalTransitionName:function(){return"modal-".concat(this.outTransition?"out":"in")},playPauseTitle:function(){return this.playing?t("core","Pause slideshow"):t("core","Start slideshow")}},watch:{slideshowPaused:function(t){this.slideshowTimeout&&(t?this.slideshowTimeout.pause():this.slideshowTimeout.start())}},beforeMount:function(){window.addEventListener("keydown",this.handleKeydown)},beforeDestroy:function(){window.removeEventListener("keydown",this.handleKeydown)},mounted:function(){var t=this;this.showModal=!0,this.handleMouseMove(),this.mc=new a.a(this.$refs.mask),this.mc.on("swipeleft swiperight",function(e){t.handleSwipe(e)}),document.body.insertBefore(this.$el,document.body.lastChild)},unmounted:function(){this.mc.off("swipeleft swiperight"),this.mc.destroy()},methods:{previous:function(t){this.hasPrevious&&(t&&this.resetSlideshow(),this.$emit("previous",t))},next:function(t){this.hasNext&&(t&&this.resetSlideshow(),this.$emit("next",t))},close:function(t){var e=this;this.canClose&&(this.showModal=!1,setTimeout(function(){e.$emit("close",t)},300))},handleKeydown:function(t){switch(t.keyCode){case 37:this.previous(t);break;case 13:case 39:this.next(t);break;case 27:this.close(t)}},handleSwipe:function(t){this.enableSwipe&&("swipeleft"===t.type?this.next(t):"swiperight"===t.type&&this.previous(t))},handleMouseMove:function(){var t=this;this.clearViewDelay>0&&(this.clearView=!1,clearTimeout(this.clearViewTimeout),this.clearViewTimeout=setTimeout(function(){t.clearView=!0},this.clearViewDelay))},togglePlayPause:function(){this.playing=!this.playing,this.playing?this.handleSlideshow():this.clearSlideshowTimeout()},resetSlideshow:function(){this.playing=!this.playing,this.clearSlideshowTimeout(),this.$nextTick(function(){this.togglePlayPause()})},handleSlideshow:function(){var t=this;this.playing=!0,this.hasNext?this.slideshowTimeout=new l(function(){t.next(),t.handleSlideshow()},this.slideshowDelay):(this.playing=!1,this.clearSlideshowTimeout())},clearSlideshowTimeout:function(){this.slideshowTimeout&&this.slideshowTimeout.clear()}}},d=(i(180),i(0)),p=i(91),f=i.n(p),h=Object(d.a)(u,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"fade"}},[n("div",{ref:"mask",staticClass:"modal-mask",on:{click:t.handleMouseMove,mousemove:t.handleMouseMove,touchmove:t.handleMouseMove}},[n("transition",{attrs:{name:"fade-visibility"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:!t.clearView,expression:"!clearView"}],staticClass:"modal-header",class:{invisible:t.clearView}},[""!==t.title.trim()?n("div",{staticClass:"modal-title"},[t._v("\n\t\t\t\t\t"+t._s(t.title)+"\n\t\t\t\t")]):t._e(),t._v(" "),n("div",{staticClass:"icons-menu"},[n("Actions",{staticClass:"header-actions"},[t._t("actions")],2),t._v(" "),t.hasNext&&t.enableSlideshow?n("button",{directives:[{name:"tooltip",rawName:"v-tooltip.auto",value:t.playPauseTitle,expression:"playPauseTitle",modifiers:{auto:!0}}],staticClass:"play-pause",class:{"play-pause--paused":t.slideshowPaused},on:{click:t.togglePlayPause}},[n("div",{class:[t.playing?"icon-pause":"icon-play"]},[n("span",{staticClass:"hidden-visually"},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(t.playPauseTitle)+"\n\t\t\t\t\t\t\t")])]),t._v(" "),t.playing?n("svg",{staticClass:"progress-ring",attrs:{height:"50",width:"50"}},[n("circle",{staticClass:"progress-ring__circle",attrs:{stroke:"white","stroke-width":"2",fill:"transparent",r:"15",cx:"25",cy:"25"}})]):t._e()]):t._e(),t._v(" "),t.canClose?n("Actions",{staticClass:"header-close"},[n("ActionButton",{attrs:{icon:"icon-close"},on:{click:t.close}},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.t("core","Close"))+"\n\t\t\t\t\t\t")])],1):t._e()],1)])]),t._v(" "),n("transition",{attrs:{name:t.modalTransitionName}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.showModal,expression:"showModal"}],staticClass:"modal-wrapper",class:["modal-wrapper--"+t.size,t.spreadNavigation?"modal-wrapper--spread-navigation":""],on:{click:function(e){return e.target!==e.currentTarget?null:t.close(e)}}},[n("transition",{attrs:{name:"fade-visibility"}},[n("a",{directives:[{name:"show",rawName:"v-show",value:t.hasPrevious&&!t.clearView,expression:"hasPrevious && !clearView"}],staticClass:"prev",class:{invisible:t.clearView||!t.hasPrevious},on:{click:t.previous}},[n("div",{staticClass:"icon icon-previous"},[n("span",{staticClass:"hidden-visually"},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(t.t("core","Previous"))+"\n\t\t\t\t\t\t\t")])])])]),t._v(" "),n("div",{staticClass:"modal-container"},[t._t("default")],2),t._v(" "),n("transition",{attrs:{name:"fade-visibility"}},[n("a",{directives:[{name:"show",rawName:"v-show",value:t.hasNext&&!t.clearView,expression:"hasNext && !clearView"}],staticClass:"next",class:{invisible:t.clearView||!t.hasNext},on:{click:t.next}},[n("div",{staticClass:"icon icon-next"},[n("span",{staticClass:"hidden-visually"},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(t.t("core","Next"))+"\n\t\t\t\t\t\t\t")])])])])],1)])],1)])},[],!1,null,"9c792ef2",null);"function"==typeof f.a&&f()(h);var v=h.exports;i.d(n,"Modal",function(){return v}),
/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
Object(o.a)(v);n.default=v},14:function(t,e,n){t.exports=function(){var t="undefined"!=typeof window,e="undefined"!=typeof navigator,n=t&&("ontouchstart"in window||e&&navigator.msMaxTouchPoints>0)?["touchstart"]:["click"],i=function(t){return t},o={instances:[]};function r(t){var e="function"==typeof t;if(!e&&"object"!=typeof t)throw new Error("v-click-outside: Binding value must be a function or an object");return{handler:e?t:t.handler,middleware:t.middleware||i,events:t.events||n,isActive:!(!1===t.isActive)}}function a(t){var e=t.el,n=t.event,i=t.handler,o=t.middleware;n.target!==e&&!e.contains(n.target)&&o(n,e)&&i(n,e)}function A(t){var e=t.el,n=t.handler,i=t.middleware;return{el:e,eventHandlers:t.events.map(function(t){return{event:t,handler:function(t){return a({event:t,el:e,handler:n,middleware:i})}}})}}function s(t){var e=o.instances.findIndex(function(e){return e.el===t});-1!==e&&(o.instances[e].eventHandlers.forEach(function(t){return document.removeEventListener(t.event,t.handler)}),o.instances.splice(e,1))}return o.bind=function(t,e){var n=r(e.value);if(n.isActive){var i=A({el:t,events:n.events,handler:n.handler,middleware:n.middleware});i.eventHandlers.forEach(function(t){var e=t.event,n=t.handler;return setTimeout(function(){return document.addEventListener(e,n)},0)}),o.instances.push(i)}},o.update=function(t,e){var n=e.value,i=e.oldValue;if(JSON.stringify(n)!==JSON.stringify(i)){var c=r(n),l=c.events,u=c.handler,d=c.middleware;if(c.isActive){var p=o.instances.find(function(e){return e.el===t});p?(p.eventHandlers.forEach(function(t){return document.removeEventListener(t.event,t.handler)}),p.eventHandlers=l.map(function(e){return{event:e,handler:function(e){return a({event:e,el:t,handler:u,middleware:d})}}})):(p=A({el:t,events:l,handler:u,middleware:d}),o.instances.push(p)),p.eventHandlers.forEach(function(t){var e=t.event,n=t.handler;return setTimeout(function(){return document.addEventListener(e,n)},0)})}else s(t)}},o.unbind=s,{install:function(t){t.directive("click-outside",o)},directive:o}}()},15:function(t,e,n){"use strict";var i=n(5);
/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */e.a={mixins:[i.a],props:{icon:{type:String,default:""},title:{type:String,default:""}},computed:{isIconUrl:function(){try{return new URL(this.icon)}catch(t){return!1}}},methods:{onClick:function(t){this.$emit("click",t)}}}},16:function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},17:function(t,e,n){"use strict";(function(t){for(
/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.15.0
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var n="undefined"!=typeof window&&"undefined"!=typeof document,i=["Edge","Trident","Firefox"],o=0,r=0;r<i.length;r+=1)if(n&&navigator.userAgent.indexOf(i[r])>=0){o=1;break}var a=n&&window.Promise?function(t){var e=!1;return function(){e||(e=!0,window.Promise.resolve().then(function(){e=!1,t()}))}}:function(t){var e=!1;return function(){e||(e=!0,setTimeout(function(){e=!1,t()},o))}};function A(t){return t&&"[object Function]"==={}.toString.call(t)}function s(t,e){if(1!==t.nodeType)return[];var n=t.ownerDocument.defaultView.getComputedStyle(t,null);return e?n[e]:n}function c(t){return"HTML"===t.nodeName?t:t.parentNode||t.host}function l(t){if(!t)return document.body;switch(t.nodeName){case"HTML":case"BODY":return t.ownerDocument.body;case"#document":return t.body}var e=s(t),n=e.overflow,i=e.overflowX,o=e.overflowY;return/(auto|scroll|overlay)/.test(n+o+i)?t:l(c(t))}var u=n&&!(!window.MSInputMethodContext||!document.documentMode),d=n&&/MSIE 10/.test(navigator.userAgent);function p(t){return 11===t?u:10===t?d:u||d}function f(t){if(!t)return document.documentElement;for(var e=p(10)?document.body:null,n=t.offsetParent||null;n===e&&t.nextElementSibling;)n=(t=t.nextElementSibling).offsetParent;var i=n&&n.nodeName;return i&&"BODY"!==i&&"HTML"!==i?-1!==["TH","TD","TABLE"].indexOf(n.nodeName)&&"static"===s(n,"position")?f(n):n:t?t.ownerDocument.documentElement:document.documentElement}function h(t){return null!==t.parentNode?h(t.parentNode):t}function v(t,e){if(!(t&&t.nodeType&&e&&e.nodeType))return document.documentElement;var n=t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING,i=n?t:e,o=n?e:t,r=document.createRange();r.setStart(i,0),r.setEnd(o,0);var a,A,s=r.commonAncestorContainer;if(t!==s&&e!==s||i.contains(o))return"BODY"===(A=(a=s).nodeName)||"HTML"!==A&&f(a.firstElementChild)!==a?f(s):s;var c=h(t);return c.host?v(c.host,e):v(t,h(e).host)}function m(t){var e="top"===(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top")?"scrollTop":"scrollLeft",n=t.nodeName;if("BODY"===n||"HTML"===n){var i=t.ownerDocument.documentElement;return(t.ownerDocument.scrollingElement||i)[e]}return t[e]}function g(t,e){var n="x"===e?"Left":"Top",i="Left"===n?"Right":"Bottom";return parseFloat(t["border"+n+"Width"],10)+parseFloat(t["border"+i+"Width"],10)}function y(t,e,n,i){return Math.max(e["offset"+t],e["scroll"+t],n["client"+t],n["offset"+t],n["scroll"+t],p(10)?parseInt(n["offset"+t])+parseInt(i["margin"+("Height"===t?"Top":"Left")])+parseInt(i["margin"+("Height"===t?"Bottom":"Right")]):0)}function b(t){var e=t.body,n=t.documentElement,i=p(10)&&getComputedStyle(n);return{height:y("Height",e,n,i),width:y("Width",e,n,i)}}var w=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},E=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),T=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},x=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t};function B(t){return x({},t,{right:t.left+t.width,bottom:t.top+t.height})}function C(t){var e={};try{if(p(10)){e=t.getBoundingClientRect();var n=m(t,"top"),i=m(t,"left");e.top+=n,e.left+=i,e.bottom+=n,e.right+=i}else e=t.getBoundingClientRect()}catch(t){}var o={left:e.left,top:e.top,width:e.right-e.left,height:e.bottom-e.top},r="HTML"===t.nodeName?b(t.ownerDocument):{},a=r.width||t.clientWidth||o.right-o.left,A=r.height||t.clientHeight||o.bottom-o.top,c=t.offsetWidth-a,l=t.offsetHeight-A;if(c||l){var u=s(t);c-=g(u,"x"),l-=g(u,"y"),o.width-=c,o.height-=l}return B(o)}function _(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=p(10),o="HTML"===e.nodeName,r=C(t),a=C(e),A=l(t),c=s(e),u=parseFloat(c.borderTopWidth,10),d=parseFloat(c.borderLeftWidth,10);n&&o&&(a.top=Math.max(a.top,0),a.left=Math.max(a.left,0));var f=B({top:r.top-a.top-u,left:r.left-a.left-d,width:r.width,height:r.height});if(f.marginTop=0,f.marginLeft=0,!i&&o){var h=parseFloat(c.marginTop,10),v=parseFloat(c.marginLeft,10);f.top-=u-h,f.bottom-=u-h,f.left-=d-v,f.right-=d-v,f.marginTop=h,f.marginLeft=v}return(i&&!n?e.contains(A):e===A&&"BODY"!==A.nodeName)&&(f=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=m(e,"top"),o=m(e,"left"),r=n?-1:1;return t.top+=i*r,t.bottom+=i*r,t.left+=o*r,t.right+=o*r,t}(f,e)),f}function M(t){if(!t||!t.parentElement||p())return document.documentElement;for(var e=t.parentElement;e&&"none"===s(e,"transform");)e=e.parentElement;return e||document.documentElement}function I(t,e,n,i){var o=arguments.length>4&&void 0!==arguments[4]&&arguments[4],r={top:0,left:0},a=o?M(t):v(t,e);if("viewport"===i)r=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=t.ownerDocument.documentElement,i=_(t,n),o=Math.max(n.clientWidth,window.innerWidth||0),r=Math.max(n.clientHeight,window.innerHeight||0),a=e?0:m(n),A=e?0:m(n,"left");return B({top:a-i.top+i.marginTop,left:A-i.left+i.marginLeft,width:o,height:r})}(a,o);else{var A=void 0;"scrollParent"===i?"BODY"===(A=l(c(e))).nodeName&&(A=t.ownerDocument.documentElement):A="window"===i?t.ownerDocument.documentElement:i;var u=_(A,a,o);if("HTML"!==A.nodeName||function t(e){var n=e.nodeName;if("BODY"===n||"HTML"===n)return!1;if("fixed"===s(e,"position"))return!0;var i=c(e);return!!i&&t(i)}(a))r=u;else{var d=b(t.ownerDocument),p=d.height,f=d.width;r.top+=u.top-u.marginTop,r.bottom=p+u.top,r.left+=u.left-u.marginLeft,r.right=f+u.left}}var h="number"==typeof(n=n||0);return r.left+=h?n:n.left||0,r.top+=h?n:n.top||0,r.right-=h?n:n.right||0,r.bottom-=h?n:n.bottom||0,r}function N(t,e,n,i,o){var r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0;if(-1===t.indexOf("auto"))return t;var a=I(n,i,r,o),A={top:{width:a.width,height:e.top-a.top},right:{width:a.right-e.right,height:a.height},bottom:{width:a.width,height:a.bottom-e.bottom},left:{width:e.left-a.left,height:a.height}},s=Object.keys(A).map(function(t){return x({key:t},A[t],{area:(e=A[t],e.width*e.height)});var e}).sort(function(t,e){return e.area-t.area}),c=s.filter(function(t){var e=t.width,i=t.height;return e>=n.clientWidth&&i>=n.clientHeight}),l=c.length>0?c[0].key:s[0].key,u=t.split("-")[1];return l+(u?"-"+u:"")}function O(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return _(n,i?M(e):v(e,n),i)}function D(t){var e=t.ownerDocument.defaultView.getComputedStyle(t),n=parseFloat(e.marginTop||0)+parseFloat(e.marginBottom||0),i=parseFloat(e.marginLeft||0)+parseFloat(e.marginRight||0);return{width:t.offsetWidth+i,height:t.offsetHeight+n}}function Q(t){var e={left:"right",right:"left",bottom:"top",top:"bottom"};return t.replace(/left|right|bottom|top/g,function(t){return e[t]})}function k(t,e,n){n=n.split("-")[0];var i=D(t),o={width:i.width,height:i.height},r=-1!==["right","left"].indexOf(n),a=r?"top":"left",A=r?"left":"top",s=r?"height":"width",c=r?"width":"height";return o[a]=e[a]+e[s]/2-i[s]/2,o[A]=n===A?e[A]-i[c]:e[Q(A)],o}function S(t,e){return Array.prototype.find?t.find(e):t.filter(e)[0]}function L(t,e,n){return(void 0===n?t:t.slice(0,function(t,e,n){if(Array.prototype.findIndex)return t.findIndex(function(t){return t[e]===n});var i=S(t,function(t){return t[e]===n});return t.indexOf(i)}(t,"name",n))).forEach(function(t){t.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var n=t.function||t.fn;t.enabled&&A(n)&&(e.offsets.popper=B(e.offsets.popper),e.offsets.reference=B(e.offsets.reference),e=n(e,t))}),e}function j(t,e){return t.some(function(t){var n=t.name;return t.enabled&&n===e})}function Y(t){for(var e=[!1,"ms","Webkit","Moz","O"],n=t.charAt(0).toUpperCase()+t.slice(1),i=0;i<e.length;i++){var o=e[i],r=o?""+o+n:t;if(void 0!==document.body.style[r])return r}return null}function G(t){var e=t.ownerDocument;return e?e.defaultView:window}function z(t,e,n,i){n.updateBound=i,G(t).addEventListener("resize",n.updateBound,{passive:!0});var o=l(t);return function t(e,n,i,o){var r="BODY"===e.nodeName,a=r?e.ownerDocument.defaultView:e;a.addEventListener(n,i,{passive:!0}),r||t(l(a.parentNode),n,i,o),o.push(a)}(o,"scroll",n.updateBound,n.scrollParents),n.scrollElement=o,n.eventsEnabled=!0,n}function P(){var t,e;this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=(t=this.reference,e=this.state,G(t).removeEventListener("resize",e.updateBound),e.scrollParents.forEach(function(t){t.removeEventListener("scroll",e.updateBound)}),e.updateBound=null,e.scrollParents=[],e.scrollElement=null,e.eventsEnabled=!1,e))}function H(t){return""!==t&&!isNaN(parseFloat(t))&&isFinite(t)}function F(t,e){Object.keys(e).forEach(function(n){var i="";-1!==["width","height","top","right","bottom","left"].indexOf(n)&&H(e[n])&&(i="px"),t.style[n]=e[n]+i})}var U=n&&/Firefox/i.test(navigator.userAgent);function R(t,e,n){var i=S(t,function(t){return t.name===e}),o=!!i&&t.some(function(t){return t.name===n&&t.enabled&&t.order<i.order});if(!o){var r="`"+e+"`",a="`"+n+"`";console.warn(a+" modifier is required by "+r+" modifier in order to work, be sure to include it before "+r+"!")}return o}var Z=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],W=Z.slice(3);function $(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=W.indexOf(t),i=W.slice(n+1).concat(W.slice(0,n));return e?i.reverse():i}var V={FLIP:"flip",CLOCKWISE:"clockwise",COUNTERCLOCKWISE:"counterclockwise"};function X(t,e,n,i){var o=[0,0],r=-1!==["right","left"].indexOf(i),a=t.split(/(\+|\-)/).map(function(t){return t.trim()}),A=a.indexOf(S(a,function(t){return-1!==t.search(/,|\s/)}));a[A]&&-1===a[A].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");var s=/\s*,\s*|\s+/,c=-1!==A?[a.slice(0,A).concat([a[A].split(s)[0]]),[a[A].split(s)[1]].concat(a.slice(A+1))]:[a];return(c=c.map(function(t,i){var o=(1===i?!r:r)?"height":"width",a=!1;return t.reduce(function(t,e){return""===t[t.length-1]&&-1!==["+","-"].indexOf(e)?(t[t.length-1]=e,a=!0,t):a?(t[t.length-1]+=e,a=!1,t):t.concat(e)},[]).map(function(t){return function(t,e,n,i){var o=t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),r=+o[1],a=o[2];if(!r)return t;if(0===a.indexOf("%")){var A=void 0;switch(a){case"%p":A=n;break;case"%":case"%r":default:A=i}return B(A)[e]/100*r}if("vh"===a||"vw"===a)return("vh"===a?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0))/100*r;return r}(t,o,e,n)})})).forEach(function(t,e){t.forEach(function(n,i){H(n)&&(o[e]+=n*("-"===t[i-1]?-1:1))})}),o}var J={placement:"bottom",positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(t){var e=t.placement,n=e.split("-")[0],i=e.split("-")[1];if(i){var o=t.offsets,r=o.reference,a=o.popper,A=-1!==["bottom","top"].indexOf(n),s=A?"left":"top",c=A?"width":"height",l={start:T({},s,r[s]),end:T({},s,r[s]+r[c]-a[c])};t.offsets.popper=x({},a,l[i])}return t}},offset:{order:200,enabled:!0,fn:function(t,e){var n=e.offset,i=t.placement,o=t.offsets,r=o.popper,a=o.reference,A=i.split("-")[0],s=void 0;return s=H(+n)?[+n,0]:X(n,r,a,A),"left"===A?(r.top+=s[0],r.left-=s[1]):"right"===A?(r.top+=s[0],r.left+=s[1]):"top"===A?(r.left+=s[0],r.top-=s[1]):"bottom"===A&&(r.left+=s[0],r.top+=s[1]),t.popper=r,t},offset:0},preventOverflow:{order:300,enabled:!0,fn:function(t,e){var n=e.boundariesElement||f(t.instance.popper);t.instance.reference===n&&(n=f(n));var i=Y("transform"),o=t.instance.popper.style,r=o.top,a=o.left,A=o[i];o.top="",o.left="",o[i]="";var s=I(t.instance.popper,t.instance.reference,e.padding,n,t.positionFixed);o.top=r,o.left=a,o[i]=A,e.boundaries=s;var c=e.priority,l=t.offsets.popper,u={primary:function(t){var n=l[t];return l[t]<s[t]&&!e.escapeWithReference&&(n=Math.max(l[t],s[t])),T({},t,n)},secondary:function(t){var n="right"===t?"left":"top",i=l[n];return l[t]>s[t]&&!e.escapeWithReference&&(i=Math.min(l[n],s[t]-("right"===t?l.width:l.height))),T({},n,i)}};return c.forEach(function(t){var e=-1!==["left","top"].indexOf(t)?"primary":"secondary";l=x({},l,u[e](t))}),t.offsets.popper=l,t},priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:function(t){var e=t.offsets,n=e.popper,i=e.reference,o=t.placement.split("-")[0],r=Math.floor,a=-1!==["top","bottom"].indexOf(o),A=a?"right":"bottom",s=a?"left":"top",c=a?"width":"height";return n[A]<r(i[s])&&(t.offsets.popper[s]=r(i[s])-n[c]),n[s]>r(i[A])&&(t.offsets.popper[s]=r(i[A])),t}},arrow:{order:500,enabled:!0,fn:function(t,e){var n;if(!R(t.instance.modifiers,"arrow","keepTogether"))return t;var i=e.element;if("string"==typeof i){if(!(i=t.instance.popper.querySelector(i)))return t}else if(!t.instance.popper.contains(i))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),t;var o=t.placement.split("-")[0],r=t.offsets,a=r.popper,A=r.reference,c=-1!==["left","right"].indexOf(o),l=c?"height":"width",u=c?"Top":"Left",d=u.toLowerCase(),p=c?"left":"top",f=c?"bottom":"right",h=D(i)[l];A[f]-h<a[d]&&(t.offsets.popper[d]-=a[d]-(A[f]-h)),A[d]+h>a[f]&&(t.offsets.popper[d]+=A[d]+h-a[f]),t.offsets.popper=B(t.offsets.popper);var v=A[d]+A[l]/2-h/2,m=s(t.instance.popper),g=parseFloat(m["margin"+u],10),y=parseFloat(m["border"+u+"Width"],10),b=v-t.offsets.popper[d]-g-y;return b=Math.max(Math.min(a[l]-h,b),0),t.arrowElement=i,t.offsets.arrow=(T(n={},d,Math.round(b)),T(n,p,""),n),t},element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:function(t,e){if(j(t.instance.modifiers,"inner"))return t;if(t.flipped&&t.placement===t.originalPlacement)return t;var n=I(t.instance.popper,t.instance.reference,e.padding,e.boundariesElement,t.positionFixed),i=t.placement.split("-")[0],o=Q(i),r=t.placement.split("-")[1]||"",a=[];switch(e.behavior){case V.FLIP:a=[i,o];break;case V.CLOCKWISE:a=$(i);break;case V.COUNTERCLOCKWISE:a=$(i,!0);break;default:a=e.behavior}return a.forEach(function(A,s){if(i!==A||a.length===s+1)return t;i=t.placement.split("-")[0],o=Q(i);var c=t.offsets.popper,l=t.offsets.reference,u=Math.floor,d="left"===i&&u(c.right)>u(l.left)||"right"===i&&u(c.left)<u(l.right)||"top"===i&&u(c.bottom)>u(l.top)||"bottom"===i&&u(c.top)<u(l.bottom),p=u(c.left)<u(n.left),f=u(c.right)>u(n.right),h=u(c.top)<u(n.top),v=u(c.bottom)>u(n.bottom),m="left"===i&&p||"right"===i&&f||"top"===i&&h||"bottom"===i&&v,g=-1!==["top","bottom"].indexOf(i),y=!!e.flipVariations&&(g&&"start"===r&&p||g&&"end"===r&&f||!g&&"start"===r&&h||!g&&"end"===r&&v),b=!!e.flipVariationsByContent&&(g&&"start"===r&&f||g&&"end"===r&&p||!g&&"start"===r&&v||!g&&"end"===r&&h),w=y||b;(d||m||w)&&(t.flipped=!0,(d||m)&&(i=a[s+1]),w&&(r=function(t){return"end"===t?"start":"start"===t?"end":t}(r)),t.placement=i+(r?"-"+r:""),t.offsets.popper=x({},t.offsets.popper,k(t.instance.popper,t.offsets.reference,t.placement)),t=L(t.instance.modifiers,t,"flip"))}),t},behavior:"flip",padding:5,boundariesElement:"viewport",flipVariations:!1,flipVariationsByContent:!1},inner:{order:700,enabled:!1,fn:function(t){var e=t.placement,n=e.split("-")[0],i=t.offsets,o=i.popper,r=i.reference,a=-1!==["left","right"].indexOf(n),A=-1===["top","left"].indexOf(n);return o[a?"left":"top"]=r[n]-(A?o[a?"width":"height"]:0),t.placement=Q(e),t.offsets.popper=B(o),t}},hide:{order:800,enabled:!0,fn:function(t){if(!R(t.instance.modifiers,"hide","preventOverflow"))return t;var e=t.offsets.reference,n=S(t.instance.modifiers,function(t){return"preventOverflow"===t.name}).boundaries;if(e.bottom<n.top||e.left>n.right||e.top>n.bottom||e.right<n.left){if(!0===t.hide)return t;t.hide=!0,t.attributes["x-out-of-boundaries"]=""}else{if(!1===t.hide)return t;t.hide=!1,t.attributes["x-out-of-boundaries"]=!1}return t}},computeStyle:{order:850,enabled:!0,fn:function(t,e){var n=e.x,i=e.y,o=t.offsets.popper,r=S(t.instance.modifiers,function(t){return"applyStyle"===t.name}).gpuAcceleration;void 0!==r&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var a=void 0!==r?r:e.gpuAcceleration,A=f(t.instance.popper),s=C(A),c={position:o.position},l=function(t,e){var n=t.offsets,i=n.popper,o=n.reference,r=Math.round,a=Math.floor,A=function(t){return t},s=r(o.width),c=r(i.width),l=-1!==["left","right"].indexOf(t.placement),u=-1!==t.placement.indexOf("-"),d=e?l||u||s%2==c%2?r:a:A,p=e?r:A;return{left:d(s%2==1&&c%2==1&&!u&&e?i.left-1:i.left),top:p(i.top),bottom:p(i.bottom),right:d(i.right)}}(t,window.devicePixelRatio<2||!U),u="bottom"===n?"top":"bottom",d="right"===i?"left":"right",p=Y("transform"),h=void 0,v=void 0;if(v="bottom"===u?"HTML"===A.nodeName?-A.clientHeight+l.bottom:-s.height+l.bottom:l.top,h="right"===d?"HTML"===A.nodeName?-A.clientWidth+l.right:-s.width+l.right:l.left,a&&p)c[p]="translate3d("+h+"px, "+v+"px, 0)",c[u]=0,c[d]=0,c.willChange="transform";else{var m="bottom"===u?-1:1,g="right"===d?-1:1;c[u]=v*m,c[d]=h*g,c.willChange=u+", "+d}var y={"x-placement":t.placement};return t.attributes=x({},y,t.attributes),t.styles=x({},c,t.styles),t.arrowStyles=x({},t.offsets.arrow,t.arrowStyles),t},gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:function(t){var e,n;return F(t.instance.popper,t.styles),e=t.instance.popper,n=t.attributes,Object.keys(n).forEach(function(t){!1!==n[t]?e.setAttribute(t,n[t]):e.removeAttribute(t)}),t.arrowElement&&Object.keys(t.arrowStyles).length&&F(t.arrowElement,t.arrowStyles),t},onLoad:function(t,e,n,i,o){var r=O(o,e,t,n.positionFixed),a=N(n.placement,r,e,t,n.modifiers.flip.boundariesElement,n.modifiers.flip.padding);return e.setAttribute("x-placement",a),F(e,{position:n.positionFixed?"fixed":"absolute"}),n},gpuAcceleration:void 0}}},K=function(){function t(e,n){var i=this,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};w(this,t),this.scheduleUpdate=function(){return requestAnimationFrame(i.update)},this.update=a(this.update.bind(this)),this.options=x({},t.Defaults,o),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=e&&e.jquery?e[0]:e,this.popper=n&&n.jquery?n[0]:n,this.options.modifiers={},Object.keys(x({},t.Defaults.modifiers,o.modifiers)).forEach(function(e){i.options.modifiers[e]=x({},t.Defaults.modifiers[e]||{},o.modifiers?o.modifiers[e]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(function(t){return x({name:t},i.options.modifiers[t])}).sort(function(t,e){return t.order-e.order}),this.modifiers.forEach(function(t){t.enabled&&A(t.onLoad)&&t.onLoad(i.reference,i.popper,i.options,t,i.state)}),this.update();var r=this.options.eventsEnabled;r&&this.enableEventListeners(),this.state.eventsEnabled=r}return E(t,[{key:"update",value:function(){return function(){if(!this.state.isDestroyed){var t={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};t.offsets.reference=O(this.state,this.popper,this.reference,this.options.positionFixed),t.placement=N(this.options.placement,t.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),t.originalPlacement=t.placement,t.positionFixed=this.options.positionFixed,t.offsets.popper=k(this.popper,t.offsets.reference,t.placement),t.offsets.popper.position=this.options.positionFixed?"fixed":"absolute",t=L(this.modifiers,t),this.state.isCreated?this.options.onUpdate(t):(this.state.isCreated=!0,this.options.onCreate(t))}}.call(this)}},{key:"destroy",value:function(){return function(){return this.state.isDestroyed=!0,j(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.position="",this.popper.style.top="",this.popper.style.left="",this.popper.style.right="",this.popper.style.bottom="",this.popper.style.willChange="",this.popper.style[Y("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}.call(this)}},{key:"enableEventListeners",value:function(){return function(){this.state.eventsEnabled||(this.state=z(this.reference,this.options,this.state,this.scheduleUpdate))}.call(this)}},{key:"disableEventListeners",value:function(){return P.call(this)}}]),t}();K.Utils=("undefined"!=typeof window?window:t).PopperUtils,K.placements=Z,K.Defaults=J,e.a=K}).call(this,n(16))},180:function(t,e,n){"use strict";var i=n(63);n.n(i).a},181:function(t,e,n){e=t.exports=n(1)(!1);var i=n(9),o=i(n(10)),r=i(n(11)),a=i(n(12)),A=i(n(13));e.push([t.i,'@font-face{font-family:"iconfont-vue-e56a121";src:url('+o+");src:url("+o+') format("embedded-opentype"),url('+r+') format("woff"),url('+a+') format("truetype"),url('+A+') format("svg")}.icon[data-v-9c792ef2]{font-style:normal;font-weight:400}.icon.arrow-left-double[data-v-9c792ef2]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.arrow-left[data-v-9c792ef2]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.arrow-right-double[data-v-9c792ef2]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.arrow-right[data-v-9c792ef2]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.close[data-v-9c792ef2]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.confirm-fade[data-v-9c792ef2]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.confirm[data-v-9c792ef2]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.menu[data-v-9c792ef2]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.more[data-v-9c792ef2]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.pause[data-v-9c792ef2]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.play[data-v-9c792ef2]:before{font-family:"iconfont-vue-e56a121";content:""}.modal-mask[data-v-9c792ef2]{position:fixed;z-index:9998;top:0;left:0;display:block;width:100%;height:100%;background-color:rgba(0,0,0,0.92)}.modal-header[data-v-9c792ef2]{position:absolute;z-index:10001;top:0;right:0;left:0;display:flex !important;align-items:center;justify-content:center;width:100%;height:50px;transition:opacity 250ms, visibility 250ms}.modal-header.invisible[style*=\'display:none\'][data-v-9c792ef2],.modal-header.invisible[style*=\'display: none\'][data-v-9c792ef2]{visibility:hidden}.modal-header .modal-title[data-v-9c792ef2]{overflow-x:hidden;box-sizing:border-box;max-width:100%;padding:0 88px;transition:padding ease 100ms;white-space:nowrap;text-overflow:ellipsis;color:#fff;font-size:14px}.modal-header .icons-menu[data-v-9c792ef2]{position:absolute;right:0;display:flex;align-items:center;justify-content:flex-end}.modal-header .icons-menu .icon-close[data-v-9c792ef2]{box-sizing:border-box;margin:3px;padding:10px 11px;color:#fff;background-image:none;font-size:23px}.modal-header .icons-menu .icon-close[data-v-9c792ef2]:before{font-family:"iconfont-vue-e56a121";font-style:normal;font-weight:400;content:""}.modal-header .icons-menu .play-pause[data-v-9c792ef2]{position:relative;width:50px;height:50px;margin:0;padding:0;cursor:pointer;color:white;border:none;background-color:transparent;font-size:22px}.modal-header .icons-menu .play-pause:hover .icon-play[data-v-9c792ef2],.modal-header .icons-menu .play-pause:hover .icon-pause[data-v-9c792ef2],.modal-header .icons-menu .play-pause:focus .icon-play[data-v-9c792ef2],.modal-header .icons-menu .play-pause:focus .icon-pause[data-v-9c792ef2]{opacity:1;border-radius:22px;background-color:rgba(127,127,127,0.25)}.modal-header .icons-menu .play-pause .icon-play[data-v-9c792ef2],.modal-header .icons-menu .play-pause .icon-pause[data-v-9c792ef2]{box-sizing:border-box;width:44px;height:44px;margin:3px;opacity:.7;background-image:none;cursor:pointer}.modal-header .icons-menu .play-pause .icon-play[data-v-9c792ef2]{padding:11px 13px}.modal-header .icons-menu .play-pause .icon-play[data-v-9c792ef2]:before{font-family:"iconfont-vue-e56a121";font-style:normal;font-weight:400;content:""}.modal-header .icons-menu .play-pause .icon-pause[data-v-9c792ef2]{padding:12px;font-size:19.5px}.modal-header .icons-menu .play-pause .icon-pause[data-v-9c792ef2]:before{font-family:"iconfont-vue-e56a121";font-style:normal;font-weight:400;content:""}.modal-header .icons-menu .header-actions[data-v-9c792ef2]{margin:3px;color:white}.modal-header .icons-menu .action-item--single[data-v-9c792ef2]{box-sizing:border-box;width:44px;height:44px;cursor:pointer;background-position:center;background-size:22px}.modal-header .icons-menu[data-v-9c792ef2] .action-item__menutoggle{padding:13px 11px;color:#fff;font-size:22px}.modal-wrapper[data-v-9c792ef2]{display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:100%;height:100%}.modal-wrapper .prev[data-v-9c792ef2],.modal-wrapper .next[data-v-9c792ef2]{z-index:10000;display:flex !important;align-items:center;justify-content:center;width:15%;min-width:60px;height:100%;transition:opacity 250ms, visibility 250ms}.modal-wrapper .prev.invisible[style*=\'display:none\'][data-v-9c792ef2],.modal-wrapper .prev.invisible[style*=\'display: none\'][data-v-9c792ef2],.modal-wrapper .next.invisible[style*=\'display:none\'][data-v-9c792ef2],.modal-wrapper .next.invisible[style*=\'display: none\'][data-v-9c792ef2]{visibility:hidden}.modal-wrapper .icon-next[data-v-9c792ef2],.modal-wrapper .icon-previous[data-v-9c792ef2]{box-sizing:border-box;width:44px;height:44px;padding:12px 11px;color:white;border-radius:22px;background-image:none;font-size:24px}.modal-wrapper .icon-previous[data-v-9c792ef2]:before{font-family:"iconfont-vue-e56a121";font-style:normal;font-weight:400;content:""}.modal-wrapper .icon-next[data-v-9c792ef2]:before{font-family:"iconfont-vue-e56a121";font-style:normal;font-weight:400;content:""}.modal-wrapper .modal-container[data-v-9c792ef2]{display:block;overflow:hidden;padding:0;transition:transform 300ms ease;border-radius:var(--border-radius-large);background-color:var(--color-main-background);box-shadow:0 2px 8px rgba(0,0,0,0.33)}.modal-wrapper:not(.modal-wrapper--large):not(.modal-wrapper--full) .modal-container[data-v-9c792ef2]{max-width:900px;max-height:80%}.modal-wrapper--full .modal-container[data-v-9c792ef2]{max-width:100%;max-height:100%;border-radius:0}.modal-wrapper--full .prev[data-v-9c792ef2],.modal-wrapper--full .next[data-v-9c792ef2],.modal-wrapper--spread-navigation .prev[data-v-9c792ef2],.modal-wrapper--spread-navigation .next[data-v-9c792ef2]{position:absolute;width:10%}.modal-wrapper--full .prev[data-v-9c792ef2],.modal-wrapper--spread-navigation .prev[data-v-9c792ef2]{left:0}.modal-wrapper--full .next[data-v-9c792ef2],.modal-wrapper--spread-navigation .next[data-v-9c792ef2]{right:0}.modal-wrapper--large .modal-container[data-v-9c792ef2]{max-width:70%;max-height:90%}.modal-wrapper--large .prev[data-v-9c792ef2],.modal-wrapper--large .next[data-v-9c792ef2]{width:10%}.fade-enter-active[data-v-9c792ef2],.fade-leave-active[data-v-9c792ef2]{transition:opacity 250ms}.fade-enter[data-v-9c792ef2],.fade-leave-to[data-v-9c792ef2]{opacity:0}.fade-visibility-enter[data-v-9c792ef2],.fade-visibility-leave-to[data-v-9c792ef2]{visibility:hidden;opacity:0}.modal-in-enter-active[data-v-9c792ef2],.modal-in-leave-active[data-v-9c792ef2],.modal-out-enter-active[data-v-9c792ef2],.modal-out-leave-active[data-v-9c792ef2]{transition:opacity 250ms}.modal-in-enter[data-v-9c792ef2],.modal-in-leave-to[data-v-9c792ef2],.modal-out-enter[data-v-9c792ef2],.modal-out-leave-to[data-v-9c792ef2]{opacity:0}.modal-in-enter .modal-container[data-v-9c792ef2],.modal-in-leave-to .modal-container[data-v-9c792ef2]{transform:scale(0.9)}.modal-out-enter .modal-container[data-v-9c792ef2],.modal-out-leave-to .modal-container[data-v-9c792ef2]{transform:scale(1.1)}.modal-mask .play-pause .progress-ring[data-v-9c792ef2]{position:absolute;top:0;left:0;transform:rotate(-90deg)}.modal-mask .play-pause .progress-ring .progress-ring__circle[data-v-9c792ef2]{transition:100ms stroke-dashoffset;transform-origin:50% 50%;animation:progressring-data-v-9c792ef2 linear 3s infinite;stroke-linecap:round;stroke-dashoffset:94.24778;stroke-dasharray:94.24778}.modal-mask .play-pause--paused .icon-pause[data-v-9c792ef2]{animation:breath-data-v-9c792ef2 2s cubic-bezier(0.4, 0, 0.2, 1) infinite}.modal-mask .play-pause--paused .progress-ring__circle[data-v-9c792ef2]{animation-play-state:paused !important}@keyframes progressring-data-v-9c792ef2{from{stroke-dashoffset:94.24778}to{stroke-dashoffset:0}}@keyframes breath-data-v-9c792ef2{0%{opacity:1}50%{opacity:0}100%{opacity:1}}\n',""])},2:function(t,e,n){"use strict";function i(t,e){for(var n=[],i={},o=0;o<e.length;o++){var r=e[o],a=r[0],A={id:t+":"+o,css:r[1],media:r[2],sourceMap:r[3]};i[a]?i[a].parts.push(A):n.push(i[a]={id:a,parts:[A]})}return n}n.r(e),n.d(e,"default",function(){return f});var o="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!o)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var r={},a=o&&(document.head||document.getElementsByTagName("head")[0]),A=null,s=0,c=!1,l=function(){},u=null,d="data-vue-ssr-id",p="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function f(t,e,n,o){c=n,u=o||{};var a=i(t,e);return h(a),function(e){for(var n=[],o=0;o<a.length;o++){var A=a[o];(s=r[A.id]).refs--,n.push(s)}e?h(a=i(t,e)):a=[];for(o=0;o<n.length;o++){var s;if(0===(s=n[o]).refs){for(var c=0;c<s.parts.length;c++)s.parts[c]();delete r[s.id]}}}}function h(t){for(var e=0;e<t.length;e++){var n=t[e],i=r[n.id];if(i){i.refs++;for(var o=0;o<i.parts.length;o++)i.parts[o](n.parts[o]);for(;o<n.parts.length;o++)i.parts.push(m(n.parts[o]));i.parts.length>n.parts.length&&(i.parts.length=n.parts.length)}else{var a=[];for(o=0;o<n.parts.length;o++)a.push(m(n.parts[o]));r[n.id]={id:n.id,refs:1,parts:a}}}}function v(){var t=document.createElement("style");return t.type="text/css",a.appendChild(t),t}function m(t){var e,n,i=document.querySelector("style["+d+'~="'+t.id+'"]');if(i){if(c)return l;i.parentNode.removeChild(i)}if(p){var o=s++;i=A||(A=v()),e=b.bind(null,i,o,!1),n=b.bind(null,i,o,!0)}else i=v(),e=function(t,e){var n=e.css,i=e.media,o=e.sourceMap;i&&t.setAttribute("media",i);u.ssrId&&t.setAttribute(d,e.id);o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,i),n=function(){i.parentNode.removeChild(i)};return e(t),function(i){if(i){if(i.css===t.css&&i.media===t.media&&i.sourceMap===t.sourceMap)return;e(t=i)}else n()}}var g,y=(g=[],function(t,e){return g[t]=e,g.filter(Boolean).join("\n")});function b(t,e,n,i){var o=n?"":i.css;if(t.styleSheet)t.styleSheet.cssText=y(e,o);else{var r=document.createTextNode(o),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(r,a[e]):t.appendChild(r)}}},21:function(t,e,n){"use strict";(function(t){n.d(e,"a",function(){return r});var i=void 0;function o(){o.init||(o.init=!0,i=-1!==function(){var t=window.navigator.userAgent,e=t.indexOf("MSIE ");if(e>0)return parseInt(t.substring(e+5,t.indexOf(".",e)),10);if(t.indexOf("Trident/")>0){var n=t.indexOf("rv:");return parseInt(t.substring(n+3,t.indexOf(".",n)),10)}var i=t.indexOf("Edge/");return i>0?parseInt(t.substring(i+5,t.indexOf(".",i)),10):-1}())}var r={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"resize-observer",attrs:{tabindex:"-1"}})},staticRenderFns:[],_scopeId:"data-v-b329ee4c",name:"resize-observer",methods:{compareAndNotify:function(){this._w===this.$el.offsetWidth&&this._h===this.$el.offsetHeight||(this._w=this.$el.offsetWidth,this._h=this.$el.offsetHeight,this.$emit("notify"))},addResizeHandlers:function(){this._resizeObject.contentDocument.defaultView.addEventListener("resize",this.compareAndNotify),this.compareAndNotify()},removeResizeHandlers:function(){this._resizeObject&&this._resizeObject.onload&&(!i&&this._resizeObject.contentDocument&&this._resizeObject.contentDocument.defaultView.removeEventListener("resize",this.compareAndNotify),delete this._resizeObject.onload)}},mounted:function(){var t=this;o(),this.$nextTick(function(){t._w=t.$el.offsetWidth,t._h=t.$el.offsetHeight});var e=document.createElement("object");this._resizeObject=e,e.setAttribute("aria-hidden","true"),e.setAttribute("tabindex",-1),e.onload=this.addResizeHandlers,e.type="text/html",i&&this.$el.appendChild(e),e.data="about:blank",i||this.$el.appendChild(e)},beforeDestroy:function(){this.removeResizeHandlers()}};var a={version:"0.4.5",install:function(t){t.component("resize-observer",r),t.component("ResizeObserver",r)}},A=null;"undefined"!=typeof window?A=window.Vue:void 0!==t&&(A=t.Vue),A&&A.use(a)}).call(this,n(16))},22:function(t,e,n){var i=n(83);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("78a6bd38",i,!0,{})},23:function(t,e,n){"use strict";
/**
 * @copyright Copyright (c) 2018 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */e.a=function(t){t.mounted?Array.isArray(t.mounted)||(t.mounted=[t.mounted]):t.mounted=[],t.mounted.push(function(){this.$el.setAttribute("data-v-".concat("e56a121"),"")})}},25:function(t,e){},26:function(t,e,n){var i=n(95);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("2601b667",i,!0,{})},3:function(t,n){t.exports=e},30:function(t,e,n){"use strict";n.r(e);var i=n(14),o=n(7),r=n(8),a=function(t){var e=t.getBoundingClientRect(),n=document.documentElement.clientHeight,i=document.documentElement.clientWidth,o=Object.assign({});return o.top=e.top<0,o.left=e.left<0,o.bottom=e.bottom>n,o.right=e.right>i,o.any=o.top||o.left||o.bottom||o.right,o.all=o.top&&o.left&&o.bottom&&o.right,o.offsetY=o.top?e.top:o.bottom?e.bottom-n:0,o.offsetX=o.left?e.left:o.right?e.right-i:0,o},A=n(3),s=n.n(A),c=function(t,e,n){void 0!==t&&t.forEach(function(i,o){var r=!i.componentOptions&&i.tag,a=i.componentOptions&&"string"==typeof i.componentOptions.tag&&-1===e.indexOf(i.componentOptions.tag);(r||a)&&(s.a.util.warn("".concat(r?i.tag:i.componentOptions.tag," is not allowed inside the ").concat(n.$options.name," component"),n),t.splice(o,1))})},l=["ActionButton","ActionCheckbox","ActionInput","ActionLink","ActionRadio","ActionRouter","ActionText","ActionTextEditable"],u={name:"Actions",directives:{ClickOutside:i.directive,tooltip:o.default},props:{open:{type:Boolean,default:!1},forceMenu:{type:Boolean,default:!1},menuAlign:{type:String,default:"center",validator:function(t){return["left","center","right"].indexOf(t)>-1}}},data:function(){return{actions:[],opened:this.open,focusIndex:0,randomId:"menu-"+Object(r.a)(),offsetX:0,children:this.$children}},computed:{hasMultipleActions:function(){return this.actions.length>1},isValidSingleAction:function(){return 1===this.actions.length&&null!==this.firstActionElement},firstActionVNode:function(){return this.actions[0]},firstAction:function(){return this.children[0]?this.children[0]:{}},firstActionBinding:function(){if(this.firstActionVNode&&this.firstActionVNode.componentOptions){var t=this.firstActionVNode.componentOptions.tag;if("ActionLink"===t)return{is:"a",href:this.firstAction.href,target:this.firstAction.target};if("ActionRouter"===t)return{is:"router-link",to:this.firstAction.to,exact:this.firstAction.exact};if("ActionButton"===t)return{is:"button"}}return null},firstActionEvent:function(){return this.firstActionVNode&&this.firstActionVNode.componentOptions&&this.firstActionVNode.componentOptions.listeners&&this.firstActionVNode.componentOptions.listeners.click},firstActionEventBinding:function(){return this.firstActionEvent?"click":null},firstActionClass:function(){var t=this.firstActionVNode&&this.firstActionVNode.data.staticClass,e=this.firstActionVNode&&this.firstActionVNode.data.class;return"".concat(t," ").concat(e)}},watch:{open:function(t){var e=this;this.opened=t,this.opened&&this.$nextTick(function(){e.onOpen()})}},beforeMount:function(){this.initActions(),c(this.$slots.default,l,this)},beforeUpdate:function(){this.initActions(),c(this.$slots.default,l,this)},methods:{toggleMenu:function(){var t=this;this.opened=!this.opened,this.opened?(this.$nextTick(function(){t.onOpen(),t.focusFirstAction()}),this.$emit("open")):this.offsetX=0,this.$emit("update:open",this.opened)},closeMenu:function(){this.opened&&(this.$emit("update:open",!1),this.$emit("close")),this.opened=!1,this.offsetX=0},onOpen:function(){this.offsetX=0;var t=a(this.$refs.menu);t.any&&(this.offsetX=t.offsetX>0?Math.round(t.offsetX)+5:Math.round(t.offsetX)-5)},onMouseFocusAction:function(t){if(document.activeElement!==t.target){var e=t.target.closest("li");if(e){var n=e.querySelector(".focusable");if(n){var i=this.$refs.menu.querySelectorAll(".focusable"),o=Array.prototype.indexOf.call(i,n);o>-1&&(this.focusIndex=o,this.focusAction())}}}},removeCurrentActive:function(){var t=this.$refs.menu.querySelector("li.active");t&&t.classList.remove("active")},focusAction:function(){var t=this.$refs.menu.querySelectorAll(".focusable")[this.focusIndex];if(t){var e=t.closest("li");t.focus(),e&&(this.removeCurrentActive(),e.classList.add("active"))}},focusPreviousAction:function(){this.focusIndex=Math.max(this.focusIndex-1,0),this.focusAction()},focusNextAction:function(){this.focusIndex=Math.min(this.focusIndex+1,this.$refs.menu.querySelectorAll(".focusable").length-1),this.focusAction()},focusFirstAction:function(){this.focusIndex=0,this.focusAction()},focusLastAction:function(){this.focusIndex=this.$el.querySelectorAll(".focusable").length-1,this.focusAction()},execFirstAction:function(t){this.firstActionEvent&&this.firstActionEvent(t)},initActions:function(){this.actions=(this.$slots.default||[]).filter(function(t){return!!t&&!!t.componentOptions})}}},d=(n(82),n(0)),p=n(25),f=n.n(p),h=Object(d.a)(u,function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.isValidSingleAction&&!t.forceMenu?n("element",t._b({directives:[{name:"tooltip",rawName:"v-tooltip.auto",value:t.firstAction.text,expression:"firstAction.text",modifiers:{auto:!0}}],staticClass:"action-item action-item--single",class:[t.firstAction.icon,t.firstActionClass],attrs:{"aria-label":t.firstAction.text,rel:"noreferrer noopener"},on:t._d({},[t.firstActionEventBinding,t.execFirstAction])},"element",t.firstActionBinding,!1),[n("span",{attrs:{"aria-hidden":!0,hidden:""}},[t._t("default")],2)]):n("div",{directives:[{name:"show",rawName:"v-show",value:t.hasMultipleActions||t.forceMenu,expression:"hasMultipleActions || forceMenu"}],staticClass:"action-item",class:{"action-item--open":t.opened},on:{keydown:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])?null:e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:(e.preventDefault(),t.focusPreviousAction(e))},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?null:e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:(e.preventDefault(),t.focusNextAction(e))},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"tab",9,e.key,"Tab")?null:e.shiftKey?(e.preventDefault(),t.focusPreviousAction(e)):null},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"page-up",void 0,e.key,void 0)?null:e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:(e.preventDefault(),t.focusFirstAction(e))},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"page-down",void 0,e.key,void 0)?null:e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:(e.preventDefault(),t.focusLastAction(e))},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])?null:e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:(e.preventDefault(),t.closeMenu(e))}]}},[n("a",{staticClass:"icon action-item__menutoggle",attrs:{href:"#","aria-haspopup":"true","aria-controls":t.randomId,"aria-expanded":t.opened},on:{click:function(e){return e.preventDefault(),t.toggleMenu(e)},keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"space",32,e.key,[" ","Spacebar"])?null:e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:(e.preventDefault(),t.toggleMenu(e))}}}),t._v(" "),t.opened?n("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:t.closeMenu,expression:"closeMenu"}],ref:"menu",staticClass:"action-item__menu",class:["menu-"+t.menuAlign,{open:t.opened}],style:{marginRight:t.offsetX+"px"},attrs:{tabindex:"-1"},on:{mousemove:t.onMouseFocusAction}},[n("div",{staticClass:"action-item__menu_arrow",style:{transform:"translateX("+t.offsetX+"px)"}}),t._v(" "),n("ul",{attrs:{id:t.randomId,tabindex:"-1"}},[t._t("default")],2)]):t._e()])},[],!1,null,"8b9f5c88",null);"function"==typeof f.a&&f()(h);var v=h.exports;n.d(e,"Actions",function(){return v});
/**
 * @copyright Copyright (c) 2018 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */e.default=v},32:function(t,e,n){var i=n(33);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("941c791e",i,!0,{})},33:function(t,e,n){(t.exports=n(1)(!1)).push([t.i,".vue-tooltip[data-v-e56a121]{position:absolute;z-index:100000;right:auto;left:auto;display:block;margin:0;margin-top:-3px;padding:10px 0;text-align:left;text-align:start;white-space:normal;text-decoration:none;letter-spacing:normal;word-spacing:normal;text-transform:none;word-wrap:normal;word-break:normal;opacity:0;text-shadow:none;font-family:'Nunito', 'Open Sans', Frutiger, Calibri, 'Myriad Pro', Myriad, sans-serif;font-size:12px;font-weight:normal;font-style:normal;line-height:1.6;line-break:auto;filter:drop-shadow(0 1px 10px var(--color-box-shadow))}.vue-tooltip[data-v-e56a121][x-placement^='top'] .tooltip-arrow{bottom:0;margin-top:0;margin-bottom:0;border-width:10px 10px 0 10px;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent}.vue-tooltip[data-v-e56a121][x-placement^='bottom'] .tooltip-arrow{top:0;margin-top:0;margin-bottom:0;border-width:0 10px 10px 10px;border-top-color:transparent;border-right-color:transparent;border-left-color:transparent}.vue-tooltip[data-v-e56a121][x-placement^='right'] .tooltip-arrow{right:100%;margin-right:0;margin-left:0;border-width:10px 10px 10px 0;border-top-color:transparent;border-bottom-color:transparent;border-left-color:transparent}.vue-tooltip[data-v-e56a121][x-placement^='left'] .tooltip-arrow{left:100%;margin-right:0;margin-left:0;border-width:10px 0 10px 10px;border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent}.vue-tooltip[data-v-e56a121][aria-hidden='true']{visibility:hidden;transition:opacity .15s, visibility .15s;opacity:0}.vue-tooltip[data-v-e56a121][aria-hidden='false']{visibility:visible;transition:opacity .15s;opacity:1}.vue-tooltip[data-v-e56a121] .tooltip-inner{max-width:350px;padding:5px 8px;text-align:center;color:var(--color-main-text);border-radius:var(--border-radius);background-color:var(--color-main-background)}.vue-tooltip[data-v-e56a121] .tooltip-arrow{position:absolute;z-index:1;width:0;height:0;margin:0;border-style:solid;border-color:var(--color-main-background)}\n",""])},35:function(t,e){},40:function(t,e,n){var i;
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
!function(o,r,a,A){"use strict";var s,c=["","webkit","Moz","MS","ms","o"],l=r.createElement("div"),u="function",d=Math.round,p=Math.abs,f=Date.now;function h(t,e,n){return setTimeout(E(t,n),e)}function v(t,e,n){return!!Array.isArray(t)&&(m(t,n[e],n),!0)}function m(t,e,n){var i;if(t)if(t.forEach)t.forEach(e,n);else if(t.length!==A)for(i=0;i<t.length;)e.call(n,t[i],i,t),i++;else for(i in t)t.hasOwnProperty(i)&&e.call(n,t[i],i,t)}function g(t,e,n){var i="DEPRECATED METHOD: "+e+"\n"+n+" AT \n";return function(){var e=new Error("get-stack-trace"),n=e&&e.stack?e.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",r=o.console&&(o.console.warn||o.console.log);return r&&r.call(o.console,i,n),t.apply(this,arguments)}}s="function"!=typeof Object.assign?function(t){if(t===A||null===t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),n=1;n<arguments.length;n++){var i=arguments[n];if(i!==A&&null!==i)for(var o in i)i.hasOwnProperty(o)&&(e[o]=i[o])}return e}:Object.assign;var y=g(function(t,e,n){for(var i=Object.keys(e),o=0;o<i.length;)(!n||n&&t[i[o]]===A)&&(t[i[o]]=e[i[o]]),o++;return t},"extend","Use `assign`."),b=g(function(t,e){return y(t,e,!0)},"merge","Use `assign`.");function w(t,e,n){var i,o=e.prototype;(i=t.prototype=Object.create(o)).constructor=t,i._super=o,n&&s(i,n)}function E(t,e){return function(){return t.apply(e,arguments)}}function T(t,e){return typeof t==u?t.apply(e&&e[0]||A,e):t}function x(t,e){return t===A?e:t}function B(t,e,n){m(I(e),function(e){t.addEventListener(e,n,!1)})}function C(t,e,n){m(I(e),function(e){t.removeEventListener(e,n,!1)})}function _(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1}function M(t,e){return t.indexOf(e)>-1}function I(t){return t.trim().split(/\s+/g)}function N(t,e,n){if(t.indexOf&&!n)return t.indexOf(e);for(var i=0;i<t.length;){if(n&&t[i][n]==e||!n&&t[i]===e)return i;i++}return-1}function O(t){return Array.prototype.slice.call(t,0)}function D(t,e,n){for(var i=[],o=[],r=0;r<t.length;){var a=e?t[r][e]:t[r];N(o,a)<0&&i.push(t[r]),o[r]=a,r++}return n&&(i=e?i.sort(function(t,n){return t[e]>n[e]}):i.sort()),i}function Q(t,e){for(var n,i,o=e[0].toUpperCase()+e.slice(1),r=0;r<c.length;){if((i=(n=c[r])?n+o:e)in t)return i;r++}return A}var k=1;function S(t){var e=t.ownerDocument||t;return e.defaultView||e.parentWindow||o}var L="ontouchstart"in o,j=Q(o,"PointerEvent")!==A,Y=L&&/mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent),G=25,z=1,P=2,H=4,F=8,U=1,R=2,Z=4,W=8,$=16,V=R|Z,X=W|$,J=V|X,K=["x","y"],q=["clientX","clientY"];function tt(t,e){var n=this;this.manager=t,this.callback=e,this.element=t.element,this.target=t.options.inputTarget,this.domHandler=function(e){T(t.options.enable,[t])&&n.handler(e)},this.init()}function et(t,e,n){var i=n.pointers.length,o=n.changedPointers.length,r=e&z&&i-o==0,a=e&(H|F)&&i-o==0;n.isFirst=!!r,n.isFinal=!!a,r&&(t.session={}),n.eventType=e,function(t,e){var n=t.session,i=e.pointers,o=i.length;n.firstInput||(n.firstInput=nt(e));o>1&&!n.firstMultiple?n.firstMultiple=nt(e):1===o&&(n.firstMultiple=!1);var r=n.firstInput,a=n.firstMultiple,s=a?a.center:r.center,c=e.center=it(i);e.timeStamp=f(),e.deltaTime=e.timeStamp-r.timeStamp,e.angle=At(s,c),e.distance=at(s,c),function(t,e){var n=e.center,i=t.offsetDelta||{},o=t.prevDelta||{},r=t.prevInput||{};e.eventType!==z&&r.eventType!==H||(o=t.prevDelta={x:r.deltaX||0,y:r.deltaY||0},i=t.offsetDelta={x:n.x,y:n.y});e.deltaX=o.x+(n.x-i.x),e.deltaY=o.y+(n.y-i.y)}(n,e),e.offsetDirection=rt(e.deltaX,e.deltaY);var l=ot(e.deltaTime,e.deltaX,e.deltaY);e.overallVelocityX=l.x,e.overallVelocityY=l.y,e.overallVelocity=p(l.x)>p(l.y)?l.x:l.y,e.scale=a?(u=a.pointers,d=i,at(d[0],d[1],q)/at(u[0],u[1],q)):1,e.rotation=a?function(t,e){return At(e[1],e[0],q)+At(t[1],t[0],q)}(a.pointers,i):0,e.maxPointers=n.prevInput?e.pointers.length>n.prevInput.maxPointers?e.pointers.length:n.prevInput.maxPointers:e.pointers.length,function(t,e){var n,i,o,r,a=t.lastInterval||e,s=e.timeStamp-a.timeStamp;if(e.eventType!=F&&(s>G||a.velocity===A)){var c=e.deltaX-a.deltaX,l=e.deltaY-a.deltaY,u=ot(s,c,l);i=u.x,o=u.y,n=p(u.x)>p(u.y)?u.x:u.y,r=rt(c,l),t.lastInterval=e}else n=a.velocity,i=a.velocityX,o=a.velocityY,r=a.direction;e.velocity=n,e.velocityX=i,e.velocityY=o,e.direction=r}(n,e);var u,d;var h=t.element;_(e.srcEvent.target,h)&&(h=e.srcEvent.target);e.target=h}(t,n),t.emit("hammer.input",n),t.recognize(n),t.session.prevInput=n}function nt(t){for(var e=[],n=0;n<t.pointers.length;)e[n]={clientX:d(t.pointers[n].clientX),clientY:d(t.pointers[n].clientY)},n++;return{timeStamp:f(),pointers:e,center:it(e),deltaX:t.deltaX,deltaY:t.deltaY}}function it(t){var e=t.length;if(1===e)return{x:d(t[0].clientX),y:d(t[0].clientY)};for(var n=0,i=0,o=0;o<e;)n+=t[o].clientX,i+=t[o].clientY,o++;return{x:d(n/e),y:d(i/e)}}function ot(t,e,n){return{x:e/t||0,y:n/t||0}}function rt(t,e){return t===e?U:p(t)>=p(e)?t<0?R:Z:e<0?W:$}function at(t,e,n){n||(n=K);var i=e[n[0]]-t[n[0]],o=e[n[1]]-t[n[1]];return Math.sqrt(i*i+o*o)}function At(t,e,n){n||(n=K);var i=e[n[0]]-t[n[0]],o=e[n[1]]-t[n[1]];return 180*Math.atan2(o,i)/Math.PI}tt.prototype={handler:function(){},init:function(){this.evEl&&B(this.element,this.evEl,this.domHandler),this.evTarget&&B(this.target,this.evTarget,this.domHandler),this.evWin&&B(S(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&C(this.element,this.evEl,this.domHandler),this.evTarget&&C(this.target,this.evTarget,this.domHandler),this.evWin&&C(S(this.element),this.evWin,this.domHandler)}};var st={mousedown:z,mousemove:P,mouseup:H},ct="mousedown",lt="mousemove mouseup";function ut(){this.evEl=ct,this.evWin=lt,this.pressed=!1,tt.apply(this,arguments)}w(ut,tt,{handler:function(t){var e=st[t.type];e&z&&0===t.button&&(this.pressed=!0),e&P&&1!==t.which&&(e=H),this.pressed&&(e&H&&(this.pressed=!1),this.callback(this.manager,e,{pointers:[t],changedPointers:[t],pointerType:"mouse",srcEvent:t}))}});var dt={pointerdown:z,pointermove:P,pointerup:H,pointercancel:F,pointerout:F},pt={2:"touch",3:"pen",4:"mouse",5:"kinect"},ft="pointerdown",ht="pointermove pointerup pointercancel";function vt(){this.evEl=ft,this.evWin=ht,tt.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}o.MSPointerEvent&&!o.PointerEvent&&(ft="MSPointerDown",ht="MSPointerMove MSPointerUp MSPointerCancel"),w(vt,tt,{handler:function(t){var e=this.store,n=!1,i=t.type.toLowerCase().replace("ms",""),o=dt[i],r=pt[t.pointerType]||t.pointerType,a="touch"==r,A=N(e,t.pointerId,"pointerId");o&z&&(0===t.button||a)?A<0&&(e.push(t),A=e.length-1):o&(H|F)&&(n=!0),A<0||(e[A]=t,this.callback(this.manager,o,{pointers:e,changedPointers:[t],pointerType:r,srcEvent:t}),n&&e.splice(A,1))}});var mt={touchstart:z,touchmove:P,touchend:H,touchcancel:F},gt="touchstart",yt="touchstart touchmove touchend touchcancel";function bt(){this.evTarget=gt,this.evWin=yt,this.started=!1,tt.apply(this,arguments)}w(bt,tt,{handler:function(t){var e=mt[t.type];if(e===z&&(this.started=!0),this.started){var n=function(t,e){var n=O(t.touches),i=O(t.changedTouches);e&(H|F)&&(n=D(n.concat(i),"identifier",!0));return[n,i]}.call(this,t,e);e&(H|F)&&n[0].length-n[1].length==0&&(this.started=!1),this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:"touch",srcEvent:t})}}});var wt={touchstart:z,touchmove:P,touchend:H,touchcancel:F},Et="touchstart touchmove touchend touchcancel";function Tt(){this.evTarget=Et,this.targetIds={},tt.apply(this,arguments)}w(Tt,tt,{handler:function(t){var e=wt[t.type],n=function(t,e){var n=O(t.touches),i=this.targetIds;if(e&(z|P)&&1===n.length)return i[n[0].identifier]=!0,[n,n];var o,r,a=O(t.changedTouches),A=[],s=this.target;if(r=n.filter(function(t){return _(t.target,s)}),e===z)for(o=0;o<r.length;)i[r[o].identifier]=!0,o++;o=0;for(;o<a.length;)i[a[o].identifier]&&A.push(a[o]),e&(H|F)&&delete i[a[o].identifier],o++;if(!A.length)return;return[D(r.concat(A),"identifier",!0),A]}.call(this,t,e);n&&this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:"touch",srcEvent:t})}});var xt=2500,Bt=25;function Ct(){tt.apply(this,arguments);var t=E(this.handler,this);this.touch=new Tt(this.manager,t),this.mouse=new ut(this.manager,t),this.primaryTouch=null,this.lastTouches=[]}function _t(t){var e=t.changedPointers[0];if(e.identifier===this.primaryTouch){var n={x:e.clientX,y:e.clientY};this.lastTouches.push(n);var i=this.lastTouches;setTimeout(function(){var t=i.indexOf(n);t>-1&&i.splice(t,1)},xt)}}w(Ct,tt,{handler:function(t,e,n){var i="touch"==n.pointerType,o="mouse"==n.pointerType;if(!(o&&n.sourceCapabilities&&n.sourceCapabilities.firesTouchEvents)){if(i)(function(t,e){t&z?(this.primaryTouch=e.changedPointers[0].identifier,_t.call(this,e)):t&(H|F)&&_t.call(this,e)}).call(this,e,n);else if(o&&function(t){for(var e=t.srcEvent.clientX,n=t.srcEvent.clientY,i=0;i<this.lastTouches.length;i++){var o=this.lastTouches[i],r=Math.abs(e-o.x),a=Math.abs(n-o.y);if(r<=Bt&&a<=Bt)return!0}return!1}.call(this,n))return;this.callback(t,e,n)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Mt=Q(l.style,"touchAction"),It=Mt!==A,Nt="auto",Ot="manipulation",Dt="none",Qt="pan-x",kt="pan-y",St=function(){if(!It)return!1;var t={},e=o.CSS&&o.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(n){t[n]=!e||o.CSS.supports("touch-action",n)}),t}();function Lt(t,e){this.manager=t,this.set(e)}Lt.prototype={set:function(t){"compute"==t&&(t=this.compute()),It&&this.manager.element.style&&St[t]&&(this.manager.element.style[Mt]=t),this.actions=t.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var t=[];return m(this.manager.recognizers,function(e){T(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()))}),function(t){if(M(t,Dt))return Dt;var e=M(t,Qt),n=M(t,kt);if(e&&n)return Dt;if(e||n)return e?Qt:kt;if(M(t,Ot))return Ot;return Nt}(t.join(" "))},preventDefaults:function(t){var e=t.srcEvent,n=t.offsetDirection;if(this.manager.session.prevented)e.preventDefault();else{var i=this.actions,o=M(i,Dt)&&!St[Dt],r=M(i,kt)&&!St[kt],a=M(i,Qt)&&!St[Qt];if(o){var A=1===t.pointers.length,s=t.distance<2,c=t.deltaTime<250;if(A&&s&&c)return}if(!a||!r)return o||r&&n&V||a&&n&X?this.preventSrc(e):void 0}},preventSrc:function(t){this.manager.session.prevented=!0,t.preventDefault()}};var jt=1,Yt=2,Gt=4,zt=8,Pt=zt,Ht=16;function Ft(t){this.options=s({},this.defaults,t||{}),this.id=k++,this.manager=null,this.options.enable=x(this.options.enable,!0),this.state=jt,this.simultaneous={},this.requireFail=[]}function Ut(t){return t&Ht?"cancel":t&zt?"end":t&Gt?"move":t&Yt?"start":""}function Rt(t){return t==$?"down":t==W?"up":t==R?"left":t==Z?"right":""}function Zt(t,e){var n=e.manager;return n?n.get(t):t}function Wt(){Ft.apply(this,arguments)}function $t(){Wt.apply(this,arguments),this.pX=null,this.pY=null}function Vt(){Wt.apply(this,arguments)}function Xt(){Ft.apply(this,arguments),this._timer=null,this._input=null}function Jt(){Wt.apply(this,arguments)}function Kt(){Wt.apply(this,arguments)}function qt(){Ft.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function te(t,e){return(e=e||{}).recognizers=x(e.recognizers,te.defaults.preset),new ee(t,e)}Ft.prototype={defaults:{},set:function(t){return s(this.options,t),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(t){if(v(t,"recognizeWith",this))return this;var e=this.simultaneous;return e[(t=Zt(t,this)).id]||(e[t.id]=t,t.recognizeWith(this)),this},dropRecognizeWith:function(t){return v(t,"dropRecognizeWith",this)?this:(t=Zt(t,this),delete this.simultaneous[t.id],this)},requireFailure:function(t){if(v(t,"requireFailure",this))return this;var e=this.requireFail;return-1===N(e,t=Zt(t,this))&&(e.push(t),t.requireFailure(this)),this},dropRequireFailure:function(t){if(v(t,"dropRequireFailure",this))return this;t=Zt(t,this);var e=N(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(t){return!!this.simultaneous[t.id]},emit:function(t){var e=this,n=this.state;function i(n){e.manager.emit(n,t)}n<zt&&i(e.options.event+Ut(n)),i(e.options.event),t.additionalEvent&&i(t.additionalEvent),n>=zt&&i(e.options.event+Ut(n))},tryEmit:function(t){if(this.canEmit())return this.emit(t);this.state=32},canEmit:function(){for(var t=0;t<this.requireFail.length;){if(!(this.requireFail[t].state&(32|jt)))return!1;t++}return!0},recognize:function(t){var e=s({},t);if(!T(this.options.enable,[this,e]))return this.reset(),void(this.state=32);this.state&(Pt|Ht|32)&&(this.state=jt),this.state=this.process(e),this.state&(Yt|Gt|zt|Ht)&&this.tryEmit(e)},process:function(t){},getTouchAction:function(){},reset:function(){}},w(Wt,Ft,{defaults:{pointers:1},attrTest:function(t){var e=this.options.pointers;return 0===e||t.pointers.length===e},process:function(t){var e=this.state,n=t.eventType,i=e&(Yt|Gt),o=this.attrTest(t);return i&&(n&F||!o)?e|Ht:i||o?n&H?e|zt:e&Yt?e|Gt:Yt:32}}),w($t,Wt,{defaults:{event:"pan",threshold:10,pointers:1,direction:J},getTouchAction:function(){var t=this.options.direction,e=[];return t&V&&e.push(kt),t&X&&e.push(Qt),e},directionTest:function(t){var e=this.options,n=!0,i=t.distance,o=t.direction,r=t.deltaX,a=t.deltaY;return o&e.direction||(e.direction&V?(o=0===r?U:r<0?R:Z,n=r!=this.pX,i=Math.abs(t.deltaX)):(o=0===a?U:a<0?W:$,n=a!=this.pY,i=Math.abs(t.deltaY))),t.direction=o,n&&i>e.threshold&&o&e.direction},attrTest:function(t){return Wt.prototype.attrTest.call(this,t)&&(this.state&Yt||!(this.state&Yt)&&this.directionTest(t))},emit:function(t){this.pX=t.deltaX,this.pY=t.deltaY;var e=Rt(t.direction);e&&(t.additionalEvent=this.options.event+e),this._super.emit.call(this,t)}}),w(Vt,Wt,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[Dt]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.scale-1)>this.options.threshold||this.state&Yt)},emit:function(t){if(1!==t.scale){var e=t.scale<1?"in":"out";t.additionalEvent=this.options.event+e}this._super.emit.call(this,t)}}),w(Xt,Ft,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[Nt]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.threshold,o=t.deltaTime>e.time;if(this._input=t,!i||!n||t.eventType&(H|F)&&!o)this.reset();else if(t.eventType&z)this.reset(),this._timer=h(function(){this.state=Pt,this.tryEmit()},e.time,this);else if(t.eventType&H)return Pt;return 32},reset:function(){clearTimeout(this._timer)},emit:function(t){this.state===Pt&&(t&&t.eventType&H?this.manager.emit(this.options.event+"up",t):(this._input.timeStamp=f(),this.manager.emit(this.options.event,this._input)))}}),w(Jt,Wt,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[Dt]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.rotation)>this.options.threshold||this.state&Yt)}}),w(Kt,Wt,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:V|X,pointers:1},getTouchAction:function(){return $t.prototype.getTouchAction.call(this)},attrTest:function(t){var e,n=this.options.direction;return n&(V|X)?e=t.overallVelocity:n&V?e=t.overallVelocityX:n&X&&(e=t.overallVelocityY),this._super.attrTest.call(this,t)&&n&t.offsetDirection&&t.distance>this.options.threshold&&t.maxPointers==this.options.pointers&&p(e)>this.options.velocity&&t.eventType&H},emit:function(t){var e=Rt(t.offsetDirection);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t)}}),w(qt,Ft,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[Ot]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.threshold,o=t.deltaTime<e.time;if(this.reset(),t.eventType&z&&0===this.count)return this.failTimeout();if(i&&o&&n){if(t.eventType!=H)return this.failTimeout();var r=!this.pTime||t.timeStamp-this.pTime<e.interval,a=!this.pCenter||at(this.pCenter,t.center)<e.posThreshold;if(this.pTime=t.timeStamp,this.pCenter=t.center,a&&r?this.count+=1:this.count=1,this._input=t,0===this.count%e.taps)return this.hasRequireFailures()?(this._timer=h(function(){this.state=Pt,this.tryEmit()},e.interval,this),Yt):Pt}return 32},failTimeout:function(){return this._timer=h(function(){this.state=32},this.options.interval,this),32},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==Pt&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),te.VERSION="2.0.7",te.defaults={domEvents:!1,touchAction:"compute",enable:!0,inputTarget:null,inputClass:null,preset:[[Jt,{enable:!1}],[Vt,{enable:!1},["rotate"]],[Kt,{direction:V}],[$t,{direction:V},["swipe"]],[qt],[qt,{event:"doubletap",taps:2},["tap"]],[Xt]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};function ee(t,e){var n;this.options=s({},te.defaults,e||{}),this.options.inputTarget=this.options.inputTarget||t,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=t,this.input=new((n=this).options.inputClass||(j?vt:Y?Tt:L?Ct:ut))(n,et),this.touchAction=new Lt(this,this.options.touchAction),ne(this,!0),m(this.options.recognizers,function(t){var e=this.add(new t[0](t[1]));t[2]&&e.recognizeWith(t[2]),t[3]&&e.requireFailure(t[3])},this)}function ne(t,e){var n,i=t.element;i.style&&(m(t.options.cssProps,function(o,r){n=Q(i.style,r),e?(t.oldCssProps[n]=i.style[n],i.style[n]=o):i.style[n]=t.oldCssProps[n]||""}),e||(t.oldCssProps={}))}ee.prototype={set:function(t){return s(this.options,t),t.touchAction&&this.touchAction.update(),t.inputTarget&&(this.input.destroy(),this.input.target=t.inputTarget,this.input.init()),this},stop:function(t){this.session.stopped=t?2:1},recognize:function(t){var e=this.session;if(!e.stopped){var n;this.touchAction.preventDefaults(t);var i=this.recognizers,o=e.curRecognizer;(!o||o&&o.state&Pt)&&(o=e.curRecognizer=null);for(var r=0;r<i.length;)n=i[r],2===e.stopped||o&&n!=o&&!n.canRecognizeWith(o)?n.reset():n.recognize(t),!o&&n.state&(Yt|Gt|zt)&&(o=e.curRecognizer=n),r++}},get:function(t){if(t instanceof Ft)return t;for(var e=this.recognizers,n=0;n<e.length;n++)if(e[n].options.event==t)return e[n];return null},add:function(t){if(v(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t},remove:function(t){if(v(t,"remove",this))return this;if(t=this.get(t)){var e=this.recognizers,n=N(e,t);-1!==n&&(e.splice(n,1),this.touchAction.update())}return this},on:function(t,e){if(t!==A&&e!==A){var n=this.handlers;return m(I(t),function(t){n[t]=n[t]||[],n[t].push(e)}),this}},off:function(t,e){if(t!==A){var n=this.handlers;return m(I(t),function(t){e?n[t]&&n[t].splice(N(n[t],e),1):delete n[t]}),this}},emit:function(t,e){this.options.domEvents&&function(t,e){var n=r.createEvent("Event");n.initEvent(t,!0,!0),n.gesture=e,e.target.dispatchEvent(n)}(t,e);var n=this.handlers[t]&&this.handlers[t].slice();if(n&&n.length){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};for(var i=0;i<n.length;)n[i](e),i++}},destroy:function(){this.element&&ne(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},s(te,{INPUT_START:z,INPUT_MOVE:P,INPUT_END:H,INPUT_CANCEL:F,STATE_POSSIBLE:jt,STATE_BEGAN:Yt,STATE_CHANGED:Gt,STATE_ENDED:zt,STATE_RECOGNIZED:Pt,STATE_CANCELLED:Ht,STATE_FAILED:32,DIRECTION_NONE:U,DIRECTION_LEFT:R,DIRECTION_RIGHT:Z,DIRECTION_UP:W,DIRECTION_DOWN:$,DIRECTION_HORIZONTAL:V,DIRECTION_VERTICAL:X,DIRECTION_ALL:J,Manager:ee,Input:tt,TouchAction:Lt,TouchInput:Tt,MouseInput:ut,PointerEventInput:vt,TouchMouseInput:Ct,SingleTouchInput:bt,Recognizer:Ft,AttrRecognizer:Wt,Tap:qt,Pan:$t,Swipe:Kt,Pinch:Vt,Rotate:Jt,Press:Xt,on:B,off:C,each:m,merge:b,extend:y,assign:s,inherit:w,bindFn:E,prefixed:Q}),(void 0!==o?o:"undefined"!=typeof self?self:{}).Hammer=te,(i=function(){return te}.call(e,n,e,t))===A||(t.exports=i)}(window,document)},5:function(t,e,n){"use strict";var i=n(3),o=n.n(i);
/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */e.a={before:function(){this.$slots.default&&""!==this.text.trim()||(o.a.util.warn("".concat(this.$options.name," cannot be empty and requires a meaningful text content"),this),this.$destroy(),this.$el.remove())},beforeUpdate:function(){this.text=this.getText()},data:function(){return{text:this.getText()}},computed:{isLongText:function(){return this.text&&this.text.trim().length>20}},methods:{getText:function(){return this.$slots.default?this.$slots.default[0].text.trim():""}}}},6:function(t,e,n){"use strict";(function(t){n.d(e,"a",function(){return Qn});var i=n(17),o=n(21);function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function A(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},i=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),i.forEach(function(e){A(t,e,n[e])})}return t}var c=function(){};function l(t){return"string"==typeof t&&(t=t.split(" ")),t}function u(t,e){var n,i=l(e);n=t.className instanceof c?l(t.className.baseVal):l(t.className),i.forEach(function(t){-1===n.indexOf(t)&&n.push(t)}),t instanceof SVGElement?t.setAttribute("class",n.join(" ")):t.className=n.join(" ")}function d(t,e){var n,i=l(e);n=t.className instanceof c?l(t.className.baseVal):l(t.className),i.forEach(function(t){var e=n.indexOf(t);-1!==e&&n.splice(e,1)}),t instanceof SVGElement?t.setAttribute("class",n.join(" ")):t.className=n.join(" ")}"undefined"!=typeof window&&(c=window.SVGAnimatedString);var p=!1;if("undefined"!=typeof window){p=!1;try{var f=Object.defineProperty({},"passive",{get:function(){p=!0}});window.addEventListener("test",null,f)}catch(t){}}var h={container:!1,delay:0,html:!1,placement:"top",title:"",template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",offset:0},v=[],m=function(){function t(e,n){var i=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),A(this,"_events",[]),A(this,"_setTooltipNodeEvent",function(t,e,n,o){var r=t.relatedreference||t.toElement||t.relatedTarget;return!!i._tooltipNode.contains(r)&&(i._tooltipNode.addEventListener(t.type,function n(r){var a=r.relatedreference||r.toElement||r.relatedTarget;i._tooltipNode.removeEventListener(t.type,n),e.contains(a)||i._scheduleHide(e,o.delay,o,r)}),!0)}),n=s({},h,n),e.jquery&&(e=e[0]),this.show=this.show.bind(this),this.hide=this.hide.bind(this),this.reference=e,this.options=n,this._isOpen=!1,this._init()}var e,n,o;return e=t,(n=[{key:"show",value:function(){this._show(this.reference,this.options)}},{key:"hide",value:function(){this._hide()}},{key:"dispose",value:function(){this._dispose()}},{key:"toggle",value:function(){return this._isOpen?this.hide():this.show()}},{key:"setClasses",value:function(t){this._classes=t}},{key:"setContent",value:function(t){this.options.title=t,this._tooltipNode&&this._setContent(t,this.options)}},{key:"setOptions",value:function(t){var e=!1,n=t&&t.classes||C.options.defaultClass;this._classes!==n&&(this.setClasses(n),e=!0),t=w(t);var i=!1,o=!1;for(var r in this.options.offset===t.offset&&this.options.placement===t.placement||(i=!0),(this.options.template!==t.template||this.options.trigger!==t.trigger||this.options.container!==t.container||e)&&(o=!0),t)this.options[r]=t[r];if(this._tooltipNode)if(o){var a=this._isOpen;this.dispose(),this._init(),a&&this.show()}else i&&this.popperInstance.update()}},{key:"_init",value:function(){var t="string"==typeof this.options.trigger?this.options.trigger.split(" "):[];this._isDisposed=!1,this._enableDocumentTouch=-1===t.indexOf("manual"),t=t.filter(function(t){return-1!==["click","hover","focus"].indexOf(t)}),this._setEventListeners(this.reference,t,this.options),this.$_originalTitle=this.reference.getAttribute("title"),this.reference.removeAttribute("title"),this.reference.setAttribute("data-original-title",this.$_originalTitle)}},{key:"_create",value:function(t,e){var n=window.document.createElement("div");n.innerHTML=e.trim();var i=n.childNodes[0];return i.id="tooltip_".concat(Math.random().toString(36).substr(2,10)),i.setAttribute("aria-hidden","true"),this.options.autoHide&&-1!==this.options.trigger.indexOf("hover")&&(i.addEventListener("mouseenter",this.hide),i.addEventListener("click",this.hide)),i}},{key:"_setContent",value:function(t,e){var n=this;this.asyncContent=!1,this._applyContent(t,e).then(function(){n.popperInstance.update()})}},{key:"_applyContent",value:function(t,e){var n=this;return new Promise(function(i,o){var r=e.html,a=n._tooltipNode;if(a){var A=a.querySelector(n.options.innerSelector);if(1===t.nodeType){if(r){for(;A.firstChild;)A.removeChild(A.firstChild);A.appendChild(t)}}else{if("function"==typeof t){var s=t();return void(s&&"function"==typeof s.then?(n.asyncContent=!0,e.loadingClass&&u(a,e.loadingClass),e.loadingContent&&n._applyContent(e.loadingContent,e),s.then(function(t){return e.loadingClass&&d(a,e.loadingClass),n._applyContent(t,e)}).then(i).catch(o)):n._applyContent(s,e).then(i).catch(o))}r?A.innerHTML=t:A.innerText=t}i()}})}},{key:"_show",value:function(t,e){if(e&&"string"==typeof e.container&&!document.querySelector(e.container))return;clearTimeout(this._disposeTimer),delete(e=Object.assign({},e)).offset;var n=!0;this._tooltipNode&&(u(this._tooltipNode,this._classes),n=!1);var i=this._ensureShown(t,e);return n&&this._tooltipNode&&u(this._tooltipNode,this._classes),u(t,["v-tooltip-open"]),i}},{key:"_ensureShown",value:function(t,e){var n=this;if(this._isOpen)return this;if(this._isOpen=!0,v.push(this),this._tooltipNode)return this._tooltipNode.style.display="",this._tooltipNode.setAttribute("aria-hidden","false"),this.popperInstance.enableEventListeners(),this.popperInstance.update(),this.asyncContent&&this._setContent(e.title,e),this;var o=t.getAttribute("title")||e.title;if(!o)return this;var r=this._create(t,e.template);this._tooltipNode=r,t.setAttribute("aria-describedby",r.id);var a=this._findContainer(e.container,t);this._append(r,a);var A=s({},e.popperOptions,{placement:e.placement});return A.modifiers=s({},A.modifiers,{arrow:{element:this.options.arrowSelector}}),e.boundariesElement&&(A.modifiers.preventOverflow={boundariesElement:e.boundariesElement}),this.popperInstance=new i.a(t,r,A),this._setContent(o,e),requestAnimationFrame(function(){!n._isDisposed&&n.popperInstance?(n.popperInstance.update(),requestAnimationFrame(function(){n._isDisposed?n.dispose():n._isOpen&&r.setAttribute("aria-hidden","false")})):n.dispose()}),this}},{key:"_noLongerOpen",value:function(){var t=v.indexOf(this);-1!==t&&v.splice(t,1)}},{key:"_hide",value:function(){var t=this;if(!this._isOpen)return this;this._isOpen=!1,this._noLongerOpen(),this._tooltipNode.style.display="none",this._tooltipNode.setAttribute("aria-hidden","true"),this.popperInstance.disableEventListeners(),clearTimeout(this._disposeTimer);var e=C.options.disposeTimeout;return null!==e&&(this._disposeTimer=setTimeout(function(){t._tooltipNode&&(t._tooltipNode.removeEventListener("mouseenter",t.hide),t._tooltipNode.removeEventListener("click",t.hide),t._removeTooltipNode())},e)),d(this.reference,["v-tooltip-open"]),this}},{key:"_removeTooltipNode",value:function(){if(this._tooltipNode){var t=this._tooltipNode.parentNode;t&&(t.removeChild(this._tooltipNode),this.reference.removeAttribute("aria-describedby")),this._tooltipNode=null}}},{key:"_dispose",value:function(){var t=this;return this._isDisposed=!0,this.reference.removeAttribute("data-original-title"),this.$_originalTitle&&this.reference.setAttribute("title",this.$_originalTitle),this._events.forEach(function(e){var n=e.func,i=e.event;t.reference.removeEventListener(i,n)}),this._events=[],this._tooltipNode?(this._hide(),this._tooltipNode.removeEventListener("mouseenter",this.hide),this._tooltipNode.removeEventListener("click",this.hide),this.popperInstance.destroy(),this.popperInstance.options.removeOnDestroy||this._removeTooltipNode()):this._noLongerOpen(),this}},{key:"_findContainer",value:function(t,e){return"string"==typeof t?t=window.document.querySelector(t):!1===t&&(t=e.parentNode),t}},{key:"_append",value:function(t,e){e.appendChild(t)}},{key:"_setEventListeners",value:function(t,e,n){var i=this,o=[],r=[];e.forEach(function(t){switch(t){case"hover":o.push("mouseenter"),r.push("mouseleave"),i.options.hideOnTargetClick&&r.push("click");break;case"focus":o.push("focus"),r.push("blur"),i.options.hideOnTargetClick&&r.push("click");break;case"click":o.push("click"),r.push("click")}}),o.forEach(function(e){var o=function(e){!0!==i._isOpen&&(e.usedByTooltip=!0,i._scheduleShow(t,n.delay,n,e))};i._events.push({event:e,func:o}),t.addEventListener(e,o)}),r.forEach(function(e){var o=function(e){!0!==e.usedByTooltip&&i._scheduleHide(t,n.delay,n,e)};i._events.push({event:e,func:o}),t.addEventListener(e,o)})}},{key:"_onDocumentTouch",value:function(t){this._enableDocumentTouch&&this._scheduleHide(this.reference,this.options.delay,this.options,t)}},{key:"_scheduleShow",value:function(t,e,n){var i=this,o=e&&e.show||e||0;clearTimeout(this._scheduleTimer),this._scheduleTimer=window.setTimeout(function(){return i._show(t,n)},o)}},{key:"_scheduleHide",value:function(t,e,n,i){var o=this,r=e&&e.hide||e||0;clearTimeout(this._scheduleTimer),this._scheduleTimer=window.setTimeout(function(){if(!1!==o._isOpen&&document.body.contains(o._tooltipNode)){if("mouseleave"===i.type)if(o._setTooltipNodeEvent(i,t,e,n))return;o._hide(t,n)}},r)}}])&&a(e.prototype,n),o&&a(e,o),t}();"undefined"!=typeof document&&document.addEventListener("touchstart",function(t){for(var e=0;e<v.length;e++)v[e]._onDocumentTouch(t)},!p||{passive:!0,capture:!0});var g={enabled:!0},y=["top","top-start","top-end","right","right-start","right-end","bottom","bottom-start","bottom-end","left","left-start","left-end"],b={defaultPlacement:"top",defaultClass:"vue-tooltip-theme",defaultTargetClass:"has-tooltip",defaultHtml:!0,defaultTemplate:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',defaultArrowSelector:".tooltip-arrow, .tooltip__arrow",defaultInnerSelector:".tooltip-inner, .tooltip__inner",defaultDelay:0,defaultTrigger:"hover focus",defaultOffset:0,defaultContainer:"body",defaultBoundariesElement:void 0,defaultPopperOptions:{},defaultLoadingClass:"tooltip-loading",defaultLoadingContent:"...",autoHide:!0,defaultHideOnTargetClick:!0,disposeTimeout:5e3,popover:{defaultPlacement:"bottom",defaultClass:"vue-popover-theme",defaultBaseClass:"tooltip popover",defaultWrapperClass:"wrapper",defaultInnerClass:"tooltip-inner popover-inner",defaultArrowClass:"tooltip-arrow popover-arrow",defaultOpenClass:"open",defaultDelay:0,defaultTrigger:"click",defaultOffset:0,defaultContainer:"body",defaultBoundariesElement:void 0,defaultPopperOptions:{},defaultAutoHide:!0,defaultHandleResize:!0}};function w(t){var e={placement:void 0!==t.placement?t.placement:C.options.defaultPlacement,delay:void 0!==t.delay?t.delay:C.options.defaultDelay,html:void 0!==t.html?t.html:C.options.defaultHtml,template:void 0!==t.template?t.template:C.options.defaultTemplate,arrowSelector:void 0!==t.arrowSelector?t.arrowSelector:C.options.defaultArrowSelector,innerSelector:void 0!==t.innerSelector?t.innerSelector:C.options.defaultInnerSelector,trigger:void 0!==t.trigger?t.trigger:C.options.defaultTrigger,offset:void 0!==t.offset?t.offset:C.options.defaultOffset,container:void 0!==t.container?t.container:C.options.defaultContainer,boundariesElement:void 0!==t.boundariesElement?t.boundariesElement:C.options.defaultBoundariesElement,autoHide:void 0!==t.autoHide?t.autoHide:C.options.autoHide,hideOnTargetClick:void 0!==t.hideOnTargetClick?t.hideOnTargetClick:C.options.defaultHideOnTargetClick,loadingClass:void 0!==t.loadingClass?t.loadingClass:C.options.defaultLoadingClass,loadingContent:void 0!==t.loadingContent?t.loadingContent:C.options.defaultLoadingContent,popperOptions:s({},void 0!==t.popperOptions?t.popperOptions:C.options.defaultPopperOptions)};if(e.offset){var n=r(e.offset),i=e.offset;("number"===n||"string"===n&&-1===i.indexOf(","))&&(i="0, ".concat(i)),e.popperOptions.modifiers||(e.popperOptions.modifiers={}),e.popperOptions.modifiers.offset={offset:i}}return e.trigger&&-1!==e.trigger.indexOf("click")&&(e.hideOnTargetClick=!1),e}function E(t,e){for(var n=t.placement,i=0;i<y.length;i++){var o=y[i];e[o]&&(n=o)}return n}function T(t){var e=r(t);return"string"===e?t:!(!t||"object"!==e)&&t.content}function x(t){t._tooltip&&(t._tooltip.dispose(),delete t._tooltip,delete t._tooltipOldShow),t._tooltipTargetClasses&&(d(t,t._tooltipTargetClasses),delete t._tooltipTargetClasses)}function B(t,e){var n,i=e.value,o=(e.oldValue,e.modifiers),r=T(i);r&&g.enabled?(t._tooltip?((n=t._tooltip).setContent(r),n.setOptions(s({},i,{placement:E(i,o)}))):n=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=T(e),o=void 0!==e.classes?e.classes:C.options.defaultClass,r=s({title:i},w(s({},e,{placement:E(e,n)}))),a=t._tooltip=new m(t,r);a.setClasses(o),a._vueEl=t;var A=void 0!==e.targetClasses?e.targetClasses:C.options.defaultTargetClass;return t._tooltipTargetClasses=A,u(t,A),a}(t,i,o),void 0!==i.show&&i.show!==t._tooltipOldShow&&(t._tooltipOldShow=i.show,i.show?n.show():n.hide())):x(t)}var C={options:b,bind:B,update:B,unbind:function(t){x(t)}};function _(t){t.addEventListener("click",I),t.addEventListener("touchstart",N,!!p&&{passive:!0})}function M(t){t.removeEventListener("click",I),t.removeEventListener("touchstart",N),t.removeEventListener("touchend",O),t.removeEventListener("touchcancel",D)}function I(t){var e=t.currentTarget;t.closePopover=!e.$_vclosepopover_touch,t.closeAllPopover=e.$_closePopoverModifiers&&!!e.$_closePopoverModifiers.all}function N(t){if(1===t.changedTouches.length){var e=t.currentTarget;e.$_vclosepopover_touch=!0;var n=t.changedTouches[0];e.$_vclosepopover_touchPoint=n,e.addEventListener("touchend",O),e.addEventListener("touchcancel",D)}}function O(t){var e=t.currentTarget;if(e.$_vclosepopover_touch=!1,1===t.changedTouches.length){var n=t.changedTouches[0],i=e.$_vclosepopover_touchPoint;t.closePopover=Math.abs(n.screenY-i.screenY)<20&&Math.abs(n.screenX-i.screenX)<20,t.closeAllPopover=e.$_closePopoverModifiers&&!!e.$_closePopoverModifiers.all}}function D(t){t.currentTarget.$_vclosepopover_touch=!1}var Q={bind:function(t,e){var n=e.value,i=e.modifiers;t.$_closePopoverModifiers=i,(void 0===n||n)&&_(t)},update:function(t,e){var n=e.value,i=e.oldValue,o=e.modifiers;t.$_closePopoverModifiers=o,n!==i&&(void 0===n||n?_(t):M(t))},unbind:function(t){M(t)}};function k(t){var e=C.options.popover[t];return void 0===e?C.options[t]:e}var S=!1;"undefined"!=typeof window&&"undefined"!=typeof navigator&&(S=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream);var L=[],j=function(){};"undefined"!=typeof window&&(j=window.Element);var Y={name:"VPopover",components:{ResizeObserver:o.a},props:{open:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},placement:{type:String,default:function(){return k("defaultPlacement")}},delay:{type:[String,Number,Object],default:function(){return k("defaultDelay")}},offset:{type:[String,Number],default:function(){return k("defaultOffset")}},trigger:{type:String,default:function(){return k("defaultTrigger")}},container:{type:[String,Object,j,Boolean],default:function(){return k("defaultContainer")}},boundariesElement:{type:[String,j],default:function(){return k("defaultBoundariesElement")}},popperOptions:{type:Object,default:function(){return k("defaultPopperOptions")}},popoverClass:{type:[String,Array],default:function(){return k("defaultClass")}},popoverBaseClass:{type:[String,Array],default:function(){return C.options.popover.defaultBaseClass}},popoverInnerClass:{type:[String,Array],default:function(){return C.options.popover.defaultInnerClass}},popoverWrapperClass:{type:[String,Array],default:function(){return C.options.popover.defaultWrapperClass}},popoverArrowClass:{type:[String,Array],default:function(){return C.options.popover.defaultArrowClass}},autoHide:{type:Boolean,default:function(){return C.options.popover.defaultAutoHide}},handleResize:{type:Boolean,default:function(){return C.options.popover.defaultHandleResize}},openGroup:{type:String,default:null},openClass:{type:[String,Array],default:function(){return C.options.popover.defaultOpenClass}}},data:function(){return{isOpen:!1,id:Math.random().toString(36).substr(2,10)}},computed:{cssClass:function(){return A({},this.openClass,this.isOpen)},popoverId:function(){return"popover_".concat(this.id)}},watch:{open:function(t){t?this.show():this.hide()},disabled:function(t,e){t!==e&&(t?this.hide():this.open&&this.show())},container:function(t){if(this.isOpen&&this.popperInstance){var e=this.$refs.popover,n=this.$refs.trigger,i=this.$_findContainer(this.container,n);if(!i)return void console.warn("No container for popover",this);i.appendChild(e),this.popperInstance.scheduleUpdate()}},trigger:function(t){this.$_removeEventListeners(),this.$_addEventListeners()},placement:function(t){var e=this;this.$_updatePopper(function(){e.popperInstance.options.placement=t})},offset:"$_restartPopper",boundariesElement:"$_restartPopper",popperOptions:{handler:"$_restartPopper",deep:!0}},created:function(){this.$_isDisposed=!1,this.$_mounted=!1,this.$_events=[],this.$_preventOpen=!1},mounted:function(){var t=this.$refs.popover;t.parentNode&&t.parentNode.removeChild(t),this.$_init(),this.open&&this.show()},deactivated:function(){this.hide()},beforeDestroy:function(){this.dispose()},methods:{show:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.event,i=(e.skipDelay,e.force),o=void 0!==i&&i;!o&&this.disabled||(this.$_scheduleShow(n),this.$emit("show")),this.$emit("update:open",!0),this.$_beingShowed=!0,requestAnimationFrame(function(){t.$_beingShowed=!1})},hide:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.event;t.skipDelay;this.$_scheduleHide(e),this.$emit("hide"),this.$emit("update:open",!1)},dispose:function(){if(this.$_isDisposed=!0,this.$_removeEventListeners(),this.hide({skipDelay:!0}),this.popperInstance&&(this.popperInstance.destroy(),!this.popperInstance.options.removeOnDestroy)){var t=this.$refs.popover;t.parentNode&&t.parentNode.removeChild(t)}this.$_mounted=!1,this.popperInstance=null,this.isOpen=!1,this.$emit("dispose")},$_init:function(){-1===this.trigger.indexOf("manual")&&this.$_addEventListeners()},$_show:function(){var t=this,e=this.$refs.trigger,n=this.$refs.popover;if(clearTimeout(this.$_disposeTimer),!this.isOpen){if(this.popperInstance&&(this.isOpen=!0,this.popperInstance.enableEventListeners(),this.popperInstance.scheduleUpdate()),!this.$_mounted){var o=this.$_findContainer(this.container,e);if(!o)return void console.warn("No container for popover",this);o.appendChild(n),this.$_mounted=!0}if(!this.popperInstance){var r=s({},this.popperOptions,{placement:this.placement});if(r.modifiers=s({},r.modifiers,{arrow:s({},r.modifiers&&r.modifiers.arrow,{element:this.$refs.arrow})}),this.offset){var a=this.$_getOffset();r.modifiers.offset=s({},r.modifiers&&r.modifiers.offset,{offset:a})}this.boundariesElement&&(r.modifiers.preventOverflow=s({},r.modifiers&&r.modifiers.preventOverflow,{boundariesElement:this.boundariesElement})),this.popperInstance=new i.a(e,n,r),requestAnimationFrame(function(){if(t.hidden)return t.hidden=!1,void t.$_hide();!t.$_isDisposed&&t.popperInstance?(t.popperInstance.scheduleUpdate(),requestAnimationFrame(function(){if(t.hidden)return t.hidden=!1,void t.$_hide();t.$_isDisposed?t.dispose():t.isOpen=!0})):t.dispose()})}var A=this.openGroup;if(A)for(var c,l=0;l<L.length;l++)(c=L[l]).openGroup!==A&&(c.hide(),c.$emit("close-group"));L.push(this),this.$emit("apply-show")}},$_hide:function(){var t=this;if(this.isOpen){var e=L.indexOf(this);-1!==e&&L.splice(e,1),this.isOpen=!1,this.popperInstance&&this.popperInstance.disableEventListeners(),clearTimeout(this.$_disposeTimer);var n=C.options.popover.disposeTimeout||C.options.disposeTimeout;null!==n&&(this.$_disposeTimer=setTimeout(function(){var e=t.$refs.popover;e&&(e.parentNode&&e.parentNode.removeChild(e),t.$_mounted=!1)},n)),this.$emit("apply-hide")}},$_findContainer:function(t,e){return"string"==typeof t?t=window.document.querySelector(t):!1===t&&(t=e.parentNode),t},$_getOffset:function(){var t=r(this.offset),e=this.offset;return("number"===t||"string"===t&&-1===e.indexOf(","))&&(e="0, ".concat(e)),e},$_addEventListeners:function(){var t=this,e=this.$refs.trigger,n=[],i=[];("string"==typeof this.trigger?this.trigger.split(" ").filter(function(t){return-1!==["click","hover","focus"].indexOf(t)}):[]).forEach(function(t){switch(t){case"hover":n.push("mouseenter"),i.push("mouseleave");break;case"focus":n.push("focus"),i.push("blur");break;case"click":n.push("click"),i.push("click")}}),n.forEach(function(n){var i=function(e){t.isOpen||(e.usedByTooltip=!0,!t.$_preventOpen&&t.show({event:e}),t.hidden=!1)};t.$_events.push({event:n,func:i}),e.addEventListener(n,i)}),i.forEach(function(n){var i=function(e){e.usedByTooltip||(t.hide({event:e}),t.hidden=!0)};t.$_events.push({event:n,func:i}),e.addEventListener(n,i)})},$_scheduleShow:function(){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(clearTimeout(this.$_scheduleTimer),t)this.$_show();else{var e=parseInt(this.delay&&this.delay.show||this.delay||0);this.$_scheduleTimer=setTimeout(this.$_show.bind(this),e)}},$_scheduleHide:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(clearTimeout(this.$_scheduleTimer),n)this.$_hide();else{var i=parseInt(this.delay&&this.delay.hide||this.delay||0);this.$_scheduleTimer=setTimeout(function(){if(t.isOpen){if(e&&"mouseleave"===e.type)if(t.$_setTooltipNodeEvent(e))return;t.$_hide()}},i)}},$_setTooltipNodeEvent:function(t){var e=this,n=this.$refs.trigger,i=this.$refs.popover,o=t.relatedreference||t.toElement||t.relatedTarget;return!!i.contains(o)&&(i.addEventListener(t.type,function o(r){var a=r.relatedreference||r.toElement||r.relatedTarget;i.removeEventListener(t.type,o),n.contains(a)||e.hide({event:r})}),!0)},$_removeEventListeners:function(){var t=this.$refs.trigger;this.$_events.forEach(function(e){var n=e.func,i=e.event;t.removeEventListener(i,n)}),this.$_events=[]},$_updatePopper:function(t){this.popperInstance&&(t(),this.isOpen&&this.popperInstance.scheduleUpdate())},$_restartPopper:function(){if(this.popperInstance){var t=this.isOpen;this.dispose(),this.$_isDisposed=!1,this.$_init(),t&&this.show({skipDelay:!0,force:!0})}},$_handleGlobalClose:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.$_beingShowed||(this.hide({event:t}),t.closePopover?this.$emit("close-directive"):this.$emit("auto-hide"),n&&(this.$_preventOpen=!0,setTimeout(function(){e.$_preventOpen=!1},300)))},$_handleResize:function(){this.isOpen&&this.popperInstance&&(this.popperInstance.scheduleUpdate(),this.$emit("resize"))}}};function G(t){for(var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=function(n){var i=L[n];if(i.$refs.popover){var o=i.$refs.popover.contains(t.target);requestAnimationFrame(function(){(t.closeAllPopover||t.closePopover&&o||i.autoHide&&!o)&&i.$_handleGlobalClose(t,e)})}},i=0;i<L.length;i++)n(i)}"undefined"!=typeof document&&"undefined"!=typeof window&&(S?document.addEventListener("touchend",function(t){G(t,!0)},!p||{passive:!0,capture:!0}):window.addEventListener("click",function(t){G(t)},!0));var z=function(t,e,n,i,o,r,a,A,s,c){"boolean"!=typeof a&&(s=A,A=a,a=!1);var l,u="function"==typeof n?n.options:n;if(t&&t.render&&(u.render=t.render,u.staticRenderFns=t.staticRenderFns,u._compiled=!0,o&&(u.functional=!0)),i&&(u._scopeId=i),r?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),e&&e.call(this,s(t)),t&&t._registeredComponents&&t._registeredComponents.add(r)},u._ssrRegister=l):e&&(l=a?function(){e.call(this,c(this.$root.$options.shadowRoot))}:function(t){e.call(this,A(t))}),l)if(u.functional){var d=u.render;u.render=function(t,e){return l.call(e),d(t,e)}}else{var p=u.beforeCreate;u.beforeCreate=p?[].concat(p,l):[l]}return n},P=Y,H=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"v-popover",class:t.cssClass},[n("div",{ref:"trigger",staticClass:"trigger",staticStyle:{display:"inline-block"},attrs:{"aria-describedby":t.popoverId,tabindex:-1!==t.trigger.indexOf("focus")?0:void 0}},[t._t("default")],2),t._v(" "),n("div",{ref:"popover",class:[t.popoverBaseClass,t.popoverClass,t.cssClass],style:{visibility:t.isOpen?"visible":"hidden"},attrs:{id:t.popoverId,"aria-hidden":t.isOpen?"false":"true",tabindex:t.autoHide?0:void 0},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"]))return null;t.autoHide&&t.hide()}}},[n("div",{class:t.popoverWrapperClass},[n("div",{ref:"inner",class:t.popoverInnerClass,staticStyle:{position:"relative"}},[n("div",[t._t("popover")],2),t._v(" "),t.handleResize?n("ResizeObserver",{on:{notify:t.$_handleResize}}):t._e()],1),t._v(" "),n("div",{ref:"arrow",class:t.popoverArrowClass})])])])};H._withStripped=!0;var F=z({render:H,staticRenderFns:[]},void 0,P,void 0,!1,void 0,void 0,void 0);var U=function(){this.__data__=[],this.size=0};var R=function(t,e){return t===e||t!=t&&e!=e};var Z=function(t,e){for(var n=t.length;n--;)if(R(t[n][0],e))return n;return-1},W=Array.prototype.splice;var $=function(t){var e=this.__data__,n=Z(e,t);return!(n<0||(n==e.length-1?e.pop():W.call(e,n,1),--this.size,0))};var V=function(t){var e=this.__data__,n=Z(e,t);return n<0?void 0:e[n][1]};var X=function(t){return Z(this.__data__,t)>-1};var J=function(t,e){var n=this.__data__,i=Z(n,t);return i<0?(++this.size,n.push([t,e])):n[i][1]=e,this};function K(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var i=t[e];this.set(i[0],i[1])}}K.prototype.clear=U,K.prototype.delete=$,K.prototype.get=V,K.prototype.has=X,K.prototype.set=J;var q=K;var tt=function(){this.__data__=new q,this.size=0};var et=function(t){var e=this.__data__,n=e.delete(t);return this.size=e.size,n};var nt=function(t){return this.__data__.get(t)};var it=function(t){return this.__data__.has(t)},ot="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==t?t:"undefined"!=typeof self?self:{};function rt(t,e){return t(e={exports:{}},e.exports),e.exports}var at="object"==typeof ot&&ot&&ot.Object===Object&&ot,At="object"==typeof self&&self&&self.Object===Object&&self,st=at||At||Function("return this")(),ct=st.Symbol,lt=Object.prototype,ut=lt.hasOwnProperty,dt=lt.toString,pt=ct?ct.toStringTag:void 0;var ft=function(t){var e=ut.call(t,pt),n=t[pt];try{t[pt]=void 0;var i=!0}catch(t){}var o=dt.call(t);return i&&(e?t[pt]=n:delete t[pt]),o},ht=Object.prototype.toString;var vt=function(t){return ht.call(t)},mt="[object Null]",gt="[object Undefined]",yt=ct?ct.toStringTag:void 0;var bt=function(t){return null==t?void 0===t?gt:mt:yt&&yt in Object(t)?ft(t):vt(t)};var wt=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)},Et="[object AsyncFunction]",Tt="[object Function]",xt="[object GeneratorFunction]",Bt="[object Proxy]";var Ct,_t=function(t){if(!wt(t))return!1;var e=bt(t);return e==Tt||e==xt||e==Et||e==Bt},Mt=st["__core-js_shared__"],It=(Ct=/[^.]+$/.exec(Mt&&Mt.keys&&Mt.keys.IE_PROTO||""))?"Symbol(src)_1."+Ct:"";var Nt=function(t){return!!It&&It in t},Ot=Function.prototype.toString;var Dt=function(t){if(null!=t){try{return Ot.call(t)}catch(t){}try{return t+""}catch(t){}}return""},Qt=/^\[object .+?Constructor\]$/,kt=Function.prototype,St=Object.prototype,Lt=kt.toString,jt=St.hasOwnProperty,Yt=RegExp("^"+Lt.call(jt).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");var Gt=function(t){return!(!wt(t)||Nt(t))&&(_t(t)?Yt:Qt).test(Dt(t))};var zt=function(t,e){return null==t?void 0:t[e]};var Pt=function(t,e){var n=zt(t,e);return Gt(n)?n:void 0},Ht=Pt(st,"Map"),Ft=Pt(Object,"create");var Ut=function(){this.__data__=Ft?Ft(null):{},this.size=0};var Rt=function(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e},Zt="__lodash_hash_undefined__",Wt=Object.prototype.hasOwnProperty;var $t=function(t){var e=this.__data__;if(Ft){var n=e[t];return n===Zt?void 0:n}return Wt.call(e,t)?e[t]:void 0},Vt=Object.prototype.hasOwnProperty;var Xt=function(t){var e=this.__data__;return Ft?void 0!==e[t]:Vt.call(e,t)},Jt="__lodash_hash_undefined__";var Kt=function(t,e){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=Ft&&void 0===e?Jt:e,this};function qt(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var i=t[e];this.set(i[0],i[1])}}qt.prototype.clear=Ut,qt.prototype.delete=Rt,qt.prototype.get=$t,qt.prototype.has=Xt,qt.prototype.set=Kt;var te=qt;var ee=function(){this.size=0,this.__data__={hash:new te,map:new(Ht||q),string:new te}};var ne=function(t){var e=typeof t;return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t};var ie=function(t,e){var n=t.__data__;return ne(e)?n["string"==typeof e?"string":"hash"]:n.map};var oe=function(t){var e=ie(this,t).delete(t);return this.size-=e?1:0,e};var re=function(t){return ie(this,t).get(t)};var ae=function(t){return ie(this,t).has(t)};var Ae=function(t,e){var n=ie(this,t),i=n.size;return n.set(t,e),this.size+=n.size==i?0:1,this};function se(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var i=t[e];this.set(i[0],i[1])}}se.prototype.clear=ee,se.prototype.delete=oe,se.prototype.get=re,se.prototype.has=ae,se.prototype.set=Ae;var ce=se,le=200;var ue=function(t,e){var n=this.__data__;if(n instanceof q){var i=n.__data__;if(!Ht||i.length<le-1)return i.push([t,e]),this.size=++n.size,this;n=this.__data__=new ce(i)}return n.set(t,e),this.size=n.size,this};function de(t){var e=this.__data__=new q(t);this.size=e.size}de.prototype.clear=tt,de.prototype.delete=et,de.prototype.get=nt,de.prototype.has=it,de.prototype.set=ue;var pe=de,fe=function(){try{var t=Pt(Object,"defineProperty");return t({},"",{}),t}catch(t){}}();var he=function(t,e,n){"__proto__"==e&&fe?fe(t,e,{configurable:!0,enumerable:!0,value:n,writable:!0}):t[e]=n};var ve=function(t,e,n){(void 0===n||R(t[e],n))&&(void 0!==n||e in t)||he(t,e,n)};var me=function(t){return function(e,n,i){for(var o=-1,r=Object(e),a=i(e),A=a.length;A--;){var s=a[t?A:++o];if(!1===n(r[s],s,r))break}return e}}(),ge=rt(function(t,e){var n=e&&!e.nodeType&&e,i=n&&t&&!t.nodeType&&t,o=i&&i.exports===n?st.Buffer:void 0,r=o?o.allocUnsafe:void 0;t.exports=function(t,e){if(e)return t.slice();var n=t.length,i=r?r(n):new t.constructor(n);return t.copy(i),i}}),ye=st.Uint8Array;var be=function(t){var e=new t.constructor(t.byteLength);return new ye(e).set(new ye(t)),e};var we=function(t,e){var n=e?be(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.length)};var Ee=function(t,e){var n=-1,i=t.length;for(e||(e=Array(i));++n<i;)e[n]=t[n];return e},Te=Object.create,xe=function(){function t(){}return function(e){if(!wt(e))return{};if(Te)return Te(e);t.prototype=e;var n=new t;return t.prototype=void 0,n}}();var Be=function(t,e){return function(n){return t(e(n))}}(Object.getPrototypeOf,Object),Ce=Object.prototype;var _e=function(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||Ce)};var Me=function(t){return"function"!=typeof t.constructor||_e(t)?{}:xe(Be(t))};var Ie=function(t){return null!=t&&"object"==typeof t},Ne="[object Arguments]";var Oe=function(t){return Ie(t)&&bt(t)==Ne},De=Object.prototype,Qe=De.hasOwnProperty,ke=De.propertyIsEnumerable,Se=Oe(function(){return arguments}())?Oe:function(t){return Ie(t)&&Qe.call(t,"callee")&&!ke.call(t,"callee")},Le=Array.isArray,je=9007199254740991;var Ye=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=je};var Ge=function(t){return null!=t&&Ye(t.length)&&!_t(t)};var ze=function(t){return Ie(t)&&Ge(t)};var Pe=function(){return!1},He=rt(function(t,e){var n=e&&!e.nodeType&&e,i=n&&t&&!t.nodeType&&t,o=i&&i.exports===n?st.Buffer:void 0,r=(o?o.isBuffer:void 0)||Pe;t.exports=r}),Fe="[object Object]",Ue=Function.prototype,Re=Object.prototype,Ze=Ue.toString,We=Re.hasOwnProperty,$e=Ze.call(Object);var Ve=function(t){if(!Ie(t)||bt(t)!=Fe)return!1;var e=Be(t);if(null===e)return!0;var n=We.call(e,"constructor")&&e.constructor;return"function"==typeof n&&n instanceof n&&Ze.call(n)==$e},Xe={};Xe["[object Float32Array]"]=Xe["[object Float64Array]"]=Xe["[object Int8Array]"]=Xe["[object Int16Array]"]=Xe["[object Int32Array]"]=Xe["[object Uint8Array]"]=Xe["[object Uint8ClampedArray]"]=Xe["[object Uint16Array]"]=Xe["[object Uint32Array]"]=!0,Xe["[object Arguments]"]=Xe["[object Array]"]=Xe["[object ArrayBuffer]"]=Xe["[object Boolean]"]=Xe["[object DataView]"]=Xe["[object Date]"]=Xe["[object Error]"]=Xe["[object Function]"]=Xe["[object Map]"]=Xe["[object Number]"]=Xe["[object Object]"]=Xe["[object RegExp]"]=Xe["[object Set]"]=Xe["[object String]"]=Xe["[object WeakMap]"]=!1;var Je=function(t){return Ie(t)&&Ye(t.length)&&!!Xe[bt(t)]};var Ke=function(t){return function(e){return t(e)}},qe=rt(function(t,e){var n=e&&!e.nodeType&&e,i=n&&t&&!t.nodeType&&t,o=i&&i.exports===n&&at.process,r=function(){try{var t=i&&i.require&&i.require("util").types;return t||o&&o.binding&&o.binding("util")}catch(t){}}();t.exports=r}),tn=qe&&qe.isTypedArray,en=tn?Ke(tn):Je;var nn=function(t,e){if("__proto__"!=e)return t[e]},on=Object.prototype.hasOwnProperty;var rn=function(t,e,n){var i=t[e];on.call(t,e)&&R(i,n)&&(void 0!==n||e in t)||he(t,e,n)};var an=function(t,e,n,i){var o=!n;n||(n={});for(var r=-1,a=e.length;++r<a;){var A=e[r],s=i?i(n[A],t[A],A,n,t):void 0;void 0===s&&(s=t[A]),o?he(n,A,s):rn(n,A,s)}return n};var An=function(t,e){for(var n=-1,i=Array(t);++n<t;)i[n]=e(n);return i},sn=9007199254740991,cn=/^(?:0|[1-9]\d*)$/;var ln=function(t,e){var n=typeof t;return!!(e=null==e?sn:e)&&("number"==n||"symbol"!=n&&cn.test(t))&&t>-1&&t%1==0&&t<e},un=Object.prototype.hasOwnProperty;var dn=function(t,e){var n=Le(t),i=!n&&Se(t),o=!n&&!i&&He(t),r=!n&&!i&&!o&&en(t),a=n||i||o||r,A=a?An(t.length,String):[],s=A.length;for(var c in t)!e&&!un.call(t,c)||a&&("length"==c||o&&("offset"==c||"parent"==c)||r&&("buffer"==c||"byteLength"==c||"byteOffset"==c)||ln(c,s))||A.push(c);return A};var pn=function(t){var e=[];if(null!=t)for(var n in Object(t))e.push(n);return e},fn=Object.prototype.hasOwnProperty;var hn=function(t){if(!wt(t))return pn(t);var e=_e(t),n=[];for(var i in t)("constructor"!=i||!e&&fn.call(t,i))&&n.push(i);return n};var vn=function(t){return Ge(t)?dn(t,!0):hn(t)};var mn=function(t){return an(t,vn(t))};var gn=function(t,e,n,i,o,r,a){var A=nn(t,n),s=nn(e,n),c=a.get(s);if(c)ve(t,n,c);else{var l=r?r(A,s,n+"",t,e,a):void 0,u=void 0===l;if(u){var d=Le(s),p=!d&&He(s),f=!d&&!p&&en(s);l=s,d||p||f?Le(A)?l=A:ze(A)?l=Ee(A):p?(u=!1,l=ge(s,!0)):f?(u=!1,l=we(s,!0)):l=[]:Ve(s)||Se(s)?(l=A,Se(A)?l=mn(A):wt(A)&&!_t(A)||(l=Me(s))):u=!1}u&&(a.set(s,l),o(l,s,i,r,a),a.delete(s)),ve(t,n,l)}};var yn=function t(e,n,i,o,r){e!==n&&me(n,function(a,A){if(wt(a))r||(r=new pe),gn(e,n,A,i,t,o,r);else{var s=o?o(nn(e,A),a,A+"",e,n,r):void 0;void 0===s&&(s=a),ve(e,A,s)}},vn)};var bn=function(t){return t};var wn=function(t,e,n){switch(n.length){case 0:return t.call(e);case 1:return t.call(e,n[0]);case 2:return t.call(e,n[0],n[1]);case 3:return t.call(e,n[0],n[1],n[2])}return t.apply(e,n)},En=Math.max;var Tn=function(t,e,n){return e=En(void 0===e?t.length-1:e,0),function(){for(var i=arguments,o=-1,r=En(i.length-e,0),a=Array(r);++o<r;)a[o]=i[e+o];o=-1;for(var A=Array(e+1);++o<e;)A[o]=i[o];return A[e]=n(a),wn(t,this,A)}};var xn=function(t){return function(){return t}},Bn=fe?function(t,e){return fe(t,"toString",{configurable:!0,enumerable:!1,value:xn(e),writable:!0})}:bn,Cn=800,_n=16,Mn=Date.now;var In=function(t){var e=0,n=0;return function(){var i=Mn(),o=_n-(i-n);if(n=i,o>0){if(++e>=Cn)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}(Bn);var Nn=function(t,e){return In(Tn(t,e,bn),t+"")};var On=function(t,e,n){if(!wt(n))return!1;var i=typeof e;return!!("number"==i?Ge(n)&&ln(e,n.length):"string"==i&&e in n)&&R(n[e],t)};var Dn=function(t){return Nn(function(e,n){var i=-1,o=n.length,r=o>1?n[o-1]:void 0,a=o>2?n[2]:void 0;for(r=t.length>3&&"function"==typeof r?(o--,r):void 0,a&&On(n[0],n[1],a)&&(r=o<3?void 0:r,o=1),e=Object(e);++i<o;){var A=n[i];A&&t(e,A,i,r)}return e})}(function(t,e,n){yn(t,e,n)});!function(t,e){void 0===e&&(e={});var n=e.insertAt;if(t&&"undefined"!=typeof document){var i=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css","top"===n&&i.firstChild?i.insertBefore(o,i.firstChild):i.appendChild(o),o.styleSheet?o.styleSheet.cssText=t:o.appendChild(document.createTextNode(t))}}(".resize-observer[data-v-b329ee4c]{position:absolute;top:0;left:0;z-index:-1;width:100%;height:100%;border:none;background-color:transparent;pointer-events:none;display:block;overflow:hidden;opacity:0}.resize-observer[data-v-b329ee4c] object{display:block;position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1}");var Qn=C,kn={install:function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!t.installed){t.installed=!0;var i={};Dn(i,b,n),kn.options=i,C.options=i,e.directive("tooltip",C),e.directive("close-popover",Q),e.component("v-popover",F)}},get enabled(){return g.enabled},set enabled(t){g.enabled=t}},Sn=null;"undefined"!=typeof window?Sn=window.Vue:void 0!==t&&(Sn=t.Vue),Sn&&Sn.use(kn)}).call(this,n(16))},63:function(t,e,n){var i=n(181);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(2).default)("acfb770c",i,!0,{})},67:function(t,e,n){"use strict";n.r(e);var i={name:"ActionButton",mixins:[n(15).a],props:{disabled:{type:Boolean,default:!1}},computed:{isFocusable:function(){return!this.disabled}}},o=(n(94),n(0)),r=n(35),a=n.n(r),A=Object(o.a)(i,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",{class:{"action--disabled":t.disabled}},[n("button",{staticClass:"action-button",class:{focusable:t.isFocusable},on:{click:t.onClick}},[n("span",{staticClass:"action-button__icon",class:[t.isIconUrl?"action-button__icon--url":t.icon],style:{backgroundImage:t.isIconUrl?"url("+t.icon+")":null}}),t._v(" "),t.title?n("p",[n("strong",{staticClass:"action-button__title"},[t._v("\n\t\t\t\t"+t._s(t.title)+"\n\t\t\t")]),t._v(" "),n("br"),t._v(" "),n("span",{staticClass:"action-button__longtext",domProps:{textContent:t._s(t.text)}})]):t.isLongText?n("p",{staticClass:"action-button__longtext",domProps:{textContent:t._s(t.text)}}):n("span",{staticClass:"action-button__text"},[t._v(t._s(t.text))]),t._v(" "),t._e()],2)])},[],!1,null,"37538719",null);"function"==typeof a.a&&a()(A);var s=A.exports;n.d(e,"ActionButton",function(){return s});
/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */e.default=s},7:function(t,e,n){"use strict";n.r(e);var i=n(6);n(32);
/**
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
i.a.options.defaultTemplate='<div class="vue-tooltip" role="tooltip" data-v-'.concat("e56a121",'><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'),i.a.options.defaultHtml=!1,e.default=i.a},8:function(t,e,n){"use strict";
/**
 * @copyright Copyright (c) 2018 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */e.a=function(t){return Math.random().toString(36).replace(/[^a-z]+/g,"").substr(0,t||5)}},82:function(t,e,n){"use strict";var i=n(22);n.n(i).a},83:function(t,e,n){e=t.exports=n(1)(!1);var i=n(9),o=i(n(10)),r=i(n(11)),a=i(n(12)),A=i(n(13));e.push([t.i,'@font-face{font-family:"iconfont-vue-e56a121";src:url('+o+");src:url("+o+') format("embedded-opentype"),url('+r+') format("woff"),url('+a+') format("truetype"),url('+A+') format("svg")}.icon[data-v-8b9f5c88]{font-style:normal;font-weight:400}.icon.arrow-left-double[data-v-8b9f5c88]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.arrow-left[data-v-8b9f5c88]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.arrow-right-double[data-v-8b9f5c88]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.arrow-right[data-v-8b9f5c88]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.close[data-v-8b9f5c88]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.confirm-fade[data-v-8b9f5c88]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.confirm[data-v-8b9f5c88]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.menu[data-v-8b9f5c88]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.more[data-v-8b9f5c88]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.pause[data-v-8b9f5c88]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.play[data-v-8b9f5c88]:before{font-family:"iconfont-vue-e56a121";content:""}.action-item[data-v-8b9f5c88]{position:relative;display:inline-block}.action-item--single[data-v-8b9f5c88]:hover,.action-item--single[data-v-8b9f5c88]:focus,.action-item--single[data-v-8b9f5c88]:active,.action-item__menutoggle[data-v-8b9f5c88]:hover,.action-item__menutoggle[data-v-8b9f5c88]:focus,.action-item__menutoggle[data-v-8b9f5c88]:active{border-radius:22px;background-color:rgba(127,127,127,0.25) !important;opacity:1}.action-item.action-item--open .action-item__menutoggle[data-v-8b9f5c88]{opacity:1;border-radius:22px;background-color:rgba(127,127,127,0.25)}.action-item--single[data-v-8b9f5c88],.action-item__menutoggle[data-v-8b9f5c88]{box-sizing:border-box;width:44px;height:44px;margin:0;padding:14px;cursor:pointer;border:none;background-color:transparent}.action-item__menutoggle[data-v-8b9f5c88]{display:flex;align-items:center;justify-content:center;opacity:.7;font-size:16px}.action-item__menutoggle[data-v-8b9f5c88]:before{font-family:"iconfont-vue-e56a121";font-style:normal;font-weight:400;content:""}.action-item--single[data-v-8b9f5c88]{opacity:.7}.action-item--single[data-v-8b9f5c88]:hover,.action-item--single[data-v-8b9f5c88]:focus,.action-item--single[data-v-8b9f5c88]:active{opacity:1}.action-item--single>[hidden][data-v-8b9f5c88]{display:none}.action-item--multiple[data-v-8b9f5c88]{position:relative}.action-item__menu[data-v-8b9f5c88]{position:absolute;z-index:110;right:50%;display:none;margin:10px;margin-top:-5px;transform:translateX(50%);color:var(--color-main-text);border-radius:var(--border-radius);background-color:var(--color-main-background);filter:drop-shadow(0 1px 3px var(--color-box-shadow))}.action-item__menu ul[data-v-8b9f5c88]>:not(li){display:none}.action-item__menu.open[data-v-8b9f5c88]{display:block}.action-item__menu .action-item__menu_arrow[data-v-8b9f5c88]{position:absolute;right:50%;bottom:100%;width:0;height:0;margin-right:-9px;content:\' \';pointer-events:none;border:solid transparent;border-width:9px;border-bottom-color:var(--color-main-background)}.action-item__menu.menu-right[data-v-8b9f5c88]{right:0;left:auto;transform:none}.action-item__menu.menu-right .action-item__menu_arrow[data-v-8b9f5c88]{right:13px;margin-right:0}.action-item__menu.menu-left[data-v-8b9f5c88]{right:auto;left:0;transform:none}.action-item__menu.menu-left .action-item__menu_arrow[data-v-8b9f5c88]{right:auto;left:13px;margin-right:0}.ie .action-item__menu[data-v-8b9f5c88],.ie .action-item__menu .action-item__menu_arrow[data-v-8b9f5c88],.edge .action-item__menu[data-v-8b9f5c88],.edge .action-item__menu .action-item__menu_arrow[data-v-8b9f5c88]{border:1px solid var(--color-border)}\n',""])},9:function(t,e,n){"use strict";t.exports=function(t,e){return"string"!=typeof(t=t.__esModule?t.default:t)?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),/["'() \t\n]/.test(t)||e?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t)}},91:function(t,e){},94:function(t,e,n){"use strict";var i=n(26);n.n(i).a},95:function(t,e,n){(t.exports=n(1)(!1)).push([t.i,"li.active[data-v-37538719]{box-shadow:inset 4px 0 var(--color-primary)}.action--disabled[data-v-37538719]{pointer-events:none;opacity:.5}.action--disabled[data-v-37538719]:hover,.action--disabled[data-v-37538719]:focus{cursor:default;opacity:.5}.action--disabled *[data-v-37538719]{opacity:1 !important}.action-button[data-v-37538719]{display:flex;align-items:flex-start;width:100%;height:auto;margin:0;padding:0;padding-right:14px;cursor:pointer;white-space:nowrap;opacity:.7;color:var(--color-main-text);border:0;border-radius:0;background-color:transparent;box-shadow:none;font-weight:normal;line-height:44px}.action-button[data-v-37538719]:hover,.action-button[data-v-37538719]:focus{opacity:1}.action-button>span[data-v-37538719]{cursor:pointer;white-space:nowrap}.action-button__icon[data-v-37538719]{width:44px;height:44px;opacity:1;background-position:14px center;background-size:16px}.action-button p[data-v-37538719]{width:150px;padding:7px 0;margin:auto;cursor:pointer;text-align:left;line-height:1.6em}.action-button__longtext[data-v-37538719]{cursor:pointer;white-space:pre-wrap}.action-button__title[data-v-37538719]{font-weight:bold}\n",""])}})});
//# sourceMappingURL=Modal.js.map

/***/ }),

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __webpack_require__(83);
var client = axios_1.default.create({
    headers: {
        requesttoken: OC.requestToken
    }
});
exports.default = client;


/***/ }),

/***/ 25:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 492:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(501);


/***/ }),

/***/ 493:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BoardSelector_vue_vue_type_style_index_0_id_32f66662_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(84);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BoardSelector_vue_vue_type_style_index_0_id_32f66662_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BoardSelector_vue_vue_type_style_index_0_id_32f66662_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BoardSelector_vue_vue_type_style_index_0_id_32f66662_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 494:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(57);
            var content = __webpack_require__(495);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(module.i, content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ 495:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(58);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n#modal-inner[data-v-32f66662] {\n\twidth: 90vw;\n\tmax-width: 400px;\n\tpadding: 20px;\n}\nul[data-v-32f66662] {\n\tmin-height: 100px;\n}\nli[data-v-32f66662] {\n\tpadding: 6px;\n\tborder: 1px solid transparent;\n}\nli[data-v-32f66662]:hover, li[data-v-32f66662]:focus {\n\tbackground-color: var(--color-background-dark);\n}\nli.selected[data-v-32f66662] {\n\tborder: 1px solid var(--color-primary);\n}\n.board-bullet[data-v-32f66662] {\n\tdisplay: inline-block;\n\twidth: 12px;\n\theight: 12px;\n\tborder: none;\n\tborder-radius: 50%;\n\tcursor: pointer;\n}\nli > span[data-v-32f66662],\n.avatar[data-v-32f66662] {\n\tvertical-align: middle;\n}\n\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 496:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(497);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(68).default
var update = add("74c34244", content, true, {});

/***/ }),

/***/ 497:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(57);
            var content = __webpack_require__(498);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(module.i, content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ 498:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(58);
var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(499);
var ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(500);
exports = ___CSS_LOADER_API_IMPORT___(false);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
// Module
exports.push([module.i, ".icon-deck {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n\n.resource-type-deck img {\n  opacity: 0.4 !important;\n}\n.resource-type-deck:hover img {\n  opacity: 0.7 !important;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 499:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, '\\n'), "\"");
  }

  return url;
};

/***/ }),

/***/ 500:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTYgMTYiPgogIDxyZWN0IHJ5PSIxIiBoZWlnaHQ9IjgiIHdpZHRoPSIxNCIgeT0iNyIgeD0iMSIvPgogIDxyZWN0IHJ5PSIuNSIgaGVpZ2h0PSIxIiB3aWR0aD0iMTIiIHk9IjUiIHg9IjIiLz4KICA8cmVjdCByeT0iLjUiIGhlaWdodD0iMSIgd2lkdGg9IjEwIiB5PSIzIiB4PSIzIi8+CiAgPHJlY3Qgcnk9Ii41IiBoZWlnaHQ9IjEiIHdpZHRoPSI4IiB5PSIxIiB4PSI0Ii8+Cjwvc3ZnPgo=");

/***/ }),

/***/ 501:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.esm.js
var vue_esm = __webpack_require__(13);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./views/BoardSelector.vue?vue&type=template&id=32f66662&scoped=true&
var BoardSelectorvue_type_template_id_32f66662_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('Modal',{on:{"close":_vm.close}},[_c('div',{class:{ 'icon-loading': _vm.loading },attrs:{"id":"modal-inner"}},[_c('h1',[_vm._v(_vm._s(_vm.t('deck', 'Select the board to link to a project')))]),_vm._v(" "),(!_vm.loading)?_c('ul',_vm._l((_vm.boards),function(board){return (!_vm.currentBoard || ''+board.id !== ''+_vm.currentBoard)?_c('li',{class:{'selected': (_vm.selectedBoard === board.id) },on:{"click":function($event){_vm.selectedBoard=board.id}}},[_c('span',{staticClass:"board-bullet",style:({ 'backgroundColor': '#' + board.color })}),_vm._v(" "),_c('span',[_vm._v(_vm._s(board.title))])]):_vm._e()}),0):_vm._e(),_vm._v(" "),(!_vm.loading)?_c('button',{staticClass:"primary",on:{"click":_vm.select}},[_vm._v(_vm._s(_vm.t('deck', 'Select board')))]):_vm._e()])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./views/BoardSelector.vue?vue&type=template&id=32f66662&scoped=true&

// EXTERNAL MODULE: ./node_modules/nextcloud-vue/dist/Components/Modal.js
var Modal = __webpack_require__(193);

// EXTERNAL MODULE: ./node_modules/nextcloud-vue/dist/Components/Avatar.js
var Avatar = __webpack_require__(54);

// EXTERNAL MODULE: ./node_modules/nextcloud-axios/dist/client.js
var client = __webpack_require__(194);
var client_default = /*#__PURE__*/__webpack_require__.n(client);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./views/BoardSelector.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* global OC */



/* harmony default export */ var BoardSelectorvue_type_script_lang_js_ = ({
  name: 'CollaborationView',
  components: {
    Modal: Modal["Modal"],
    Avatar: Avatar["Avatar"]
  },
  data: function data() {
    return {
      boards: [],
      selectedBoard: null,
      loading: true,
      currentBoard: null
    };
  },
  beforeMount: function beforeMount() {
    this.fetchBoards();

    if (typeof angular !== 'undefined' && angular.element('#board')) {
      try {
        this.currentBoard = angular.element('#board').scope().boardservice.id || null;
      } catch (e) {}
    }
  },
  methods: {
    fetchBoards: function fetchBoards() {
      var _this = this;

      client_default.a.get(OC.generateUrl('/apps/deck/boards')).then(function (response) {
        _this.boards = response.data;
        _this.loading = false;
      });
    },
    close: function close() {
      this.$root.$emit('close');
    },
    select: function select() {
      this.$root.$emit('select', this.selectedBoard);
    }
  },
  computed: {}
});
// CONCATENATED MODULE: ./views/BoardSelector.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_BoardSelectorvue_type_script_lang_js_ = (BoardSelectorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./views/BoardSelector.vue?vue&type=style&index=0&id=32f66662&scoped=true&lang=css&
var BoardSelectorvue_type_style_index_0_id_32f66662_scoped_true_lang_css_ = __webpack_require__(493);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(69);

// CONCATENATED MODULE: ./views/BoardSelector.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  views_BoardSelectorvue_type_script_lang_js_,
  BoardSelectorvue_type_template_id_32f66662_scoped_true_render,
  staticRenderFns,
  false,
  null,
  "32f66662",
  null
  
)

/* harmony default export */ var BoardSelector = (component.exports);
// EXTERNAL MODULE: ../css/collections.css
var collections = __webpack_require__(496);

// CONCATENATED MODULE: ./init-collections.js
/*
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

/* global __webpack_nonce__ __webpack_public_path__ OC t n */
// eslint-disable-next-line

__webpack_require__.nc = btoa(OC.requestToken); // eslint-disable-next-line

__webpack_require__.p = OC.linkTo('deck', 'js/build/');

vue_esm["default"].prototype.t = t;
vue_esm["default"].prototype.n = n;
vue_esm["default"].prototype.OC = OC;



(function (OCP) {
  OCP.Collaboration.registerType('deck', {
    action: function action() {
      return new Promise(function (resolve, reject) {
        var container = document.createElement('div');
        container.id = 'deck-board-select';
        var body = document.getElementById('body-user');
        body.append(container);
        var ComponentVM = new vue_esm["default"]({
          render: function render(h) {
            return h(BoardSelector);
          }
        });
        ComponentVM.$mount(container);
        ComponentVM.$root.$on('close', function () {
          ComponentVM.$el.remove();
          ComponentVM.$destroy();
          reject();
        });
        ComponentVM.$root.$on('select', function (id) {
          resolve(id);
          ComponentVM.$el.remove();
          ComponentVM.$destroy();
        });
      });
    },
    typeString: t('deck', 'Link to a board'),
    typeIconClass: 'icon-deck'
  });
})(window.OCP);

/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(window,function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/dist/",n(n.s=66)}([function(t,e,n){"use strict";function o(t,e,n,o,r,i,A,a){var s,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=n,c._compiled=!0),o&&(c.functional=!0),i&&(c._scopeId="data-v-"+i),A?(s=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(A)},c._ssrRegister=s):r&&(s=a?function(){r.call(this,this.$root.$options.shadowRoot)}:r),s)if(c.functional){c._injectStyles=s;var u=c.render;c.render=function(t,e){return s.call(e),u(t,e)}}else{var l=c.beforeCreate;c.beforeCreate=l?[].concat(l,s):[s]}return{exports:t,options:c}}n.d(e,"a",function(){return o})},function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||"",o=t[3];if(!o)return n;if(e&&"function"==typeof btoa){var r=(A=o,a=btoa(unescape(encodeURIComponent(JSON.stringify(A)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),"/*# ".concat(s," */")),i=o.sources.map(function(t){return"/*# sourceURL=".concat(o.sourceRoot).concat(t," */")});return[n].concat(i).concat([r]).join("\n")}var A,a,s;return[n].join("\n")}(e,t);return e[2]?"@media ".concat(e[2],"{").concat(n,"}"):n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];null!=i&&(o[i]=!0)}for(var A=0;A<t.length;A++){var a=t[A];null!=a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="(".concat(a[2],") and (").concat(n,")")),e.push(a))}},e}},function(t,e,n){"use strict";function o(t,e){for(var n=[],o={},r=0;r<e.length;r++){var i=e[r],A=i[0],a={id:t+":"+r,css:i[1],media:i[2],sourceMap:i[3]};o[A]?o[A].parts.push(a):n.push(o[A]={id:A,parts:[a]})}return n}n.r(e),n.d(e,"default",function(){return p});var r="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!r)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var i={},A=r&&(document.head||document.getElementsByTagName("head")[0]),a=null,s=0,c=!1,u=function(){},l=null,d="data-vue-ssr-id",f="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function p(t,e,n,r){c=n,l=r||{};var A=o(t,e);return h(A),function(e){for(var n=[],r=0;r<A.length;r++){var a=A[r];(s=i[a.id]).refs--,n.push(s)}e?h(A=o(t,e)):A=[];for(r=0;r<n.length;r++){var s;if(0===(s=n[r]).refs){for(var c=0;c<s.parts.length;c++)s.parts[c]();delete i[s.id]}}}}function h(t){for(var e=0;e<t.length;e++){var n=t[e],o=i[n.id];if(o){o.refs++;for(var r=0;r<o.parts.length;r++)o.parts[r](n.parts[r]);for(;r<n.parts.length;r++)o.parts.push(m(n.parts[r]));o.parts.length>n.parts.length&&(o.parts.length=n.parts.length)}else{var A=[];for(r=0;r<n.parts.length;r++)A.push(m(n.parts[r]));i[n.id]={id:n.id,refs:1,parts:A}}}}function v(){var t=document.createElement("style");return t.type="text/css",A.appendChild(t),t}function m(t){var e,n,o=document.querySelector("style["+d+'~="'+t.id+'"]');if(o){if(c)return u;o.parentNode.removeChild(o)}if(f){var r=s++;o=a||(a=v()),e=y.bind(null,o,r,!1),n=y.bind(null,o,r,!0)}else o=v(),e=function(t,e){var n=e.css,o=e.media,r=e.sourceMap;o&&t.setAttribute("media",o);l.ssrId&&t.setAttribute(d,e.id);r&&(n+="\n/*# sourceURL="+r.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,o),n=function(){o.parentNode.removeChild(o)};return e(t),function(o){if(o){if(o.css===t.css&&o.media===t.media&&o.sourceMap===t.sourceMap)return;e(t=o)}else n()}}var g,b=(g=[],function(t,e){return g[t]=e,g.filter(Boolean).join("\n")});function y(t,e,n,o){var r=n?"":o.css;if(t.styleSheet)t.styleSheet.cssText=b(e,r);else{var i=document.createTextNode(r),A=t.childNodes;A[e]&&t.removeChild(A[e]),A.length?t.insertBefore(i,A[e]):t.appendChild(i)}}},,function(t,e,n){"use strict";var o=n(70),r=n(105),i=Object.prototype.toString;function A(t){return"[object Array]"===i.call(t)}function a(t){return null!==t&&"object"==typeof t}function s(t){return"[object Function]"===i.call(t)}function c(t,e){if(null!=t)if("object"!=typeof t&&(t=[t]),A(t))for(var n=0,o=t.length;n<o;n++)e.call(null,t[n],n,t);else for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.call(null,t[r],r,t)}t.exports={isArray:A,isArrayBuffer:function(t){return"[object ArrayBuffer]"===i.call(t)},isBuffer:r,isFormData:function(t){return"undefined"!=typeof FormData&&t instanceof FormData},isArrayBufferView:function(t){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(t):t&&t.buffer&&t.buffer instanceof ArrayBuffer},isString:function(t){return"string"==typeof t},isNumber:function(t){return"number"==typeof t},isObject:a,isUndefined:function(t){return void 0===t},isDate:function(t){return"[object Date]"===i.call(t)},isFile:function(t){return"[object File]"===i.call(t)},isBlob:function(t){return"[object Blob]"===i.call(t)},isFunction:s,isStream:function(t){return a(t)&&s(t.pipe)},isURLSearchParams:function(t){return"undefined"!=typeof URLSearchParams&&t instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:c,merge:function t(){var e={};function n(n,o){"object"==typeof e[o]&&"object"==typeof n?e[o]=t(e[o],n):e[o]=n}for(var o=0,r=arguments.length;o<r;o++)c(arguments[o],n);return e},deepMerge:function t(){var e={};function n(n,o){"object"==typeof e[o]&&"object"==typeof n?e[o]=t(e[o],n):e[o]="object"==typeof n?t({},n):n}for(var o=0,r=arguments.length;o<r;o++)c(arguments[o],n);return e},extend:function(t,e,n){return c(e,function(e,r){t[r]=n&&"function"==typeof e?o(e,n):e}),t},trim:function(t){return t.replace(/^\s*/,"").replace(/\s*$/,"")}}},,function(t,e,n){"use strict";(function(t){n.d(e,"a",function(){return Qn});var o=n(17),r=n(21);function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function A(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){a(t,e,n[e])})}return t}var c=function(){};function u(t){return"string"==typeof t&&(t=t.split(" ")),t}function l(t,e){var n,o=u(e);n=t.className instanceof c?u(t.className.baseVal):u(t.className),o.forEach(function(t){-1===n.indexOf(t)&&n.push(t)}),t instanceof SVGElement?t.setAttribute("class",n.join(" ")):t.className=n.join(" ")}function d(t,e){var n,o=u(e);n=t.className instanceof c?u(t.className.baseVal):u(t.className),o.forEach(function(t){var e=n.indexOf(t);-1!==e&&n.splice(e,1)}),t instanceof SVGElement?t.setAttribute("class",n.join(" ")):t.className=n.join(" ")}"undefined"!=typeof window&&(c=window.SVGAnimatedString);var f=!1;if("undefined"!=typeof window){f=!1;try{var p=Object.defineProperty({},"passive",{get:function(){f=!0}});window.addEventListener("test",null,p)}catch(t){}}var h={container:!1,delay:0,html:!1,placement:"top",title:"",template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",offset:0},v=[],m=function(){function t(e,n){var o=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),a(this,"_events",[]),a(this,"_setTooltipNodeEvent",function(t,e,n,r){var i=t.relatedreference||t.toElement||t.relatedTarget;return!!o._tooltipNode.contains(i)&&(o._tooltipNode.addEventListener(t.type,function n(i){var A=i.relatedreference||i.toElement||i.relatedTarget;o._tooltipNode.removeEventListener(t.type,n),e.contains(A)||o._scheduleHide(e,r.delay,r,i)}),!0)}),n=s({},h,n),e.jquery&&(e=e[0]),this.show=this.show.bind(this),this.hide=this.hide.bind(this),this.reference=e,this.options=n,this._isOpen=!1,this._init()}var e,n,r;return e=t,(n=[{key:"show",value:function(){this._show(this.reference,this.options)}},{key:"hide",value:function(){this._hide()}},{key:"dispose",value:function(){this._dispose()}},{key:"toggle",value:function(){return this._isOpen?this.hide():this.show()}},{key:"setClasses",value:function(t){this._classes=t}},{key:"setContent",value:function(t){this.options.title=t,this._tooltipNode&&this._setContent(t,this.options)}},{key:"setOptions",value:function(t){var e=!1,n=t&&t.classes||C.options.defaultClass;this._classes!==n&&(this.setClasses(n),e=!0),t=w(t);var o=!1,r=!1;for(var i in this.options.offset===t.offset&&this.options.placement===t.placement||(o=!0),(this.options.template!==t.template||this.options.trigger!==t.trigger||this.options.container!==t.container||e)&&(r=!0),t)this.options[i]=t[i];if(this._tooltipNode)if(r){var A=this._isOpen;this.dispose(),this._init(),A&&this.show()}else o&&this.popperInstance.update()}},{key:"_init",value:function(){var t="string"==typeof this.options.trigger?this.options.trigger.split(" "):[];this._isDisposed=!1,this._enableDocumentTouch=-1===t.indexOf("manual"),t=t.filter(function(t){return-1!==["click","hover","focus"].indexOf(t)}),this._setEventListeners(this.reference,t,this.options),this.$_originalTitle=this.reference.getAttribute("title"),this.reference.removeAttribute("title"),this.reference.setAttribute("data-original-title",this.$_originalTitle)}},{key:"_create",value:function(t,e){var n=window.document.createElement("div");n.innerHTML=e.trim();var o=n.childNodes[0];return o.id="tooltip_".concat(Math.random().toString(36).substr(2,10)),o.setAttribute("aria-hidden","true"),this.options.autoHide&&-1!==this.options.trigger.indexOf("hover")&&(o.addEventListener("mouseenter",this.hide),o.addEventListener("click",this.hide)),o}},{key:"_setContent",value:function(t,e){var n=this;this.asyncContent=!1,this._applyContent(t,e).then(function(){n.popperInstance.update()})}},{key:"_applyContent",value:function(t,e){var n=this;return new Promise(function(o,r){var i=e.html,A=n._tooltipNode;if(A){var a=A.querySelector(n.options.innerSelector);if(1===t.nodeType){if(i){for(;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(t)}}else{if("function"==typeof t){var s=t();return void(s&&"function"==typeof s.then?(n.asyncContent=!0,e.loadingClass&&l(A,e.loadingClass),e.loadingContent&&n._applyContent(e.loadingContent,e),s.then(function(t){return e.loadingClass&&d(A,e.loadingClass),n._applyContent(t,e)}).then(o).catch(r)):n._applyContent(s,e).then(o).catch(r))}i?a.innerHTML=t:a.innerText=t}o()}})}},{key:"_show",value:function(t,e){if(e&&"string"==typeof e.container&&!document.querySelector(e.container))return;clearTimeout(this._disposeTimer),delete(e=Object.assign({},e)).offset;var n=!0;this._tooltipNode&&(l(this._tooltipNode,this._classes),n=!1);var o=this._ensureShown(t,e);return n&&this._tooltipNode&&l(this._tooltipNode,this._classes),l(t,["v-tooltip-open"]),o}},{key:"_ensureShown",value:function(t,e){var n=this;if(this._isOpen)return this;if(this._isOpen=!0,v.push(this),this._tooltipNode)return this._tooltipNode.style.display="",this._tooltipNode.setAttribute("aria-hidden","false"),this.popperInstance.enableEventListeners(),this.popperInstance.update(),this.asyncContent&&this._setContent(e.title,e),this;var r=t.getAttribute("title")||e.title;if(!r)return this;var i=this._create(t,e.template);this._tooltipNode=i,t.setAttribute("aria-describedby",i.id);var A=this._findContainer(e.container,t);this._append(i,A);var a=s({},e.popperOptions,{placement:e.placement});return a.modifiers=s({},a.modifiers,{arrow:{element:this.options.arrowSelector}}),e.boundariesElement&&(a.modifiers.preventOverflow={boundariesElement:e.boundariesElement}),this.popperInstance=new o.a(t,i,a),this._setContent(r,e),requestAnimationFrame(function(){!n._isDisposed&&n.popperInstance?(n.popperInstance.update(),requestAnimationFrame(function(){n._isDisposed?n.dispose():n._isOpen&&i.setAttribute("aria-hidden","false")})):n.dispose()}),this}},{key:"_noLongerOpen",value:function(){var t=v.indexOf(this);-1!==t&&v.splice(t,1)}},{key:"_hide",value:function(){var t=this;if(!this._isOpen)return this;this._isOpen=!1,this._noLongerOpen(),this._tooltipNode.style.display="none",this._tooltipNode.setAttribute("aria-hidden","true"),this.popperInstance.disableEventListeners(),clearTimeout(this._disposeTimer);var e=C.options.disposeTimeout;return null!==e&&(this._disposeTimer=setTimeout(function(){t._tooltipNode&&(t._tooltipNode.removeEventListener("mouseenter",t.hide),t._tooltipNode.removeEventListener("click",t.hide),t._removeTooltipNode())},e)),d(this.reference,["v-tooltip-open"]),this}},{key:"_removeTooltipNode",value:function(){if(this._tooltipNode){var t=this._tooltipNode.parentNode;t&&(t.removeChild(this._tooltipNode),this.reference.removeAttribute("aria-describedby")),this._tooltipNode=null}}},{key:"_dispose",value:function(){var t=this;return this._isDisposed=!0,this.reference.removeAttribute("data-original-title"),this.$_originalTitle&&this.reference.setAttribute("title",this.$_originalTitle),this._events.forEach(function(e){var n=e.func,o=e.event;t.reference.removeEventListener(o,n)}),this._events=[],this._tooltipNode?(this._hide(),this._tooltipNode.removeEventListener("mouseenter",this.hide),this._tooltipNode.removeEventListener("click",this.hide),this.popperInstance.destroy(),this.popperInstance.options.removeOnDestroy||this._removeTooltipNode()):this._noLongerOpen(),this}},{key:"_findContainer",value:function(t,e){return"string"==typeof t?t=window.document.querySelector(t):!1===t&&(t=e.parentNode),t}},{key:"_append",value:function(t,e){e.appendChild(t)}},{key:"_setEventListeners",value:function(t,e,n){var o=this,r=[],i=[];e.forEach(function(t){switch(t){case"hover":r.push("mouseenter"),i.push("mouseleave"),o.options.hideOnTargetClick&&i.push("click");break;case"focus":r.push("focus"),i.push("blur"),o.options.hideOnTargetClick&&i.push("click");break;case"click":r.push("click"),i.push("click")}}),r.forEach(function(e){var r=function(e){!0!==o._isOpen&&(e.usedByTooltip=!0,o._scheduleShow(t,n.delay,n,e))};o._events.push({event:e,func:r}),t.addEventListener(e,r)}),i.forEach(function(e){var r=function(e){!0!==e.usedByTooltip&&o._scheduleHide(t,n.delay,n,e)};o._events.push({event:e,func:r}),t.addEventListener(e,r)})}},{key:"_onDocumentTouch",value:function(t){this._enableDocumentTouch&&this._scheduleHide(this.reference,this.options.delay,this.options,t)}},{key:"_scheduleShow",value:function(t,e,n){var o=this,r=e&&e.show||e||0;clearTimeout(this._scheduleTimer),this._scheduleTimer=window.setTimeout(function(){return o._show(t,n)},r)}},{key:"_scheduleHide",value:function(t,e,n,o){var r=this,i=e&&e.hide||e||0;clearTimeout(this._scheduleTimer),this._scheduleTimer=window.setTimeout(function(){if(!1!==r._isOpen&&document.body.contains(r._tooltipNode)){if("mouseleave"===o.type)if(r._setTooltipNodeEvent(o,t,e,n))return;r._hide(t,n)}},i)}}])&&A(e.prototype,n),r&&A(e,r),t}();"undefined"!=typeof document&&document.addEventListener("touchstart",function(t){for(var e=0;e<v.length;e++)v[e]._onDocumentTouch(t)},!f||{passive:!0,capture:!0});var g={enabled:!0},b=["top","top-start","top-end","right","right-start","right-end","bottom","bottom-start","bottom-end","left","left-start","left-end"],y={defaultPlacement:"top",defaultClass:"vue-tooltip-theme",defaultTargetClass:"has-tooltip",defaultHtml:!0,defaultTemplate:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',defaultArrowSelector:".tooltip-arrow, .tooltip__arrow",defaultInnerSelector:".tooltip-inner, .tooltip__inner",defaultDelay:0,defaultTrigger:"hover focus",defaultOffset:0,defaultContainer:"body",defaultBoundariesElement:void 0,defaultPopperOptions:{},defaultLoadingClass:"tooltip-loading",defaultLoadingContent:"...",autoHide:!0,defaultHideOnTargetClick:!0,disposeTimeout:5e3,popover:{defaultPlacement:"bottom",defaultClass:"vue-popover-theme",defaultBaseClass:"tooltip popover",defaultWrapperClass:"wrapper",defaultInnerClass:"tooltip-inner popover-inner",defaultArrowClass:"tooltip-arrow popover-arrow",defaultOpenClass:"open",defaultDelay:0,defaultTrigger:"click",defaultOffset:0,defaultContainer:"body",defaultBoundariesElement:void 0,defaultPopperOptions:{},defaultAutoHide:!0,defaultHandleResize:!0}};function w(t){var e={placement:void 0!==t.placement?t.placement:C.options.defaultPlacement,delay:void 0!==t.delay?t.delay:C.options.defaultDelay,html:void 0!==t.html?t.html:C.options.defaultHtml,template:void 0!==t.template?t.template:C.options.defaultTemplate,arrowSelector:void 0!==t.arrowSelector?t.arrowSelector:C.options.defaultArrowSelector,innerSelector:void 0!==t.innerSelector?t.innerSelector:C.options.defaultInnerSelector,trigger:void 0!==t.trigger?t.trigger:C.options.defaultTrigger,offset:void 0!==t.offset?t.offset:C.options.defaultOffset,container:void 0!==t.container?t.container:C.options.defaultContainer,boundariesElement:void 0!==t.boundariesElement?t.boundariesElement:C.options.defaultBoundariesElement,autoHide:void 0!==t.autoHide?t.autoHide:C.options.autoHide,hideOnTargetClick:void 0!==t.hideOnTargetClick?t.hideOnTargetClick:C.options.defaultHideOnTargetClick,loadingClass:void 0!==t.loadingClass?t.loadingClass:C.options.defaultLoadingClass,loadingContent:void 0!==t.loadingContent?t.loadingContent:C.options.defaultLoadingContent,popperOptions:s({},void 0!==t.popperOptions?t.popperOptions:C.options.defaultPopperOptions)};if(e.offset){var n=i(e.offset),o=e.offset;("number"===n||"string"===n&&-1===o.indexOf(","))&&(o="0, ".concat(o)),e.popperOptions.modifiers||(e.popperOptions.modifiers={}),e.popperOptions.modifiers.offset={offset:o}}return e.trigger&&-1!==e.trigger.indexOf("click")&&(e.hideOnTargetClick=!1),e}function E(t,e){for(var n=t.placement,o=0;o<b.length;o++){var r=b[o];e[r]&&(n=r)}return n}function x(t){var e=i(t);return"string"===e?t:!(!t||"object"!==e)&&t.content}function B(t){t._tooltip&&(t._tooltip.dispose(),delete t._tooltip,delete t._tooltipOldShow),t._tooltipTargetClasses&&(d(t,t._tooltipTargetClasses),delete t._tooltipTargetClasses)}function T(t,e){var n,o=e.value,r=(e.oldValue,e.modifiers),i=x(o);i&&g.enabled?(t._tooltip?((n=t._tooltip).setContent(i),n.setOptions(s({},o,{placement:E(o,r)}))):n=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=x(e),r=void 0!==e.classes?e.classes:C.options.defaultClass,i=s({title:o},w(s({},e,{placement:E(e,n)}))),A=t._tooltip=new m(t,i);A.setClasses(r),A._vueEl=t;var a=void 0!==e.targetClasses?e.targetClasses:C.options.defaultTargetClass;return t._tooltipTargetClasses=a,l(t,a),A}(t,o,r),void 0!==o.show&&o.show!==t._tooltipOldShow&&(t._tooltipOldShow=o.show,o.show?n.show():n.hide())):B(t)}var C={options:y,bind:T,update:T,unbind:function(t){B(t)}};function M(t){t.addEventListener("click",_),t.addEventListener("touchstart",N,!!f&&{passive:!0})}function I(t){t.removeEventListener("click",_),t.removeEventListener("touchstart",N),t.removeEventListener("touchend",O),t.removeEventListener("touchcancel",D)}function _(t){var e=t.currentTarget;t.closePopover=!e.$_vclosepopover_touch,t.closeAllPopover=e.$_closePopoverModifiers&&!!e.$_closePopoverModifiers.all}function N(t){if(1===t.changedTouches.length){var e=t.currentTarget;e.$_vclosepopover_touch=!0;var n=t.changedTouches[0];e.$_vclosepopover_touchPoint=n,e.addEventListener("touchend",O),e.addEventListener("touchcancel",D)}}function O(t){var e=t.currentTarget;if(e.$_vclosepopover_touch=!1,1===t.changedTouches.length){var n=t.changedTouches[0],o=e.$_vclosepopover_touchPoint;t.closePopover=Math.abs(n.screenY-o.screenY)<20&&Math.abs(n.screenX-o.screenX)<20,t.closeAllPopover=e.$_closePopoverModifiers&&!!e.$_closePopoverModifiers.all}}function D(t){t.currentTarget.$_vclosepopover_touch=!1}var Q={bind:function(t,e){var n=e.value,o=e.modifiers;t.$_closePopoverModifiers=o,(void 0===n||n)&&M(t)},update:function(t,e){var n=e.value,o=e.oldValue,r=e.modifiers;t.$_closePopoverModifiers=r,n!==o&&(void 0===n||n?M(t):I(t))},unbind:function(t){I(t)}};function L(t){var e=C.options.popover[t];return void 0===e?C.options[t]:e}var S=!1;"undefined"!=typeof window&&"undefined"!=typeof navigator&&(S=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream);var k=[],j=function(){};"undefined"!=typeof window&&(j=window.Element);var G={name:"VPopover",components:{ResizeObserver:r.a},props:{open:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},placement:{type:String,default:function(){return L("defaultPlacement")}},delay:{type:[String,Number,Object],default:function(){return L("defaultDelay")}},offset:{type:[String,Number],default:function(){return L("defaultOffset")}},trigger:{type:String,default:function(){return L("defaultTrigger")}},container:{type:[String,Object,j,Boolean],default:function(){return L("defaultContainer")}},boundariesElement:{type:[String,j],default:function(){return L("defaultBoundariesElement")}},popperOptions:{type:Object,default:function(){return L("defaultPopperOptions")}},popoverClass:{type:[String,Array],default:function(){return L("defaultClass")}},popoverBaseClass:{type:[String,Array],default:function(){return C.options.popover.defaultBaseClass}},popoverInnerClass:{type:[String,Array],default:function(){return C.options.popover.defaultInnerClass}},popoverWrapperClass:{type:[String,Array],default:function(){return C.options.popover.defaultWrapperClass}},popoverArrowClass:{type:[String,Array],default:function(){return C.options.popover.defaultArrowClass}},autoHide:{type:Boolean,default:function(){return C.options.popover.defaultAutoHide}},handleResize:{type:Boolean,default:function(){return C.options.popover.defaultHandleResize}},openGroup:{type:String,default:null},openClass:{type:[String,Array],default:function(){return C.options.popover.defaultOpenClass}}},data:function(){return{isOpen:!1,id:Math.random().toString(36).substr(2,10)}},computed:{cssClass:function(){return a({},this.openClass,this.isOpen)},popoverId:function(){return"popover_".concat(this.id)}},watch:{open:function(t){t?this.show():this.hide()},disabled:function(t,e){t!==e&&(t?this.hide():this.open&&this.show())},container:function(t){if(this.isOpen&&this.popperInstance){var e=this.$refs.popover,n=this.$refs.trigger,o=this.$_findContainer(this.container,n);if(!o)return void console.warn("No container for popover",this);o.appendChild(e),this.popperInstance.scheduleUpdate()}},trigger:function(t){this.$_removeEventListeners(),this.$_addEventListeners()},placement:function(t){var e=this;this.$_updatePopper(function(){e.popperInstance.options.placement=t})},offset:"$_restartPopper",boundariesElement:"$_restartPopper",popperOptions:{handler:"$_restartPopper",deep:!0}},created:function(){this.$_isDisposed=!1,this.$_mounted=!1,this.$_events=[],this.$_preventOpen=!1},mounted:function(){var t=this.$refs.popover;t.parentNode&&t.parentNode.removeChild(t),this.$_init(),this.open&&this.show()},deactivated:function(){this.hide()},beforeDestroy:function(){this.dispose()},methods:{show:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.event,o=(e.skipDelay,e.force),r=void 0!==o&&o;!r&&this.disabled||(this.$_scheduleShow(n),this.$emit("show")),this.$emit("update:open",!0),this.$_beingShowed=!0,requestAnimationFrame(function(){t.$_beingShowed=!1})},hide:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.event;t.skipDelay;this.$_scheduleHide(e),this.$emit("hide"),this.$emit("update:open",!1)},dispose:function(){if(this.$_isDisposed=!0,this.$_removeEventListeners(),this.hide({skipDelay:!0}),this.popperInstance&&(this.popperInstance.destroy(),!this.popperInstance.options.removeOnDestroy)){var t=this.$refs.popover;t.parentNode&&t.parentNode.removeChild(t)}this.$_mounted=!1,this.popperInstance=null,this.isOpen=!1,this.$emit("dispose")},$_init:function(){-1===this.trigger.indexOf("manual")&&this.$_addEventListeners()},$_show:function(){var t=this,e=this.$refs.trigger,n=this.$refs.popover;if(clearTimeout(this.$_disposeTimer),!this.isOpen){if(this.popperInstance&&(this.isOpen=!0,this.popperInstance.enableEventListeners(),this.popperInstance.scheduleUpdate()),!this.$_mounted){var r=this.$_findContainer(this.container,e);if(!r)return void console.warn("No container for popover",this);r.appendChild(n),this.$_mounted=!0}if(!this.popperInstance){var i=s({},this.popperOptions,{placement:this.placement});if(i.modifiers=s({},i.modifiers,{arrow:s({},i.modifiers&&i.modifiers.arrow,{element:this.$refs.arrow})}),this.offset){var A=this.$_getOffset();i.modifiers.offset=s({},i.modifiers&&i.modifiers.offset,{offset:A})}this.boundariesElement&&(i.modifiers.preventOverflow=s({},i.modifiers&&i.modifiers.preventOverflow,{boundariesElement:this.boundariesElement})),this.popperInstance=new o.a(e,n,i),requestAnimationFrame(function(){if(t.hidden)return t.hidden=!1,void t.$_hide();!t.$_isDisposed&&t.popperInstance?(t.popperInstance.scheduleUpdate(),requestAnimationFrame(function(){if(t.hidden)return t.hidden=!1,void t.$_hide();t.$_isDisposed?t.dispose():t.isOpen=!0})):t.dispose()})}var a=this.openGroup;if(a)for(var c,u=0;u<k.length;u++)(c=k[u]).openGroup!==a&&(c.hide(),c.$emit("close-group"));k.push(this),this.$emit("apply-show")}},$_hide:function(){var t=this;if(this.isOpen){var e=k.indexOf(this);-1!==e&&k.splice(e,1),this.isOpen=!1,this.popperInstance&&this.popperInstance.disableEventListeners(),clearTimeout(this.$_disposeTimer);var n=C.options.popover.disposeTimeout||C.options.disposeTimeout;null!==n&&(this.$_disposeTimer=setTimeout(function(){var e=t.$refs.popover;e&&(e.parentNode&&e.parentNode.removeChild(e),t.$_mounted=!1)},n)),this.$emit("apply-hide")}},$_findContainer:function(t,e){return"string"==typeof t?t=window.document.querySelector(t):!1===t&&(t=e.parentNode),t},$_getOffset:function(){var t=i(this.offset),e=this.offset;return("number"===t||"string"===t&&-1===e.indexOf(","))&&(e="0, ".concat(e)),e},$_addEventListeners:function(){var t=this,e=this.$refs.trigger,n=[],o=[];("string"==typeof this.trigger?this.trigger.split(" ").filter(function(t){return-1!==["click","hover","focus"].indexOf(t)}):[]).forEach(function(t){switch(t){case"hover":n.push("mouseenter"),o.push("mouseleave");break;case"focus":n.push("focus"),o.push("blur");break;case"click":n.push("click"),o.push("click")}}),n.forEach(function(n){var o=function(e){t.isOpen||(e.usedByTooltip=!0,!t.$_preventOpen&&t.show({event:e}),t.hidden=!1)};t.$_events.push({event:n,func:o}),e.addEventListener(n,o)}),o.forEach(function(n){var o=function(e){e.usedByTooltip||(t.hide({event:e}),t.hidden=!0)};t.$_events.push({event:n,func:o}),e.addEventListener(n,o)})},$_scheduleShow:function(){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(clearTimeout(this.$_scheduleTimer),t)this.$_show();else{var e=parseInt(this.delay&&this.delay.show||this.delay||0);this.$_scheduleTimer=setTimeout(this.$_show.bind(this),e)}},$_scheduleHide:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(clearTimeout(this.$_scheduleTimer),n)this.$_hide();else{var o=parseInt(this.delay&&this.delay.hide||this.delay||0);this.$_scheduleTimer=setTimeout(function(){if(t.isOpen){if(e&&"mouseleave"===e.type)if(t.$_setTooltipNodeEvent(e))return;t.$_hide()}},o)}},$_setTooltipNodeEvent:function(t){var e=this,n=this.$refs.trigger,o=this.$refs.popover,r=t.relatedreference||t.toElement||t.relatedTarget;return!!o.contains(r)&&(o.addEventListener(t.type,function r(i){var A=i.relatedreference||i.toElement||i.relatedTarget;o.removeEventListener(t.type,r),n.contains(A)||e.hide({event:i})}),!0)},$_removeEventListeners:function(){var t=this.$refs.trigger;this.$_events.forEach(function(e){var n=e.func,o=e.event;t.removeEventListener(o,n)}),this.$_events=[]},$_updatePopper:function(t){this.popperInstance&&(t(),this.isOpen&&this.popperInstance.scheduleUpdate())},$_restartPopper:function(){if(this.popperInstance){var t=this.isOpen;this.dispose(),this.$_isDisposed=!1,this.$_init(),t&&this.show({skipDelay:!0,force:!0})}},$_handleGlobalClose:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.$_beingShowed||(this.hide({event:t}),t.closePopover?this.$emit("close-directive"):this.$emit("auto-hide"),n&&(this.$_preventOpen=!0,setTimeout(function(){e.$_preventOpen=!1},300)))},$_handleResize:function(){this.isOpen&&this.popperInstance&&(this.popperInstance.scheduleUpdate(),this.$emit("resize"))}}};function U(t){for(var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=function(n){var o=k[n];if(o.$refs.popover){var r=o.$refs.popover.contains(t.target);requestAnimationFrame(function(){(t.closeAllPopover||t.closePopover&&r||o.autoHide&&!r)&&o.$_handleGlobalClose(t,e)})}},o=0;o<k.length;o++)n(o)}"undefined"!=typeof document&&"undefined"!=typeof window&&(S?document.addEventListener("touchend",function(t){U(t,!0)},!f||{passive:!0,capture:!0}):window.addEventListener("click",function(t){U(t)},!0));var Y=function(t,e,n,o,r,i,A,a,s,c){"boolean"!=typeof A&&(s=a,a=A,A=!1);var u,l="function"==typeof n?n.options:n;if(t&&t.render&&(l.render=t.render,l.staticRenderFns=t.staticRenderFns,l._compiled=!0,r&&(l.functional=!0)),o&&(l._scopeId=o),i?(u=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),e&&e.call(this,s(t)),t&&t._registeredComponents&&t._registeredComponents.add(i)},l._ssrRegister=u):e&&(u=A?function(){e.call(this,c(this.$root.$options.shadowRoot))}:function(t){e.call(this,a(t))}),u)if(l.functional){var d=l.render;l.render=function(t,e){return u.call(e),d(t,e)}}else{var f=l.beforeCreate;l.beforeCreate=f?[].concat(f,u):[u]}return n},H=G,P=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"v-popover",class:t.cssClass},[n("div",{ref:"trigger",staticClass:"trigger",staticStyle:{display:"inline-block"},attrs:{"aria-describedby":t.popoverId,tabindex:-1!==t.trigger.indexOf("focus")?0:void 0}},[t._t("default")],2),t._v(" "),n("div",{ref:"popover",class:[t.popoverBaseClass,t.popoverClass,t.cssClass],style:{visibility:t.isOpen?"visible":"hidden"},attrs:{id:t.popoverId,"aria-hidden":t.isOpen?"false":"true",tabindex:t.autoHide?0:void 0},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"]))return null;t.autoHide&&t.hide()}}},[n("div",{class:t.popoverWrapperClass},[n("div",{ref:"inner",class:t.popoverInnerClass,staticStyle:{position:"relative"}},[n("div",[t._t("popover")],2),t._v(" "),t.handleResize?n("ResizeObserver",{on:{notify:t.$_handleResize}}):t._e()],1),t._v(" "),n("div",{ref:"arrow",class:t.popoverArrowClass})])])])};P._withStripped=!0;var z=Y({render:P,staticRenderFns:[]},void 0,H,void 0,!1,void 0,void 0,void 0);var F=function(){this.__data__=[],this.size=0};var R=function(t,e){return t===e||t!=t&&e!=e};var Z=function(t,e){for(var n=t.length;n--;)if(R(t[n][0],e))return n;return-1},W=Array.prototype.splice;var $=function(t){var e=this.__data__,n=Z(e,t);return!(n<0||(n==e.length-1?e.pop():W.call(e,n,1),--this.size,0))};var J=function(t){var e=this.__data__,n=Z(e,t);return n<0?void 0:e[n][1]};var V=function(t){return Z(this.__data__,t)>-1};var X=function(t,e){var n=this.__data__,o=Z(n,t);return o<0?(++this.size,n.push([t,e])):n[o][1]=e,this};function q(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var o=t[e];this.set(o[0],o[1])}}q.prototype.clear=F,q.prototype.delete=$,q.prototype.get=J,q.prototype.has=V,q.prototype.set=X;var K=q;var tt=function(){this.__data__=new K,this.size=0};var et=function(t){var e=this.__data__,n=e.delete(t);return this.size=e.size,n};var nt=function(t){return this.__data__.get(t)};var ot=function(t){return this.__data__.has(t)},rt="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==t?t:"undefined"!=typeof self?self:{};function it(t,e){return t(e={exports:{}},e.exports),e.exports}var At="object"==typeof rt&&rt&&rt.Object===Object&&rt,at="object"==typeof self&&self&&self.Object===Object&&self,st=At||at||Function("return this")(),ct=st.Symbol,ut=Object.prototype,lt=ut.hasOwnProperty,dt=ut.toString,ft=ct?ct.toStringTag:void 0;var pt=function(t){var e=lt.call(t,ft),n=t[ft];try{t[ft]=void 0;var o=!0}catch(t){}var r=dt.call(t);return o&&(e?t[ft]=n:delete t[ft]),r},ht=Object.prototype.toString;var vt=function(t){return ht.call(t)},mt="[object Null]",gt="[object Undefined]",bt=ct?ct.toStringTag:void 0;var yt=function(t){return null==t?void 0===t?gt:mt:bt&&bt in Object(t)?pt(t):vt(t)};var wt=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)},Et="[object AsyncFunction]",xt="[object Function]",Bt="[object GeneratorFunction]",Tt="[object Proxy]";var Ct,Mt=function(t){if(!wt(t))return!1;var e=yt(t);return e==xt||e==Bt||e==Et||e==Tt},It=st["__core-js_shared__"],_t=(Ct=/[^.]+$/.exec(It&&It.keys&&It.keys.IE_PROTO||""))?"Symbol(src)_1."+Ct:"";var Nt=function(t){return!!_t&&_t in t},Ot=Function.prototype.toString;var Dt=function(t){if(null!=t){try{return Ot.call(t)}catch(t){}try{return t+""}catch(t){}}return""},Qt=/^\[object .+?Constructor\]$/,Lt=Function.prototype,St=Object.prototype,kt=Lt.toString,jt=St.hasOwnProperty,Gt=RegExp("^"+kt.call(jt).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");var Ut=function(t){return!(!wt(t)||Nt(t))&&(Mt(t)?Gt:Qt).test(Dt(t))};var Yt=function(t,e){return null==t?void 0:t[e]};var Ht=function(t,e){var n=Yt(t,e);return Ut(n)?n:void 0},Pt=Ht(st,"Map"),zt=Ht(Object,"create");var Ft=function(){this.__data__=zt?zt(null):{},this.size=0};var Rt=function(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e},Zt="__lodash_hash_undefined__",Wt=Object.prototype.hasOwnProperty;var $t=function(t){var e=this.__data__;if(zt){var n=e[t];return n===Zt?void 0:n}return Wt.call(e,t)?e[t]:void 0},Jt=Object.prototype.hasOwnProperty;var Vt=function(t){var e=this.__data__;return zt?void 0!==e[t]:Jt.call(e,t)},Xt="__lodash_hash_undefined__";var qt=function(t,e){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=zt&&void 0===e?Xt:e,this};function Kt(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var o=t[e];this.set(o[0],o[1])}}Kt.prototype.clear=Ft,Kt.prototype.delete=Rt,Kt.prototype.get=$t,Kt.prototype.has=Vt,Kt.prototype.set=qt;var te=Kt;var ee=function(){this.size=0,this.__data__={hash:new te,map:new(Pt||K),string:new te}};var ne=function(t){var e=typeof t;return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t};var oe=function(t,e){var n=t.__data__;return ne(e)?n["string"==typeof e?"string":"hash"]:n.map};var re=function(t){var e=oe(this,t).delete(t);return this.size-=e?1:0,e};var ie=function(t){return oe(this,t).get(t)};var Ae=function(t){return oe(this,t).has(t)};var ae=function(t,e){var n=oe(this,t),o=n.size;return n.set(t,e),this.size+=n.size==o?0:1,this};function se(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var o=t[e];this.set(o[0],o[1])}}se.prototype.clear=ee,se.prototype.delete=re,se.prototype.get=ie,se.prototype.has=Ae,se.prototype.set=ae;var ce=se,ue=200;var le=function(t,e){var n=this.__data__;if(n instanceof K){var o=n.__data__;if(!Pt||o.length<ue-1)return o.push([t,e]),this.size=++n.size,this;n=this.__data__=new ce(o)}return n.set(t,e),this.size=n.size,this};function de(t){var e=this.__data__=new K(t);this.size=e.size}de.prototype.clear=tt,de.prototype.delete=et,de.prototype.get=nt,de.prototype.has=ot,de.prototype.set=le;var fe=de,pe=function(){try{var t=Ht(Object,"defineProperty");return t({},"",{}),t}catch(t){}}();var he=function(t,e,n){"__proto__"==e&&pe?pe(t,e,{configurable:!0,enumerable:!0,value:n,writable:!0}):t[e]=n};var ve=function(t,e,n){(void 0===n||R(t[e],n))&&(void 0!==n||e in t)||he(t,e,n)};var me=function(t){return function(e,n,o){for(var r=-1,i=Object(e),A=o(e),a=A.length;a--;){var s=A[t?a:++r];if(!1===n(i[s],s,i))break}return e}}(),ge=it(function(t,e){var n=e&&!e.nodeType&&e,o=n&&t&&!t.nodeType&&t,r=o&&o.exports===n?st.Buffer:void 0,i=r?r.allocUnsafe:void 0;t.exports=function(t,e){if(e)return t.slice();var n=t.length,o=i?i(n):new t.constructor(n);return t.copy(o),o}}),be=st.Uint8Array;var ye=function(t){var e=new t.constructor(t.byteLength);return new be(e).set(new be(t)),e};var we=function(t,e){var n=e?ye(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.length)};var Ee=function(t,e){var n=-1,o=t.length;for(e||(e=Array(o));++n<o;)e[n]=t[n];return e},xe=Object.create,Be=function(){function t(){}return function(e){if(!wt(e))return{};if(xe)return xe(e);t.prototype=e;var n=new t;return t.prototype=void 0,n}}();var Te=function(t,e){return function(n){return t(e(n))}}(Object.getPrototypeOf,Object),Ce=Object.prototype;var Me=function(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||Ce)};var Ie=function(t){return"function"!=typeof t.constructor||Me(t)?{}:Be(Te(t))};var _e=function(t){return null!=t&&"object"==typeof t},Ne="[object Arguments]";var Oe=function(t){return _e(t)&&yt(t)==Ne},De=Object.prototype,Qe=De.hasOwnProperty,Le=De.propertyIsEnumerable,Se=Oe(function(){return arguments}())?Oe:function(t){return _e(t)&&Qe.call(t,"callee")&&!Le.call(t,"callee")},ke=Array.isArray,je=9007199254740991;var Ge=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=je};var Ue=function(t){return null!=t&&Ge(t.length)&&!Mt(t)};var Ye=function(t){return _e(t)&&Ue(t)};var He=function(){return!1},Pe=it(function(t,e){var n=e&&!e.nodeType&&e,o=n&&t&&!t.nodeType&&t,r=o&&o.exports===n?st.Buffer:void 0,i=(r?r.isBuffer:void 0)||He;t.exports=i}),ze="[object Object]",Fe=Function.prototype,Re=Object.prototype,Ze=Fe.toString,We=Re.hasOwnProperty,$e=Ze.call(Object);var Je=function(t){if(!_e(t)||yt(t)!=ze)return!1;var e=Te(t);if(null===e)return!0;var n=We.call(e,"constructor")&&e.constructor;return"function"==typeof n&&n instanceof n&&Ze.call(n)==$e},Ve={};Ve["[object Float32Array]"]=Ve["[object Float64Array]"]=Ve["[object Int8Array]"]=Ve["[object Int16Array]"]=Ve["[object Int32Array]"]=Ve["[object Uint8Array]"]=Ve["[object Uint8ClampedArray]"]=Ve["[object Uint16Array]"]=Ve["[object Uint32Array]"]=!0,Ve["[object Arguments]"]=Ve["[object Array]"]=Ve["[object ArrayBuffer]"]=Ve["[object Boolean]"]=Ve["[object DataView]"]=Ve["[object Date]"]=Ve["[object Error]"]=Ve["[object Function]"]=Ve["[object Map]"]=Ve["[object Number]"]=Ve["[object Object]"]=Ve["[object RegExp]"]=Ve["[object Set]"]=Ve["[object String]"]=Ve["[object WeakMap]"]=!1;var Xe=function(t){return _e(t)&&Ge(t.length)&&!!Ve[yt(t)]};var qe=function(t){return function(e){return t(e)}},Ke=it(function(t,e){var n=e&&!e.nodeType&&e,o=n&&t&&!t.nodeType&&t,r=o&&o.exports===n&&At.process,i=function(){try{var t=o&&o.require&&o.require("util").types;return t||r&&r.binding&&r.binding("util")}catch(t){}}();t.exports=i}),tn=Ke&&Ke.isTypedArray,en=tn?qe(tn):Xe;var nn=function(t,e){if("__proto__"!=e)return t[e]},on=Object.prototype.hasOwnProperty;var rn=function(t,e,n){var o=t[e];on.call(t,e)&&R(o,n)&&(void 0!==n||e in t)||he(t,e,n)};var An=function(t,e,n,o){var r=!n;n||(n={});for(var i=-1,A=e.length;++i<A;){var a=e[i],s=o?o(n[a],t[a],a,n,t):void 0;void 0===s&&(s=t[a]),r?he(n,a,s):rn(n,a,s)}return n};var an=function(t,e){for(var n=-1,o=Array(t);++n<t;)o[n]=e(n);return o},sn=9007199254740991,cn=/^(?:0|[1-9]\d*)$/;var un=function(t,e){var n=typeof t;return!!(e=null==e?sn:e)&&("number"==n||"symbol"!=n&&cn.test(t))&&t>-1&&t%1==0&&t<e},ln=Object.prototype.hasOwnProperty;var dn=function(t,e){var n=ke(t),o=!n&&Se(t),r=!n&&!o&&Pe(t),i=!n&&!o&&!r&&en(t),A=n||o||r||i,a=A?an(t.length,String):[],s=a.length;for(var c in t)!e&&!ln.call(t,c)||A&&("length"==c||r&&("offset"==c||"parent"==c)||i&&("buffer"==c||"byteLength"==c||"byteOffset"==c)||un(c,s))||a.push(c);return a};var fn=function(t){var e=[];if(null!=t)for(var n in Object(t))e.push(n);return e},pn=Object.prototype.hasOwnProperty;var hn=function(t){if(!wt(t))return fn(t);var e=Me(t),n=[];for(var o in t)("constructor"!=o||!e&&pn.call(t,o))&&n.push(o);return n};var vn=function(t){return Ue(t)?dn(t,!0):hn(t)};var mn=function(t){return An(t,vn(t))};var gn=function(t,e,n,o,r,i,A){var a=nn(t,n),s=nn(e,n),c=A.get(s);if(c)ve(t,n,c);else{var u=i?i(a,s,n+"",t,e,A):void 0,l=void 0===u;if(l){var d=ke(s),f=!d&&Pe(s),p=!d&&!f&&en(s);u=s,d||f||p?ke(a)?u=a:Ye(a)?u=Ee(a):f?(l=!1,u=ge(s,!0)):p?(l=!1,u=we(s,!0)):u=[]:Je(s)||Se(s)?(u=a,Se(a)?u=mn(a):wt(a)&&!Mt(a)||(u=Ie(s))):l=!1}l&&(A.set(s,u),r(u,s,o,i,A),A.delete(s)),ve(t,n,u)}};var bn=function t(e,n,o,r,i){e!==n&&me(n,function(A,a){if(wt(A))i||(i=new fe),gn(e,n,a,o,t,r,i);else{var s=r?r(nn(e,a),A,a+"",e,n,i):void 0;void 0===s&&(s=A),ve(e,a,s)}},vn)};var yn=function(t){return t};var wn=function(t,e,n){switch(n.length){case 0:return t.call(e);case 1:return t.call(e,n[0]);case 2:return t.call(e,n[0],n[1]);case 3:return t.call(e,n[0],n[1],n[2])}return t.apply(e,n)},En=Math.max;var xn=function(t,e,n){return e=En(void 0===e?t.length-1:e,0),function(){for(var o=arguments,r=-1,i=En(o.length-e,0),A=Array(i);++r<i;)A[r]=o[e+r];r=-1;for(var a=Array(e+1);++r<e;)a[r]=o[r];return a[e]=n(A),wn(t,this,a)}};var Bn=function(t){return function(){return t}},Tn=pe?function(t,e){return pe(t,"toString",{configurable:!0,enumerable:!1,value:Bn(e),writable:!0})}:yn,Cn=800,Mn=16,In=Date.now;var _n=function(t){var e=0,n=0;return function(){var o=In(),r=Mn-(o-n);if(n=o,r>0){if(++e>=Cn)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}(Tn);var Nn=function(t,e){return _n(xn(t,e,yn),t+"")};var On=function(t,e,n){if(!wt(n))return!1;var o=typeof e;return!!("number"==o?Ue(n)&&un(e,n.length):"string"==o&&e in n)&&R(n[e],t)};var Dn=function(t){return Nn(function(e,n){var o=-1,r=n.length,i=r>1?n[r-1]:void 0,A=r>2?n[2]:void 0;for(i=t.length>3&&"function"==typeof i?(r--,i):void 0,A&&On(n[0],n[1],A)&&(i=r<3?void 0:i,r=1),e=Object(e);++o<r;){var a=n[o];a&&t(e,a,o,i)}return e})}(function(t,e,n){bn(t,e,n)});!function(t,e){void 0===e&&(e={});var n=e.insertAt;if(t&&"undefined"!=typeof document){var o=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css","top"===n&&o.firstChild?o.insertBefore(r,o.firstChild):o.appendChild(r),r.styleSheet?r.styleSheet.cssText=t:r.appendChild(document.createTextNode(t))}}(".resize-observer[data-v-b329ee4c]{position:absolute;top:0;left:0;z-index:-1;width:100%;height:100%;border:none;background-color:transparent;pointer-events:none;display:block;overflow:hidden;opacity:0}.resize-observer[data-v-b329ee4c] object{display:block;position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1}");var Qn=C,Ln={install:function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!t.installed){t.installed=!0;var o={};Dn(o,y,n),Ln.options=o,C.options=o,e.directive("tooltip",C),e.directive("close-popover",Q),e.component("v-popover",z)}},get enabled(){return g.enabled},set enabled(t){g.enabled=t}},Sn=null;"undefined"!=typeof window?Sn=window.Vue:void 0!==t&&(Sn=t.Vue),Sn&&Sn.use(Ln)}).call(this,n(16))},function(t,e,n){"use strict";n.r(e);var o=n(6);n(32);
/**
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
o.a.options.defaultTemplate='<div class="vue-tooltip" role="tooltip" data-v-'.concat("e56a121",'><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'),o.a.options.defaultHtml=!1,e.default=o.a},,function(t,e,n){"use strict";t.exports=function(t,e){return"string"!=typeof(t=t.__esModule?t.default:t)?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),/["'() \t\n]/.test(t)||e?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t)}},function(t,e){t.exports="data:application/vnd.ms-fontobject;base64,UgoAAIgJAAABAAIAAAAAAAIABQMAAAAAAAABQJABAAAAAExQAAAAABAAAAAAAAAAAAAAAAAAAAEAAAAA96LQiQAAAAAAAAAAAAAAAAAAAAAAACgAAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0AZQA1ADYAYQAxADIAMQAAAAAAABYAAFYAZQByAHMAaQBvAG4AIAAxAC4AMAAAKAAAaQBjAG8AbgBmAG8AbgB0AC0AdgB1AGUALQBlADUANgBhADEAMgAxAAAAAAABAAAACgCAAAMAIE9TLzJ045CIAAAArAAAAGBjbWFw6iTrvAAAAQwAAAFKZ2x5ZnQFn1kAAAJYAAADPGhlYWQm5i6+AAAFlAAAADZoaGVhJxwTgAAABcwAAAAkaG10eBOHAAAAAAXwAAAAGmxvY2EDmgSgAAAGDAAAABhtYXhwARgAVwAABiQAAAAgbmFtZdjPeAgAAAZEAAACpnBvc3T7yw12AAAI7AAAAJwABBOIAZAABQAADGUNrAAAArwMZQ2sAAAJYAD1BQoAAAIABQMAAAAAAAAAAAAAEAAAAAAAAAAAAAAAUGZFZABA6gHqCxOIAAABwhOIAAAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQAAAAAARAADAAEAAAAcAAQAKAAAAAYABAABAALqBuoL//8AAOoB6gf//xYAFf8AAQAAAAAAAAAAAQYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAA6mD0MABQALAAAJAhEJBBEJAQ6m+oIFfvu6BEb6gvqCBX77ugRGD0L6gvqCATgERgRGATj6gvqCATgERgRGAAEAAAAADW4SUAAFAAAJAREJAREGGwdT93QIjAnE+K3+yAiLCIz+xwACAAAAAA/fD0MABQALAAAJAhEJBBEJAQTiBX76ggRG+7oFfgV/+oEERvu6BEYFfgV+/sj7uvu6/sgFfgV+/sj7uvu6AAEAAAAADqYSUAAFAAAJAREJARENbvitCIv3dQnEB1MBOfd093UBOAABAAAAABEXERcACwAACQsRF/3t+sD6wP3tBUD6wAITBUAFQAIT+sAEhP3tBUD6wAITBUAFQAIT+sAFQP3t+sAAAf//AAATkxLsADMAAAEiBw4BFxYXASEmBwYHBgcGFBcWFxYXFjchAQYHBhcWFx4BFxYXFjc2NwE2NzYnJicBLgEKYGVPSkYQEkgF1/HgTT46KScUFBQUJyk6Pk0OIPopNxoYAwMbGVY1Nzs+Oj81B+07FRUUFTz4Eyx0Euw5NKxZYEf6KgEbGC4sOTh4ODksLhgbAvopNT87Pjo3NlYZGgMDGBk4B+w8UVBPUjwH7C0yAAAAAwAAAAARFxEXAAMABwALAAABESERAREhEQERIRECcQ6m8VoOpvFaDqYRF/2PAnH55v2PAnH55f2PAnEAAwAAAAASUAw1ABgAMQBKAAABIgcOAQcGFhceARcWMjc+ATc2NCcuAScmISIHDgEHBhQXHgEXFjI3PgE3NjQnLgEnJiEiBw4BBwYUFx4BFxYyNz4BNzY0Jy4BJyYDqoB0cK0vMgExL61wdP90cK0vMjIvrXB0BZt/dHCtMDExMK1wdP50cK0wMTEwrXB0BZyAdHCtLzExL61wdP90cK0vMjIvrXB0DDUxMK1wdP50cK0wMTEwrXB0/nRwrTAxMTCtcHT+dHCtMDExMK1wdP50cK0wMTEwrXB0/nRwrTAxMTCtcHT+dHCtMDEAAAACAAAAAA/fD98AAwAHAAABESERIREhEQOqBOICcQTiD9/zyww188sMNQAAAAEAAAAAERcRFwACAAAJAgJxDqbxWhEX+K34rQABAAAAAQAAidCi918PPPUACxOIAAAAANpDU6YAAAAA2fJ3p///AAATkxLsAAAACAACAAAAAAAAAAEAABOIAAAAABOI////9ROTAAEAAAAAAAAAAAAAAAAAAAACAAAAABOIAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAIgA2AFgAbACMAOYBBAF6AZABngABAAAACwBLAAMAAAAAAAIAAAAKAAoAAAD/AAAAAAAAAAAAEADGAAEAAAAAAAEAFAAAAAEAAAAAAAIABwAUAAEAAAAAAAMAFAAbAAEAAAAAAAQAFAAvAAEAAAAAAAUACwBDAAEAAAAAAAYAFABOAAEAAAAAAAoAKwBiAAEAAAAAAAsAEwCNAAMAAQQJAAEAKACgAAMAAQQJAAIADgDIAAMAAQQJAAMAKADWAAMAAQQJAAQAKAD+AAMAAQQJAAUAFgEmAAMAAQQJAAYAKAE8AAMAAQQJAAoAVgFkAAMAAQQJAAsAJgG6aWNvbmZvbnQtdnVlLWU1NmExMjFSZWd1bGFyaWNvbmZvbnQtdnVlLWU1NmExMjFpY29uZm9udC12dWUtZTU2YTEyMVZlcnNpb24gMS4waWNvbmZvbnQtdnVlLWU1NmExMjFHZW5lcmF0ZWQgYnkgc3ZnMnR0ZiBmcm9tIEZvbnRlbGxvIHByb2plY3QuaHR0cDovL2ZvbnRlbGxvLmNvbQBpAGMAbwBuAGYAbwBuAHQALQB2AHUAZQAtAGUANQA2AGEAMQAyADEAUgBlAGcAdQBsAGEAcgBpAGMAbwBuAGYAbwBuAHQALQB2AHUAZQAtAGUANQA2AGEAMQAyADEAaQBjAG8AbgBmAG8AbgB0AC0AdgB1AGUALQBlADUANgBhADEAMgAxAFYAZQByAHMAaQBvAG4AIAAxAC4AMABpAGMAbwBuAGYAbwBuAHQALQB2AHUAZQAtAGUANQA2AGEAMQAyADEARwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABzAHYAZwAyAHQAdABmACAAZgByAG8AbQAgAEYAbwBuAHQAZQBsAGwAbwAgAHAAcgBvAGoAZQBjAHQALgBoAHQAdABwADoALwAvAGYAbwBuAHQAZQBsAGwAbwAuAGMAbwBtAAAAAgAAAAAAAAAyAAAAAAAAAAAAAAAAAAAAAAAAAAAACwALAAABAgEDAQQBBQEGAQcBCAEJAQoBCxFhcnJvdy1sZWZ0LWRvdWJsZQphcnJvdy1sZWZ0EmFycm93LXJpZ2h0LWRvdWJsZQthcnJvdy1yaWdodAVjbG9zZQxjb25maXJtLWZhZGUEbWVudQRtb3JlBXBhdXNlBHBsYXk="},function(t,e){t.exports="data:font/woff;base64,d09GRgABAAAAAAnQAAoAAAAACYgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAAA9AAAAGAAAABgdOOQiGNtYXAAAAFUAAABSgAAAUrqJOu8Z2x5ZgAAAqAAAAM8AAADPHQFn1loZWFkAAAF3AAAADYAAAA2JuYuvmhoZWEAAAYUAAAAJAAAACQnHBOAaG10eAAABjgAAAAaAAAAGhOHAABsb2NhAAAGVAAAABgAAAAYA5oEoG1heHAAAAZsAAAAIAAAACABGABXbmFtZQAABowAAAKmAAACptjPeAhwb3N0AAAJNAAAAJwAAACc+8sNdgAEE4gBkAAFAAAMZQ2sAAACvAxlDawAAAlgAPUFCgAAAgAFAwAAAAAAAAAAAAAQAAAAAAAAAAAAAABQZkVkAEDqAeoLE4gAAAHCE4gAAAAAAAEAAAAAAAAAAAAAACAAAAAAAAMAAAADAAAAHAABAAAAAABEAAMAAQAAABwABAAoAAAABgAEAAEAAuoG6gv//wAA6gHqB///FgAV/wABAAAAAAAAAAABBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAADqYPQwAFAAsAAAkCEQkEEQkBDqb6ggV++7oERvqC+oIFfvu6BEYPQvqC+oIBOARGBEYBOPqC+oIBOARGBEYAAQAAAAANbhJQAAUAAAkBEQkBEQYbB1P3dAiMCcT4rf7ICIsIjP7HAAIAAAAAD98PQwAFAAsAAAkCEQkEEQkBBOIFfvqCBEb7ugV+BX/6gQRG+7oERgV+BX7+yPu6+7r+yAV+BX7+yPu6+7oAAQAAAAAOphJQAAUAAAkBEQkBEQ1u+K0Ii/d1CcQHUwE593T3dQE4AAEAAAAAERcRFwALAAAJCxEX/e36wPrA/e0FQPrAAhMFQAVAAhP6wASE/e0FQPrAAhMFQAVAAhP6wAVA/e36wAAB//8AABOTEuwAMwAAASIHDgEXFhcBISYHBgcGBwYUFxYXFhcWNyEBBgcGFxYXHgEXFhcWNzY3ATY3NicmJwEuAQpgZU9KRhASSAXX8eBNPjopJxQUFBQnKTo+TQ4g+ik3GhgDAxsZVjU3Oz46PzUH7TsVFRQVPPgTLHQS7Dk0rFlgR/oqARsYLiw5OHg4OSwuGBsC+ik1Pzs+Ojc2VhkaAwMYGTgH7DxRUE9SPAfsLTIAAAADAAAAABEXERcAAwAHAAsAAAERIREBESERAREhEQJxDqbxWg6m8VoOphEX/Y8Ccfnm/Y8Ccfnl/Y8CcQADAAAAABJQDDUAGAAxAEoAAAEiBw4BBwYWFx4BFxYyNz4BNzY0Jy4BJyYhIgcOAQcGFBceARcWMjc+ATc2NCcuAScmISIHDgEHBhQXHgEXFjI3PgE3NjQnLgEnJgOqgHRwrS8yATEvrXB0/3RwrS8yMi+tcHQFm390cK0wMTEwrXB0/nRwrTAxMTCtcHQFnIB0cK0vMTEvrXB0/3RwrS8yMi+tcHQMNTEwrXB0/nRwrTAxMTCtcHT+dHCtMDExMK1wdP50cK0wMTEwrXB0/nRwrTAxMTCtcHT+dHCtMDExMK1wdP50cK0wMQAAAAIAAAAAD98P3wADAAcAAAERIREhESERA6oE4gJxBOIP3/PLDDXzyww1AAAAAQAAAAARFxEXAAIAAAkCAnEOpvFaERf4rfitAAEAAAABAACJ0KL3Xw889QALE4gAAAAA2kNTpgAAAADZ8nen//8AABOTEuwAAAAIAAIAAAAAAAAAAQAAE4gAAAAAE4j////1E5MAAQAAAAAAAAAAAAAAAAAAAAIAAAAAE4gAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAiADYAWABsAIwA5gEEAXoBkAGeAAEAAAALAEsAAwAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAAAQAMYAAQAAAAAAAQAUAAAAAQAAAAAAAgAHABQAAQAAAAAAAwAUABsAAQAAAAAABAAUAC8AAQAAAAAABQALAEMAAQAAAAAABgAUAE4AAQAAAAAACgArAGIAAQAAAAAACwATAI0AAwABBAkAAQAoAKAAAwABBAkAAgAOAMgAAwABBAkAAwAoANYAAwABBAkABAAoAP4AAwABBAkABQAWASYAAwABBAkABgAoATwAAwABBAkACgBWAWQAAwABBAkACwAmAbppY29uZm9udC12dWUtZTU2YTEyMVJlZ3VsYXJpY29uZm9udC12dWUtZTU2YTEyMWljb25mb250LXZ1ZS1lNTZhMTIxVmVyc2lvbiAxLjBpY29uZm9udC12dWUtZTU2YTEyMUdlbmVyYXRlZCBieSBzdmcydHRmIGZyb20gRm9udGVsbG8gcHJvamVjdC5odHRwOi8vZm9udGVsbG8uY29tAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0AZQA1ADYAYQAxADIAMQBSAGUAZwB1AGwAYQByAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0AZQA1ADYAYQAxADIAMQBpAGMAbwBuAGYAbwBuAHQALQB2AHUAZQAtAGUANQA2AGEAMQAyADEAVgBlAHIAcwBpAG8AbgAgADEALgAwAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0AZQA1ADYAYQAxADIAMQBHAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAHMAdgBnADIAdAB0AGYAIABmAHIAbwBtACAARgBvAG4AdABlAGwAbABvACAAcAByAG8AagBlAGMAdAAuAGgAdAB0AHAAOgAvAC8AZgBvAG4AdABlAGwAbABvAC4AYwBvAG0AAAACAAAAAAAAADIAAAAAAAAAAAAAAAAAAAAAAAAAAAALAAsAAAECAQMBBAEFAQYBBwEIAQkBCgELEWFycm93LWxlZnQtZG91YmxlCmFycm93LWxlZnQSYXJyb3ctcmlnaHQtZG91YmxlC2Fycm93LXJpZ2h0BWNsb3NlDGNvbmZpcm0tZmFkZQRtZW51BG1vcmUFcGF1c2UEcGxheQ=="},function(t,e){t.exports="data:font/ttf;base64,AAEAAAAKAIAAAwAgT1MvMnTjkIgAAACsAAAAYGNtYXDqJOu8AAABDAAAAUpnbHlmdAWfWQAAAlgAAAM8aGVhZCbmLr4AAAWUAAAANmhoZWEnHBOAAAAFzAAAACRobXR4E4cAAAAABfAAAAAabG9jYQOaBKAAAAYMAAAAGG1heHABGABXAAAGJAAAACBuYW1l2M94CAAABkQAAAKmcG9zdPvLDXYAAAjsAAAAnAAEE4gBkAAFAAAMZQ2sAAACvAxlDawAAAlgAPUFCgAAAgAFAwAAAAAAAAAAAAAQAAAAAAAAAAAAAABQZkVkAEDqAeoLE4gAAAHCE4gAAAAAAAEAAAAAAAAAAAAAACAAAAAAAAMAAAADAAAAHAABAAAAAABEAAMAAQAAABwABAAoAAAABgAEAAEAAuoG6gv//wAA6gHqB///FgAV/wABAAAAAAAAAAABBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAADqYPQwAFAAsAAAkCEQkEEQkBDqb6ggV++7oERvqC+oIFfvu6BEYPQvqC+oIBOARGBEYBOPqC+oIBOARGBEYAAQAAAAANbhJQAAUAAAkBEQkBEQYbB1P3dAiMCcT4rf7ICIsIjP7HAAIAAAAAD98PQwAFAAsAAAkCEQkEEQkBBOIFfvqCBEb7ugV+BX/6gQRG+7oERgV+BX7+yPu6+7r+yAV+BX7+yPu6+7oAAQAAAAAOphJQAAUAAAkBEQkBEQ1u+K0Ii/d1CcQHUwE593T3dQE4AAEAAAAAERcRFwALAAAJCxEX/e36wPrA/e0FQPrAAhMFQAVAAhP6wASE/e0FQPrAAhMFQAVAAhP6wAVA/e36wAAB//8AABOTEuwAMwAAASIHDgEXFhcBISYHBgcGBwYUFxYXFhcWNyEBBgcGFxYXHgEXFhcWNzY3ATY3NicmJwEuAQpgZU9KRhASSAXX8eBNPjopJxQUFBQnKTo+TQ4g+ik3GhgDAxsZVjU3Oz46PzUH7TsVFRQVPPgTLHQS7Dk0rFlgR/oqARsYLiw5OHg4OSwuGBsC+ik1Pzs+Ojc2VhkaAwMYGTgH7DxRUE9SPAfsLTIAAAADAAAAABEXERcAAwAHAAsAAAERIREBESERAREhEQJxDqbxWg6m8VoOphEX/Y8Ccfnm/Y8Ccfnl/Y8CcQADAAAAABJQDDUAGAAxAEoAAAEiBw4BBwYWFx4BFxYyNz4BNzY0Jy4BJyYhIgcOAQcGFBceARcWMjc+ATc2NCcuAScmISIHDgEHBhQXHgEXFjI3PgE3NjQnLgEnJgOqgHRwrS8yATEvrXB0/3RwrS8yMi+tcHQFm390cK0wMTEwrXB0/nRwrTAxMTCtcHQFnIB0cK0vMTEvrXB0/3RwrS8yMi+tcHQMNTEwrXB0/nRwrTAxMTCtcHT+dHCtMDExMK1wdP50cK0wMTEwrXB0/nRwrTAxMTCtcHT+dHCtMDExMK1wdP50cK0wMQAAAAIAAAAAD98P3wADAAcAAAERIREhESERA6oE4gJxBOIP3/PLDDXzyww1AAAAAQAAAAARFxEXAAIAAAkCAnEOpvFaERf4rfitAAEAAAABAACJ0KL3Xw889QALE4gAAAAA2kNTpgAAAADZ8nen//8AABOTEuwAAAAIAAIAAAAAAAAAAQAAE4gAAAAAE4j////1E5MAAQAAAAAAAAAAAAAAAAAAAAIAAAAAE4gAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAiADYAWABsAIwA5gEEAXoBkAGeAAEAAAALAEsAAwAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAAAQAMYAAQAAAAAAAQAUAAAAAQAAAAAAAgAHABQAAQAAAAAAAwAUABsAAQAAAAAABAAUAC8AAQAAAAAABQALAEMAAQAAAAAABgAUAE4AAQAAAAAACgArAGIAAQAAAAAACwATAI0AAwABBAkAAQAoAKAAAwABBAkAAgAOAMgAAwABBAkAAwAoANYAAwABBAkABAAoAP4AAwABBAkABQAWASYAAwABBAkABgAoATwAAwABBAkACgBWAWQAAwABBAkACwAmAbppY29uZm9udC12dWUtZTU2YTEyMVJlZ3VsYXJpY29uZm9udC12dWUtZTU2YTEyMWljb25mb250LXZ1ZS1lNTZhMTIxVmVyc2lvbiAxLjBpY29uZm9udC12dWUtZTU2YTEyMUdlbmVyYXRlZCBieSBzdmcydHRmIGZyb20gRm9udGVsbG8gcHJvamVjdC5odHRwOi8vZm9udGVsbG8uY29tAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0AZQA1ADYAYQAxADIAMQBSAGUAZwB1AGwAYQByAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0AZQA1ADYAYQAxADIAMQBpAGMAbwBuAGYAbwBuAHQALQB2AHUAZQAtAGUANQA2AGEAMQAyADEAVgBlAHIAcwBpAG8AbgAgADEALgAwAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0AZQA1ADYAYQAxADIAMQBHAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAHMAdgBnADIAdAB0AGYAIABmAHIAbwBtACAARgBvAG4AdABlAGwAbABvACAAcAByAG8AagBlAGMAdAAuAGgAdAB0AHAAOgAvAC8AZgBvAG4AdABlAGwAbABvAC4AYwBvAG0AAAACAAAAAAAAADIAAAAAAAAAAAAAAAAAAAAAAAAAAAALAAsAAAECAQMBBAEFAQYBBwEIAQkBCgELEWFycm93LWxlZnQtZG91YmxlCmFycm93LWxlZnQSYXJyb3ctcmlnaHQtZG91YmxlC2Fycm93LXJpZ2h0BWNsb3NlDGNvbmZpcm0tZmFkZQRtZW51BG1vcmUFcGF1c2UEcGxheQ=="},function(t,e){t.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCIgPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48bWV0YWRhdGE+PC9tZXRhZGF0YT48ZGVmcz48Zm9udCBpZD0iaWNvbmZvbnQtdnVlLWU1NmExMjEiIGhvcml6LWFkdi14PSI1MDAwIj48Zm9udC1mYWNlIGZvbnQtZmFtaWx5PSJpY29uZm9udC12dWUtZTU2YTEyMSIgZm9udC13ZWlnaHQ9IjQwMCIgZm9udC1zdHJldGNoPSJub3JtYWwiIHVuaXRzLXBlci1lbT0iNTAwMCIgcGFub3NlLTE9IjIgMCA1IDMgMCAwIDAgMCAwIDAiIGFzY2VudD0iNTAwMCIgZGVzY2VudD0iMCIgeC1oZWlnaHQ9IjAiIGJib3g9Ii0xIDAgNTAxMSA0ODQ0IiB1bmRlcmxpbmUtdGhpY2tuZXNzPSIwIiB1bmRlcmxpbmUtcG9zaXRpb249IjUwIiB1bmljb2RlLXJhbmdlPSJVK2VhMDEtZWEwYiIgLz48bWlzc2luZy1nbHlwaCBob3Jpei1hZHYteD0iMCIgIC8+PGdseXBoIGdseXBoLW5hbWU9ImFycm93LWxlZnQtZG91YmxlIiB1bmljb2RlPSImI3hlYTAxOyIgZD0iTTM3NTAgMzkwNiBsLTE0MDYgLTE0MDYgbDE0MDYgLTE0MDYgbDAgMzEyIGwtMTA5NCAxMDk0IGwxMDk0IDEwOTQgbDAgMzEyIFpNMjM0NCAzOTA2IGwtMTQwNiAtMTQwNiBsMTQwNiAtMTQwNiBsMCAzMTIgbC0xMDk0IDEwOTQgbDEwOTQgMTA5NCBsMCAzMTIgWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0iYXJyb3ctbGVmdCIgdW5pY29kZT0iJiN4ZWEwMjsiIGQ9Ik0xNTYzIDI1MDAgbDE4NzUgLTE4NzUgbDAgLTMxMiBsLTIxODggMjE4NyBsMjE4OCAyMTg4IGwwIC0zMTMgbC0xODc1IC0xODc1IFoiIC8+PGdseXBoIGdseXBoLW5hbWU9ImFycm93LXJpZ2h0LWRvdWJsZSIgdW5pY29kZT0iJiN4ZWEwMzsiIGQ9Ik0xMjUwIDEwOTQgbDE0MDYgMTQwNiBsLTE0MDYgMTQwNiBsMCAtMzEyIGwxMDk0IC0xMDk0IGwtMTA5NCAtMTA5NCBsMCAtMzEyIFpNMjY1NiAxMDk0IGwxNDA3IDE0MDYgbC0xNDA3IDE0MDYgbDAgLTMxMiBsMTA5NCAtMTA5NCBsLTEwOTQgLTEwOTQgbDAgLTMxMiBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJhcnJvdy1yaWdodCIgdW5pY29kZT0iJiN4ZWEwNDsiIGQ9Ik0zNDM4IDI1MDAgbC0xODc1IDE4NzUgbDAgMzEzIGwyMTg3IC0yMTg4IGwtMjE4NyAtMjE4NyBsMCAzMTIgbDE4NzUgMTg3NSBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJjbG9zZSIgdW5pY29kZT0iJiN4ZWEwNTsiIGQ9Ik00Mzc1IDExNTYgbC01MzEgLTUzMSBsLTEzNDQgMTM0NCBsLTEzNDQgLTEzNDQgbC01MzEgNTMxIGwxMzQ0IDEzNDQgbC0xMzQ0IDEzNDQgbDUzMSA1MzEgbDEzNDQgLTEzNDQgbDEzNDQgMTM0NCBsNTMxIC01MzEgbC0xMzQ0IC0xMzQ0IGwxMzQ0IC0xMzQ0IFoiIC8+PGdseXBoIGdseXBoLW5hbWU9ImNvbmZpcm0tZmFkZSIgdW5pY29kZT0iJiN4ZWEwNjsmI3hlYTA3OyIgZD0iTTI2NTYgNDg0NCBxLTEwMSAwIC0xODAgLTU3IHEtNzQgLTUyIC0xMDkgLTEzOCBxLTM1IC04NiAtMTkgLTE3NSBxMTggLTk2IDkwIC0xNjcgbDE0OTUgLTE0OTQgbC0zNjE2IDAgcS03NyAxIC0xMzkgLTI2IHEtNTggLTI0IC05OSAtNzAgcS0zOSAtNDQgLTU5IC0xMDEgcS0yMCAtNTYgLTIwIC0xMTYgcTAgLTYwIDIwIC0xMTYgcTIwIC01NyA1OSAtMTAxIHE0MSAtNDYgOTkgLTcwIHE2MiAtMjcgMTM5IC0yNSBsMzYxNiAwIGwtMTQ5NSAtMTQ5NSBxLTU1IC01MyAtODEgLTExNiBxLTI0IC01OSAtMjEgLTEyMSBxMyAtNTggMzAgLTExMyBxMjUgLTU0IDY4IC05NyBxNDMgLTQzIDk2IC02OCBxNTUgLTI2IDExNCAtMjkgcTYyIC0zIDEyMCAyMSBxNjMgMjUgMTE2IDgxIGwyMDI5IDIwMjggcTU5IDYwIDgwIDE0MSBxMjEgODAgMSAxNTkgcS0yMSA4MiAtODEgMTQyIGwtMjAyOSAyMDI4IHEtNDQgNDUgLTEwMiA3MCBxLTU4IDI1IC0xMjIgMjUgWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0ibWVudSIgdW5pY29kZT0iJiN4ZWEwODsiIGQ9Ik02MjUgNDM3NSBsMCAtNjI1IGwzNzUwIDAgbDAgNjI1IGwtMzc1MCAwIFpNNjI1IDI4MTMgbDAgLTYyNSBsMzc1MCAwIGwwIDYyNSBsLTM3NTAgMCBaTTYyNSAxMjUwIGwwIC02MjUgbDM3NTAgMCBsMCA2MjUgbC0zNzUwIDAgWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0ibW9yZSIgdW5pY29kZT0iJiN4ZWEwOTsiIGQ9Ik05MzggMzEyNSBxLTEyOCAwIC0yNDQgLTQ5IHEtMTEyIC00OCAtMTk4LjUgLTEzNC41IHEtODYuNSAtODYuNSAtMTMzLjUgLTE5OC41IHEtNTAgLTExNiAtNDkuNSAtMjQzIHEwLjUgLTEyNyA0OS41IC0yNDMgcTQ3IC0xMTIgMTMzLjUgLTE5OC41IHE4Ni41IC04Ni41IDE5OC41IC0xMzQuNSBxMTE2IC00OSAyNDMuNSAtNDkgcTEyNy41IDAgMjQzLjUgNDkgcTExMiA0OCAxOTguNSAxMzQuNSBxODYuNSA4Ni41IDEzMy41IDE5OC41IHE1MCAxMTYgNTAgMjQzIHEwIDEyNyAtNTAgMjQzIHEtNDcgMTEyIC0xMzMuNSAxOTguNSBxLTg2LjUgODYuNSAtMTk4LjUgMTM0LjUgcS0xMTYgNDkgLTI0MyA0OSBaTTI1MDAgMzEyNSBxLTEyNyAwIC0yNDMgLTQ5IHEtMTEyIC00OCAtMTk4LjUgLTEzNC41IHEtODYuNSAtODYuNSAtMTM0LjUgLTE5OC41IHEtNDkgLTExNiAtNDkgLTI0MyBxMCAtMTI3IDQ5IC0yNDMgcTQ4IC0xMTIgMTM0LjUgLTE5OC41IHE4Ni41IC04Ni41IDE5OC41IC0xMzQuNSBxMTE2IC00OSAyNDMgLTQ5IHExMjcgMCAyNDMgNDkgcTExMiA0OCAxOTguNSAxMzQuNSBxODYuNSA4Ni41IDEzNC41IDE5OC41IHE0OSAxMTYgNDkgMjQzIHEwIDEyNyAtNDkgMjQzIHEtNDggMTEyIC0xMzQuNSAxOTguNSBxLTg2LjUgODYuNSAtMTk4LjUgMTM0LjUgcS0xMTYgNDkgLTI0MyA0OSBaTTQwNjMgMzEyNSBxLTEyOCAwIC0yNDQgLTQ5IHEtMTEyIC00OCAtMTk4LjUgLTEzNC41IHEtODYuNSAtODYuNSAtMTMzLjUgLTE5OC41IHEtNDkgLTExNiAtNDkgLTI0MyBxMCAtMTI3IDQ5IC0yNDMgcTQ3IC0xMTIgMTMzLjUgLTE5OC41IHE4Ni41IC04Ni41IDE5OC41IC0xMzQuNSBxMTE2IC00OSAyNDMuNSAtNDkgcTEyNy41IDAgMjQzLjUgNDkgcTExMiA0OCAxOTguNSAxMzQuNSBxODYuNSA4Ni41IDEzMy41IDE5OC41IHE1MCAxMTYgNTAgMjQzIHEwIDEyNyAtNTAgMjQzIHEtNDcgMTEyIC0xMzMuNSAxOTguNSBxLTg2LjUgODYuNSAtMTk4LjUgMTM0LjUgcS0xMTYgNDkgLTI0MyA0OSBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJwYXVzZSIgdW5pY29kZT0iJiN4ZWEwYTsiIGQ9Ik05MzggNDA2MyBsMCAtMzEyNSBsMTI1MCAwIGwwIDMxMjUgbC0xMjUwIDAgWk0yODEzIDQwNjMgbDAgLTMxMjUgbDEyNTAgMCBsMCAzMTI1IGwtMTI1MCAwIFoiIC8+PGdseXBoIGdseXBoLW5hbWU9InBsYXkiIHVuaWNvZGU9IiYjeGVhMGI7IiBkPSJNNjI1IDQzNzUgbDM3NTAgLTE4NzUgbC0zNzUwIC0xODc1IGwwIDM3NTAgWiIgLz48L2ZvbnQ+PC9kZWZzPjwvc3ZnPg=="},function(t,e,n){t.exports=function(){var t="undefined"!=typeof window,e="undefined"!=typeof navigator,n=t&&("ontouchstart"in window||e&&navigator.msMaxTouchPoints>0)?["touchstart"]:["click"],o=function(t){return t},r={instances:[]};function i(t){var e="function"==typeof t;if(!e&&"object"!=typeof t)throw new Error("v-click-outside: Binding value must be a function or an object");return{handler:e?t:t.handler,middleware:t.middleware||o,events:t.events||n,isActive:!(!1===t.isActive)}}function A(t){var e=t.el,n=t.event,o=t.handler,r=t.middleware;n.target!==e&&!e.contains(n.target)&&r(n,e)&&o(n,e)}function a(t){var e=t.el,n=t.handler,o=t.middleware;return{el:e,eventHandlers:t.events.map(function(t){return{event:t,handler:function(t){return A({event:t,el:e,handler:n,middleware:o})}}})}}function s(t){var e=r.instances.findIndex(function(e){return e.el===t});-1!==e&&(r.instances[e].eventHandlers.forEach(function(t){return document.removeEventListener(t.event,t.handler)}),r.instances.splice(e,1))}return r.bind=function(t,e){var n=i(e.value);if(n.isActive){var o=a({el:t,events:n.events,handler:n.handler,middleware:n.middleware});o.eventHandlers.forEach(function(t){var e=t.event,n=t.handler;return setTimeout(function(){return document.addEventListener(e,n)},0)}),r.instances.push(o)}},r.update=function(t,e){var n=e.value,o=e.oldValue;if(JSON.stringify(n)!==JSON.stringify(o)){var c=i(n),u=c.events,l=c.handler,d=c.middleware;if(c.isActive){var f=r.instances.find(function(e){return e.el===t});f?(f.eventHandlers.forEach(function(t){return document.removeEventListener(t.event,t.handler)}),f.eventHandlers=u.map(function(e){return{event:e,handler:function(e){return A({event:e,el:t,handler:l,middleware:d})}}})):(f=a({el:t,events:u,handler:l,middleware:d}),r.instances.push(f)),f.eventHandlers.forEach(function(t){var e=t.event,n=t.handler;return setTimeout(function(){return document.addEventListener(e,n)},0)})}else s(t)}},r.unbind=s,{install:function(t){t.directive("click-outside",r)},directive:r}}()},,function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";(function(t){for(
/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.15.0
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var n="undefined"!=typeof window&&"undefined"!=typeof document,o=["Edge","Trident","Firefox"],r=0,i=0;i<o.length;i+=1)if(n&&navigator.userAgent.indexOf(o[i])>=0){r=1;break}var A=n&&window.Promise?function(t){var e=!1;return function(){e||(e=!0,window.Promise.resolve().then(function(){e=!1,t()}))}}:function(t){var e=!1;return function(){e||(e=!0,setTimeout(function(){e=!1,t()},r))}};function a(t){return t&&"[object Function]"==={}.toString.call(t)}function s(t,e){if(1!==t.nodeType)return[];var n=t.ownerDocument.defaultView.getComputedStyle(t,null);return e?n[e]:n}function c(t){return"HTML"===t.nodeName?t:t.parentNode||t.host}function u(t){if(!t)return document.body;switch(t.nodeName){case"HTML":case"BODY":return t.ownerDocument.body;case"#document":return t.body}var e=s(t),n=e.overflow,o=e.overflowX,r=e.overflowY;return/(auto|scroll|overlay)/.test(n+r+o)?t:u(c(t))}var l=n&&!(!window.MSInputMethodContext||!document.documentMode),d=n&&/MSIE 10/.test(navigator.userAgent);function f(t){return 11===t?l:10===t?d:l||d}function p(t){if(!t)return document.documentElement;for(var e=f(10)?document.body:null,n=t.offsetParent||null;n===e&&t.nextElementSibling;)n=(t=t.nextElementSibling).offsetParent;var o=n&&n.nodeName;return o&&"BODY"!==o&&"HTML"!==o?-1!==["TH","TD","TABLE"].indexOf(n.nodeName)&&"static"===s(n,"position")?p(n):n:t?t.ownerDocument.documentElement:document.documentElement}function h(t){return null!==t.parentNode?h(t.parentNode):t}function v(t,e){if(!(t&&t.nodeType&&e&&e.nodeType))return document.documentElement;var n=t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING,o=n?t:e,r=n?e:t,i=document.createRange();i.setStart(o,0),i.setEnd(r,0);var A,a,s=i.commonAncestorContainer;if(t!==s&&e!==s||o.contains(r))return"BODY"===(a=(A=s).nodeName)||"HTML"!==a&&p(A.firstElementChild)!==A?p(s):s;var c=h(t);return c.host?v(c.host,e):v(t,h(e).host)}function m(t){var e="top"===(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top")?"scrollTop":"scrollLeft",n=t.nodeName;if("BODY"===n||"HTML"===n){var o=t.ownerDocument.documentElement;return(t.ownerDocument.scrollingElement||o)[e]}return t[e]}function g(t,e){var n="x"===e?"Left":"Top",o="Left"===n?"Right":"Bottom";return parseFloat(t["border"+n+"Width"],10)+parseFloat(t["border"+o+"Width"],10)}function b(t,e,n,o){return Math.max(e["offset"+t],e["scroll"+t],n["client"+t],n["offset"+t],n["scroll"+t],f(10)?parseInt(n["offset"+t])+parseInt(o["margin"+("Height"===t?"Top":"Left")])+parseInt(o["margin"+("Height"===t?"Bottom":"Right")]):0)}function y(t){var e=t.body,n=t.documentElement,o=f(10)&&getComputedStyle(n);return{height:b("Height",e,n,o),width:b("Width",e,n,o)}}var w=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},E=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),x=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},B=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t};function T(t){return B({},t,{right:t.left+t.width,bottom:t.top+t.height})}function C(t){var e={};try{if(f(10)){e=t.getBoundingClientRect();var n=m(t,"top"),o=m(t,"left");e.top+=n,e.left+=o,e.bottom+=n,e.right+=o}else e=t.getBoundingClientRect()}catch(t){}var r={left:e.left,top:e.top,width:e.right-e.left,height:e.bottom-e.top},i="HTML"===t.nodeName?y(t.ownerDocument):{},A=i.width||t.clientWidth||r.right-r.left,a=i.height||t.clientHeight||r.bottom-r.top,c=t.offsetWidth-A,u=t.offsetHeight-a;if(c||u){var l=s(t);c-=g(l,"x"),u-=g(l,"y"),r.width-=c,r.height-=u}return T(r)}function M(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=f(10),r="HTML"===e.nodeName,i=C(t),A=C(e),a=u(t),c=s(e),l=parseFloat(c.borderTopWidth,10),d=parseFloat(c.borderLeftWidth,10);n&&r&&(A.top=Math.max(A.top,0),A.left=Math.max(A.left,0));var p=T({top:i.top-A.top-l,left:i.left-A.left-d,width:i.width,height:i.height});if(p.marginTop=0,p.marginLeft=0,!o&&r){var h=parseFloat(c.marginTop,10),v=parseFloat(c.marginLeft,10);p.top-=l-h,p.bottom-=l-h,p.left-=d-v,p.right-=d-v,p.marginTop=h,p.marginLeft=v}return(o&&!n?e.contains(a):e===a&&"BODY"!==a.nodeName)&&(p=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=m(e,"top"),r=m(e,"left"),i=n?-1:1;return t.top+=o*i,t.bottom+=o*i,t.left+=r*i,t.right+=r*i,t}(p,e)),p}function I(t){if(!t||!t.parentElement||f())return document.documentElement;for(var e=t.parentElement;e&&"none"===s(e,"transform");)e=e.parentElement;return e||document.documentElement}function _(t,e,n,o){var r=arguments.length>4&&void 0!==arguments[4]&&arguments[4],i={top:0,left:0},A=r?I(t):v(t,e);if("viewport"===o)i=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=t.ownerDocument.documentElement,o=M(t,n),r=Math.max(n.clientWidth,window.innerWidth||0),i=Math.max(n.clientHeight,window.innerHeight||0),A=e?0:m(n),a=e?0:m(n,"left");return T({top:A-o.top+o.marginTop,left:a-o.left+o.marginLeft,width:r,height:i})}(A,r);else{var a=void 0;"scrollParent"===o?"BODY"===(a=u(c(e))).nodeName&&(a=t.ownerDocument.documentElement):a="window"===o?t.ownerDocument.documentElement:o;var l=M(a,A,r);if("HTML"!==a.nodeName||function t(e){var n=e.nodeName;if("BODY"===n||"HTML"===n)return!1;if("fixed"===s(e,"position"))return!0;var o=c(e);return!!o&&t(o)}(A))i=l;else{var d=y(t.ownerDocument),f=d.height,p=d.width;i.top+=l.top-l.marginTop,i.bottom=f+l.top,i.left+=l.left-l.marginLeft,i.right=p+l.left}}var h="number"==typeof(n=n||0);return i.left+=h?n:n.left||0,i.top+=h?n:n.top||0,i.right-=h?n:n.right||0,i.bottom-=h?n:n.bottom||0,i}function N(t,e,n,o,r){var i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0;if(-1===t.indexOf("auto"))return t;var A=_(n,o,i,r),a={top:{width:A.width,height:e.top-A.top},right:{width:A.right-e.right,height:A.height},bottom:{width:A.width,height:A.bottom-e.bottom},left:{width:e.left-A.left,height:A.height}},s=Object.keys(a).map(function(t){return B({key:t},a[t],{area:(e=a[t],e.width*e.height)});var e}).sort(function(t,e){return e.area-t.area}),c=s.filter(function(t){var e=t.width,o=t.height;return e>=n.clientWidth&&o>=n.clientHeight}),u=c.length>0?c[0].key:s[0].key,l=t.split("-")[1];return u+(l?"-"+l:"")}function O(t,e,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return M(n,o?I(e):v(e,n),o)}function D(t){var e=t.ownerDocument.defaultView.getComputedStyle(t),n=parseFloat(e.marginTop||0)+parseFloat(e.marginBottom||0),o=parseFloat(e.marginLeft||0)+parseFloat(e.marginRight||0);return{width:t.offsetWidth+o,height:t.offsetHeight+n}}function Q(t){var e={left:"right",right:"left",bottom:"top",top:"bottom"};return t.replace(/left|right|bottom|top/g,function(t){return e[t]})}function L(t,e,n){n=n.split("-")[0];var o=D(t),r={width:o.width,height:o.height},i=-1!==["right","left"].indexOf(n),A=i?"top":"left",a=i?"left":"top",s=i?"height":"width",c=i?"width":"height";return r[A]=e[A]+e[s]/2-o[s]/2,r[a]=n===a?e[a]-o[c]:e[Q(a)],r}function S(t,e){return Array.prototype.find?t.find(e):t.filter(e)[0]}function k(t,e,n){return(void 0===n?t:t.slice(0,function(t,e,n){if(Array.prototype.findIndex)return t.findIndex(function(t){return t[e]===n});var o=S(t,function(t){return t[e]===n});return t.indexOf(o)}(t,"name",n))).forEach(function(t){t.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var n=t.function||t.fn;t.enabled&&a(n)&&(e.offsets.popper=T(e.offsets.popper),e.offsets.reference=T(e.offsets.reference),e=n(e,t))}),e}function j(t,e){return t.some(function(t){var n=t.name;return t.enabled&&n===e})}function G(t){for(var e=[!1,"ms","Webkit","Moz","O"],n=t.charAt(0).toUpperCase()+t.slice(1),o=0;o<e.length;o++){var r=e[o],i=r?""+r+n:t;if(void 0!==document.body.style[i])return i}return null}function U(t){var e=t.ownerDocument;return e?e.defaultView:window}function Y(t,e,n,o){n.updateBound=o,U(t).addEventListener("resize",n.updateBound,{passive:!0});var r=u(t);return function t(e,n,o,r){var i="BODY"===e.nodeName,A=i?e.ownerDocument.defaultView:e;A.addEventListener(n,o,{passive:!0}),i||t(u(A.parentNode),n,o,r),r.push(A)}(r,"scroll",n.updateBound,n.scrollParents),n.scrollElement=r,n.eventsEnabled=!0,n}function H(){var t,e;this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=(t=this.reference,e=this.state,U(t).removeEventListener("resize",e.updateBound),e.scrollParents.forEach(function(t){t.removeEventListener("scroll",e.updateBound)}),e.updateBound=null,e.scrollParents=[],e.scrollElement=null,e.eventsEnabled=!1,e))}function P(t){return""!==t&&!isNaN(parseFloat(t))&&isFinite(t)}function z(t,e){Object.keys(e).forEach(function(n){var o="";-1!==["width","height","top","right","bottom","left"].indexOf(n)&&P(e[n])&&(o="px"),t.style[n]=e[n]+o})}var F=n&&/Firefox/i.test(navigator.userAgent);function R(t,e,n){var o=S(t,function(t){return t.name===e}),r=!!o&&t.some(function(t){return t.name===n&&t.enabled&&t.order<o.order});if(!r){var i="`"+e+"`",A="`"+n+"`";console.warn(A+" modifier is required by "+i+" modifier in order to work, be sure to include it before "+i+"!")}return r}var Z=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],W=Z.slice(3);function $(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=W.indexOf(t),o=W.slice(n+1).concat(W.slice(0,n));return e?o.reverse():o}var J={FLIP:"flip",CLOCKWISE:"clockwise",COUNTERCLOCKWISE:"counterclockwise"};function V(t,e,n,o){var r=[0,0],i=-1!==["right","left"].indexOf(o),A=t.split(/(\+|\-)/).map(function(t){return t.trim()}),a=A.indexOf(S(A,function(t){return-1!==t.search(/,|\s/)}));A[a]&&-1===A[a].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");var s=/\s*,\s*|\s+/,c=-1!==a?[A.slice(0,a).concat([A[a].split(s)[0]]),[A[a].split(s)[1]].concat(A.slice(a+1))]:[A];return(c=c.map(function(t,o){var r=(1===o?!i:i)?"height":"width",A=!1;return t.reduce(function(t,e){return""===t[t.length-1]&&-1!==["+","-"].indexOf(e)?(t[t.length-1]=e,A=!0,t):A?(t[t.length-1]+=e,A=!1,t):t.concat(e)},[]).map(function(t){return function(t,e,n,o){var r=t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),i=+r[1],A=r[2];if(!i)return t;if(0===A.indexOf("%")){var a=void 0;switch(A){case"%p":a=n;break;case"%":case"%r":default:a=o}return T(a)[e]/100*i}if("vh"===A||"vw"===A)return("vh"===A?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0))/100*i;return i}(t,r,e,n)})})).forEach(function(t,e){t.forEach(function(n,o){P(n)&&(r[e]+=n*("-"===t[o-1]?-1:1))})}),r}var X={placement:"bottom",positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(t){var e=t.placement,n=e.split("-")[0],o=e.split("-")[1];if(o){var r=t.offsets,i=r.reference,A=r.popper,a=-1!==["bottom","top"].indexOf(n),s=a?"left":"top",c=a?"width":"height",u={start:x({},s,i[s]),end:x({},s,i[s]+i[c]-A[c])};t.offsets.popper=B({},A,u[o])}return t}},offset:{order:200,enabled:!0,fn:function(t,e){var n=e.offset,o=t.placement,r=t.offsets,i=r.popper,A=r.reference,a=o.split("-")[0],s=void 0;return s=P(+n)?[+n,0]:V(n,i,A,a),"left"===a?(i.top+=s[0],i.left-=s[1]):"right"===a?(i.top+=s[0],i.left+=s[1]):"top"===a?(i.left+=s[0],i.top-=s[1]):"bottom"===a&&(i.left+=s[0],i.top+=s[1]),t.popper=i,t},offset:0},preventOverflow:{order:300,enabled:!0,fn:function(t,e){var n=e.boundariesElement||p(t.instance.popper);t.instance.reference===n&&(n=p(n));var o=G("transform"),r=t.instance.popper.style,i=r.top,A=r.left,a=r[o];r.top="",r.left="",r[o]="";var s=_(t.instance.popper,t.instance.reference,e.padding,n,t.positionFixed);r.top=i,r.left=A,r[o]=a,e.boundaries=s;var c=e.priority,u=t.offsets.popper,l={primary:function(t){var n=u[t];return u[t]<s[t]&&!e.escapeWithReference&&(n=Math.max(u[t],s[t])),x({},t,n)},secondary:function(t){var n="right"===t?"left":"top",o=u[n];return u[t]>s[t]&&!e.escapeWithReference&&(o=Math.min(u[n],s[t]-("right"===t?u.width:u.height))),x({},n,o)}};return c.forEach(function(t){var e=-1!==["left","top"].indexOf(t)?"primary":"secondary";u=B({},u,l[e](t))}),t.offsets.popper=u,t},priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:function(t){var e=t.offsets,n=e.popper,o=e.reference,r=t.placement.split("-")[0],i=Math.floor,A=-1!==["top","bottom"].indexOf(r),a=A?"right":"bottom",s=A?"left":"top",c=A?"width":"height";return n[a]<i(o[s])&&(t.offsets.popper[s]=i(o[s])-n[c]),n[s]>i(o[a])&&(t.offsets.popper[s]=i(o[a])),t}},arrow:{order:500,enabled:!0,fn:function(t,e){var n;if(!R(t.instance.modifiers,"arrow","keepTogether"))return t;var o=e.element;if("string"==typeof o){if(!(o=t.instance.popper.querySelector(o)))return t}else if(!t.instance.popper.contains(o))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),t;var r=t.placement.split("-")[0],i=t.offsets,A=i.popper,a=i.reference,c=-1!==["left","right"].indexOf(r),u=c?"height":"width",l=c?"Top":"Left",d=l.toLowerCase(),f=c?"left":"top",p=c?"bottom":"right",h=D(o)[u];a[p]-h<A[d]&&(t.offsets.popper[d]-=A[d]-(a[p]-h)),a[d]+h>A[p]&&(t.offsets.popper[d]+=a[d]+h-A[p]),t.offsets.popper=T(t.offsets.popper);var v=a[d]+a[u]/2-h/2,m=s(t.instance.popper),g=parseFloat(m["margin"+l],10),b=parseFloat(m["border"+l+"Width"],10),y=v-t.offsets.popper[d]-g-b;return y=Math.max(Math.min(A[u]-h,y),0),t.arrowElement=o,t.offsets.arrow=(x(n={},d,Math.round(y)),x(n,f,""),n),t},element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:function(t,e){if(j(t.instance.modifiers,"inner"))return t;if(t.flipped&&t.placement===t.originalPlacement)return t;var n=_(t.instance.popper,t.instance.reference,e.padding,e.boundariesElement,t.positionFixed),o=t.placement.split("-")[0],r=Q(o),i=t.placement.split("-")[1]||"",A=[];switch(e.behavior){case J.FLIP:A=[o,r];break;case J.CLOCKWISE:A=$(o);break;case J.COUNTERCLOCKWISE:A=$(o,!0);break;default:A=e.behavior}return A.forEach(function(a,s){if(o!==a||A.length===s+1)return t;o=t.placement.split("-")[0],r=Q(o);var c=t.offsets.popper,u=t.offsets.reference,l=Math.floor,d="left"===o&&l(c.right)>l(u.left)||"right"===o&&l(c.left)<l(u.right)||"top"===o&&l(c.bottom)>l(u.top)||"bottom"===o&&l(c.top)<l(u.bottom),f=l(c.left)<l(n.left),p=l(c.right)>l(n.right),h=l(c.top)<l(n.top),v=l(c.bottom)>l(n.bottom),m="left"===o&&f||"right"===o&&p||"top"===o&&h||"bottom"===o&&v,g=-1!==["top","bottom"].indexOf(o),b=!!e.flipVariations&&(g&&"start"===i&&f||g&&"end"===i&&p||!g&&"start"===i&&h||!g&&"end"===i&&v),y=!!e.flipVariationsByContent&&(g&&"start"===i&&p||g&&"end"===i&&f||!g&&"start"===i&&v||!g&&"end"===i&&h),w=b||y;(d||m||w)&&(t.flipped=!0,(d||m)&&(o=A[s+1]),w&&(i=function(t){return"end"===t?"start":"start"===t?"end":t}(i)),t.placement=o+(i?"-"+i:""),t.offsets.popper=B({},t.offsets.popper,L(t.instance.popper,t.offsets.reference,t.placement)),t=k(t.instance.modifiers,t,"flip"))}),t},behavior:"flip",padding:5,boundariesElement:"viewport",flipVariations:!1,flipVariationsByContent:!1},inner:{order:700,enabled:!1,fn:function(t){var e=t.placement,n=e.split("-")[0],o=t.offsets,r=o.popper,i=o.reference,A=-1!==["left","right"].indexOf(n),a=-1===["top","left"].indexOf(n);return r[A?"left":"top"]=i[n]-(a?r[A?"width":"height"]:0),t.placement=Q(e),t.offsets.popper=T(r),t}},hide:{order:800,enabled:!0,fn:function(t){if(!R(t.instance.modifiers,"hide","preventOverflow"))return t;var e=t.offsets.reference,n=S(t.instance.modifiers,function(t){return"preventOverflow"===t.name}).boundaries;if(e.bottom<n.top||e.left>n.right||e.top>n.bottom||e.right<n.left){if(!0===t.hide)return t;t.hide=!0,t.attributes["x-out-of-boundaries"]=""}else{if(!1===t.hide)return t;t.hide=!1,t.attributes["x-out-of-boundaries"]=!1}return t}},computeStyle:{order:850,enabled:!0,fn:function(t,e){var n=e.x,o=e.y,r=t.offsets.popper,i=S(t.instance.modifiers,function(t){return"applyStyle"===t.name}).gpuAcceleration;void 0!==i&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var A=void 0!==i?i:e.gpuAcceleration,a=p(t.instance.popper),s=C(a),c={position:r.position},u=function(t,e){var n=t.offsets,o=n.popper,r=n.reference,i=Math.round,A=Math.floor,a=function(t){return t},s=i(r.width),c=i(o.width),u=-1!==["left","right"].indexOf(t.placement),l=-1!==t.placement.indexOf("-"),d=e?u||l||s%2==c%2?i:A:a,f=e?i:a;return{left:d(s%2==1&&c%2==1&&!l&&e?o.left-1:o.left),top:f(o.top),bottom:f(o.bottom),right:d(o.right)}}(t,window.devicePixelRatio<2||!F),l="bottom"===n?"top":"bottom",d="right"===o?"left":"right",f=G("transform"),h=void 0,v=void 0;if(v="bottom"===l?"HTML"===a.nodeName?-a.clientHeight+u.bottom:-s.height+u.bottom:u.top,h="right"===d?"HTML"===a.nodeName?-a.clientWidth+u.right:-s.width+u.right:u.left,A&&f)c[f]="translate3d("+h+"px, "+v+"px, 0)",c[l]=0,c[d]=0,c.willChange="transform";else{var m="bottom"===l?-1:1,g="right"===d?-1:1;c[l]=v*m,c[d]=h*g,c.willChange=l+", "+d}var b={"x-placement":t.placement};return t.attributes=B({},b,t.attributes),t.styles=B({},c,t.styles),t.arrowStyles=B({},t.offsets.arrow,t.arrowStyles),t},gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:function(t){var e,n;return z(t.instance.popper,t.styles),e=t.instance.popper,n=t.attributes,Object.keys(n).forEach(function(t){!1!==n[t]?e.setAttribute(t,n[t]):e.removeAttribute(t)}),t.arrowElement&&Object.keys(t.arrowStyles).length&&z(t.arrowElement,t.arrowStyles),t},onLoad:function(t,e,n,o,r){var i=O(r,e,t,n.positionFixed),A=N(n.placement,i,e,t,n.modifiers.flip.boundariesElement,n.modifiers.flip.padding);return e.setAttribute("x-placement",A),z(e,{position:n.positionFixed?"fixed":"absolute"}),n},gpuAcceleration:void 0}}},q=function(){function t(e,n){var o=this,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};w(this,t),this.scheduleUpdate=function(){return requestAnimationFrame(o.update)},this.update=A(this.update.bind(this)),this.options=B({},t.Defaults,r),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=e&&e.jquery?e[0]:e,this.popper=n&&n.jquery?n[0]:n,this.options.modifiers={},Object.keys(B({},t.Defaults.modifiers,r.modifiers)).forEach(function(e){o.options.modifiers[e]=B({},t.Defaults.modifiers[e]||{},r.modifiers?r.modifiers[e]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(function(t){return B({name:t},o.options.modifiers[t])}).sort(function(t,e){return t.order-e.order}),this.modifiers.forEach(function(t){t.enabled&&a(t.onLoad)&&t.onLoad(o.reference,o.popper,o.options,t,o.state)}),this.update();var i=this.options.eventsEnabled;i&&this.enableEventListeners(),this.state.eventsEnabled=i}return E(t,[{key:"update",value:function(){return function(){if(!this.state.isDestroyed){var t={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};t.offsets.reference=O(this.state,this.popper,this.reference,this.options.positionFixed),t.placement=N(this.options.placement,t.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),t.originalPlacement=t.placement,t.positionFixed=this.options.positionFixed,t.offsets.popper=L(this.popper,t.offsets.reference,t.placement),t.offsets.popper.position=this.options.positionFixed?"fixed":"absolute",t=k(this.modifiers,t),this.state.isCreated?this.options.onUpdate(t):(this.state.isCreated=!0,this.options.onCreate(t))}}.call(this)}},{key:"destroy",value:function(){return function(){return this.state.isDestroyed=!0,j(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.position="",this.popper.style.top="",this.popper.style.left="",this.popper.style.right="",this.popper.style.bottom="",this.popper.style.willChange="",this.popper.style[G("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}.call(this)}},{key:"enableEventListeners",value:function(){return function(){this.state.eventsEnabled||(this.state=Y(this.reference,this.options,this.state,this.scheduleUpdate))}.call(this)}},{key:"disableEventListeners",value:function(){return H.call(this)}}]),t}();q.Utils=("undefined"!=typeof window?window:t).PopperUtils,q.placements=Z,q.Defaults=X,e.a=q}).call(this,n(16))},function(t,e,n){var o=n(42);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,n(2).default)("6d914181",o,!0,{})},function(t,e,n){var o=n(44);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,n(2).default)("2fc216d3",o,!0,{})},function(t,e,n){var o=n(46);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,n(2).default)("95523852",o,!0,{})},function(t,e,n){"use strict";(function(t){n.d(e,"a",function(){return i});var o=void 0;function r(){r.init||(r.init=!0,o=-1!==function(){var t=window.navigator.userAgent,e=t.indexOf("MSIE ");if(e>0)return parseInt(t.substring(e+5,t.indexOf(".",e)),10);if(t.indexOf("Trident/")>0){var n=t.indexOf("rv:");return parseInt(t.substring(n+3,t.indexOf(".",n)),10)}var o=t.indexOf("Edge/");return o>0?parseInt(t.substring(o+5,t.indexOf(".",o)),10):-1}())}var i={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"resize-observer",attrs:{tabindex:"-1"}})},staticRenderFns:[],_scopeId:"data-v-b329ee4c",name:"resize-observer",methods:{compareAndNotify:function(){this._w===this.$el.offsetWidth&&this._h===this.$el.offsetHeight||(this._w=this.$el.offsetWidth,this._h=this.$el.offsetHeight,this.$emit("notify"))},addResizeHandlers:function(){this._resizeObject.contentDocument.defaultView.addEventListener("resize",this.compareAndNotify),this.compareAndNotify()},removeResizeHandlers:function(){this._resizeObject&&this._resizeObject.onload&&(!o&&this._resizeObject.contentDocument&&this._resizeObject.contentDocument.defaultView.removeEventListener("resize",this.compareAndNotify),delete this._resizeObject.onload)}},mounted:function(){var t=this;r(),this.$nextTick(function(){t._w=t.$el.offsetWidth,t._h=t.$el.offsetHeight});var e=document.createElement("object");this._resizeObject=e,e.setAttribute("aria-hidden","true"),e.setAttribute("tabindex",-1),e.onload=this.addResizeHandlers,e.type="text/html",o&&this.$el.appendChild(e),e.data="about:blank",o||this.$el.appendChild(e)},beforeDestroy:function(){this.removeResizeHandlers()}};var A={version:"0.4.5",install:function(t){t.component("resize-observer",i),t.component("ResizeObserver",i)}},a=null;"undefined"!=typeof window?a=window.Vue:void 0!==t&&(a=t.Vue),a&&a.use(A)}).call(this,n(16))},,,function(t,e,n){"use strict";n.r(e);var o={name:"PopoverMenuItem",props:{item:{type:Object,required:!0,default:function(){return{key:"nextcloud-link",href:"https://nextcloud.com",icon:"icon-links",text:"Nextcloud"}},validator:function(t){return!t.input||-1!==["text","checkbox"].indexOf(t.input)}}},computed:{key:function(){return this.item.key?this.item.key:Math.round(16*Math.random()*1e6).toString(16)},iconIsUrl:function(){try{return new URL(this.item.icon),!0}catch(t){return!1}}},methods:{action:function(t){this.item.action&&this.item.action(t)}}},r=(n(41),n(43),n(0)),i={name:"PopoverMenu",components:{PopoverMenuItem:Object(r.a)(o,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",[t.item.href?n("a",{staticClass:"focusable",attrs:{href:t.item.href?t.item.href:"#",target:t.item.target?t.item.target:"",download:t.item.download,rel:"noreferrer noopener"},on:{click:t.action}},[t.iconIsUrl?n("img",{attrs:{src:t.item.icon}}):n("span",{class:t.item.icon}),t._v(" "),t.item.text&&t.item.longtext?n("p",[n("strong",{staticClass:"menuitem-text"},[t._v("\n\t\t\t\t"+t._s(t.item.text)+"\n\t\t\t")]),n("br"),t._v(" "),n("span",{staticClass:"menuitem-text-detail"},[t._v("\n\t\t\t\t"+t._s(t.item.longtext)+"\n\t\t\t")])]):t.item.text?n("span",[t._v("\n\t\t\t"+t._s(t.item.text)+"\n\t\t")]):t.item.longtext?n("p",[t._v("\n\t\t\t"+t._s(t.item.longtext)+"\n\t\t")]):t._e()]):t.item.input?n("span",{staticClass:"menuitem",class:{active:t.item.active}},["checkbox"!==t.item.input?n("span",{class:t.item.icon}):t._e(),t._v(" "),"text"===t.item.input?n("form",{class:t.item.input,on:{submit:function(e){return e.preventDefault(),t.item.action(e)}}},[n("input",{attrs:{type:t.item.input,placeholder:t.item.text,required:""},domProps:{value:t.item.value}}),t._v(" "),n("input",{staticClass:"icon-confirm",attrs:{type:"submit",value:""}})]):["checkbox"===t.item.input?n("input",{directives:[{name:"model",rawName:"v-model",value:t.item.model,expression:"item.model"}],class:t.item.input,attrs:{id:t.key,type:"checkbox"},domProps:{checked:Array.isArray(t.item.model)?t._i(t.item.model,null)>-1:t.item.model},on:{change:[function(e){var n=t.item.model,o=e.target,r=!!o.checked;if(Array.isArray(n)){var i=t._i(n,null);o.checked?i<0&&t.$set(t.item,"model",n.concat([null])):i>-1&&t.$set(t.item,"model",n.slice(0,i).concat(n.slice(i+1)))}else t.$set(t.item,"model",r)},t.item.action]}}):"radio"===t.item.input?n("input",{directives:[{name:"model",rawName:"v-model",value:t.item.model,expression:"item.model"}],class:t.item.input,attrs:{id:t.key,type:"radio"},domProps:{checked:t._q(t.item.model,null)},on:{change:[function(e){return t.$set(t.item,"model",null)},t.item.action]}}):n("input",{directives:[{name:"model",rawName:"v-model",value:t.item.model,expression:"item.model"}],class:t.item.input,attrs:{id:t.key,type:t.item.input},domProps:{value:t.item.model},on:{change:t.item.action,input:function(e){e.target.composing||t.$set(t.item,"model",e.target.value)}}}),t._v(" "),n("label",{attrs:{for:t.key},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.item.action(e)}}},[t._v("\n\t\t\t\t"+t._s(t.item.text)+"\n\t\t\t")])]],2):t.item.action?n("button",{staticClass:"menuitem focusable",class:{active:t.item.active},attrs:{disabled:t.item.disabled},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.item.action(e)}}},[n("span",{class:t.item.icon}),t._v(" "),t.item.text&&t.item.longtext?n("p",[n("strong",{staticClass:"menuitem-text"},[t._v("\n\t\t\t\t"+t._s(t.item.text)+"\n\t\t\t")]),n("br"),t._v(" "),n("span",{staticClass:"menuitem-text-detail"},[t._v("\n\t\t\t\t"+t._s(t.item.longtext)+"\n\t\t\t")])]):t.item.text?n("span",[t._v("\n\t\t\t"+t._s(t.item.text)+"\n\t\t")]):t.item.longtext?n("p",[t._v("\n\t\t\t"+t._s(t.item.longtext)+"\n\t\t")]):t._e()]):n("span",{staticClass:"menuitem",class:{active:t.item.active}},[n("span",{class:t.item.icon}),t._v(" "),t.item.text&&t.item.longtext?n("p",[n("strong",{staticClass:"menuitem-text"},[t._v("\n\t\t\t\t"+t._s(t.item.text)+"\n\t\t\t")]),n("br"),t._v(" "),n("span",{staticClass:"menuitem-text-detail"},[t._v("\n\t\t\t\t"+t._s(t.item.longtext)+"\n\t\t\t")])]):t.item.text?n("span",[t._v("\n\t\t\t"+t._s(t.item.text)+"\n\t\t")]):t.item.longtext?n("p",[t._v("\n\t\t\t"+t._s(t.item.longtext)+"\n\t\t")]):t._e()])])},[],!1,null,"8dc4efb0",null).exports},props:{menu:{type:Array,default:function(){return[{href:"https://nextcloud.com",icon:"icon-links",text:"Nextcloud"}]},required:!0}}},A=(n(45),Object(r.a)(i,function(){var t=this.$createElement,e=this._self._c||t;return e("ul",this._l(this.menu,function(t,n){return e("PopoverMenuItem",{key:n,attrs:{item:t}})}),1)},[],!1,null,"2f982451",null).exports);n.d(e,"PopoverMenu",function(){return A});
/**
 * @copyright Copyright (c) 2018 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */e.default=A},,,,,function(t,e,n){var o=n(124);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,n(2).default)("65c1e942",o,!0,{})},,,function(t,e,n){var o=n(33);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,n(2).default)("941c791e",o,!0,{})},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,".vue-tooltip[data-v-e56a121]{position:absolute;z-index:100000;right:auto;left:auto;display:block;margin:0;margin-top:-3px;padding:10px 0;text-align:left;text-align:start;white-space:normal;text-decoration:none;letter-spacing:normal;word-spacing:normal;text-transform:none;word-wrap:normal;word-break:normal;opacity:0;text-shadow:none;font-family:'Nunito', 'Open Sans', Frutiger, Calibri, 'Myriad Pro', Myriad, sans-serif;font-size:12px;font-weight:normal;font-style:normal;line-height:1.6;line-break:auto;filter:drop-shadow(0 1px 10px var(--color-box-shadow))}.vue-tooltip[data-v-e56a121][x-placement^='top'] .tooltip-arrow{bottom:0;margin-top:0;margin-bottom:0;border-width:10px 10px 0 10px;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent}.vue-tooltip[data-v-e56a121][x-placement^='bottom'] .tooltip-arrow{top:0;margin-top:0;margin-bottom:0;border-width:0 10px 10px 10px;border-top-color:transparent;border-right-color:transparent;border-left-color:transparent}.vue-tooltip[data-v-e56a121][x-placement^='right'] .tooltip-arrow{right:100%;margin-right:0;margin-left:0;border-width:10px 10px 10px 0;border-top-color:transparent;border-bottom-color:transparent;border-left-color:transparent}.vue-tooltip[data-v-e56a121][x-placement^='left'] .tooltip-arrow{left:100%;margin-right:0;margin-left:0;border-width:10px 0 10px 10px;border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent}.vue-tooltip[data-v-e56a121][aria-hidden='true']{visibility:hidden;transition:opacity .15s, visibility .15s;opacity:0}.vue-tooltip[data-v-e56a121][aria-hidden='false']{visibility:visible;transition:opacity .15s;opacity:1}.vue-tooltip[data-v-e56a121] .tooltip-inner{max-width:350px;padding:5px 8px;text-align:center;color:var(--color-main-text);border-radius:var(--border-radius);background-color:var(--color-main-background)}.vue-tooltip[data-v-e56a121] .tooltip-arrow{position:absolute;z-index:1;width:0;height:0;margin:0;border-style:solid;border-color:var(--color-main-background)}\n",""])},,,,,function(t,e,n){t.exports=n(102)},function(t,e){},,function(t,e,n){"use strict";var o=n(18);n.n(o).a},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,"\nbutton.menuitem[data-v-8dc4efb0] {\n\ttext-align: left;\n}\nbutton.menuitem *[data-v-8dc4efb0] {\n\tcursor: pointer;\n}\nbutton.menuitem[data-v-8dc4efb0]:disabled {\n\topacity: 0.5 !important;\n\tcursor: default;\n}\nbutton.menuitem:disabled *[data-v-8dc4efb0] {\n\tcursor: default;\n}\n.menuitem.active[data-v-8dc4efb0] {\n\tbox-shadow: inset 2px 0 var(--color-primary);\n\tborder-radius: 0;\n}\n",""])},function(t,e,n){"use strict";var o=n(19);n.n(o).a},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,"li[data-v-8dc4efb0]{display:flex;flex:0 0 auto}li.hidden[data-v-8dc4efb0]{display:none}li>button[data-v-8dc4efb0],li>a[data-v-8dc4efb0],li>.menuitem[data-v-8dc4efb0]{cursor:pointer;line-height:44px;border:0;border-radius:0;background-color:transparent;display:flex;align-items:flex-start;height:auto;margin:0;padding:0;font-weight:normal;box-shadow:none;width:100%;color:var(--color-main-text);white-space:nowrap;opacity:.7}li>button span[class^='icon-'][data-v-8dc4efb0],li>button span[class*=' icon-'][data-v-8dc4efb0],li>button[class^='icon-'][data-v-8dc4efb0],li>button[class*=' icon-'][data-v-8dc4efb0],li>a span[class^='icon-'][data-v-8dc4efb0],li>a span[class*=' icon-'][data-v-8dc4efb0],li>a[class^='icon-'][data-v-8dc4efb0],li>a[class*=' icon-'][data-v-8dc4efb0],li>.menuitem span[class^='icon-'][data-v-8dc4efb0],li>.menuitem span[class*=' icon-'][data-v-8dc4efb0],li>.menuitem[class^='icon-'][data-v-8dc4efb0],li>.menuitem[class*=' icon-'][data-v-8dc4efb0]{min-width:0;min-height:0;background-position:14px center;background-size:16px}li>button span[class^='icon-'][data-v-8dc4efb0],li>button span[class*=' icon-'][data-v-8dc4efb0],li>a span[class^='icon-'][data-v-8dc4efb0],li>a span[class*=' icon-'][data-v-8dc4efb0],li>.menuitem span[class^='icon-'][data-v-8dc4efb0],li>.menuitem span[class*=' icon-'][data-v-8dc4efb0]{padding:22px 0 22px 44px}li>button:not([class^='icon-']):not([class*='icon-'])>span[data-v-8dc4efb0]:not([class^='icon-']):not([class*='icon-']):first-child,li>button:not([class^='icon-']):not([class*='icon-'])>input[data-v-8dc4efb0]:not([class^='icon-']):not([class*='icon-']):first-child,li>button:not([class^='icon-']):not([class*='icon-'])>form[data-v-8dc4efb0]:not([class^='icon-']):not([class*='icon-']):first-child,li>a:not([class^='icon-']):not([class*='icon-'])>span[data-v-8dc4efb0]:not([class^='icon-']):not([class*='icon-']):first-child,li>a:not([class^='icon-']):not([class*='icon-'])>input[data-v-8dc4efb0]:not([class^='icon-']):not([class*='icon-']):first-child,li>a:not([class^='icon-']):not([class*='icon-'])>form[data-v-8dc4efb0]:not([class^='icon-']):not([class*='icon-']):first-child,li>.menuitem:not([class^='icon-']):not([class*='icon-'])>span[data-v-8dc4efb0]:not([class^='icon-']):not([class*='icon-']):first-child,li>.menuitem:not([class^='icon-']):not([class*='icon-'])>input[data-v-8dc4efb0]:not([class^='icon-']):not([class*='icon-']):first-child,li>.menuitem:not([class^='icon-']):not([class*='icon-'])>form[data-v-8dc4efb0]:not([class^='icon-']):not([class*='icon-']):first-child{margin-left:44px}li>button[class^='icon-'][data-v-8dc4efb0],li>button[class*=' icon-'][data-v-8dc4efb0],li>a[class^='icon-'][data-v-8dc4efb0],li>a[class*=' icon-'][data-v-8dc4efb0],li>.menuitem[class^='icon-'][data-v-8dc4efb0],li>.menuitem[class*=' icon-'][data-v-8dc4efb0]{padding:0 14px 0 44px}li>button[data-v-8dc4efb0]:not(:disabled):hover,li>button[data-v-8dc4efb0]:not(:disabled):focus,li>button:not(:disabled).active[data-v-8dc4efb0],li>a[data-v-8dc4efb0]:not(:disabled):hover,li>a[data-v-8dc4efb0]:not(:disabled):focus,li>a:not(:disabled).active[data-v-8dc4efb0],li>.menuitem[data-v-8dc4efb0]:not(:disabled):hover,li>.menuitem[data-v-8dc4efb0]:not(:disabled):focus,li>.menuitem:not(:disabled).active[data-v-8dc4efb0]{opacity:1 !important}li>button.action[data-v-8dc4efb0],li>a.action[data-v-8dc4efb0],li>.menuitem.action[data-v-8dc4efb0]{padding:inherit !important}li>button>span[data-v-8dc4efb0],li>a>span[data-v-8dc4efb0],li>.menuitem>span[data-v-8dc4efb0]{cursor:pointer;white-space:nowrap}li>button>p[data-v-8dc4efb0],li>a>p[data-v-8dc4efb0],li>.menuitem>p[data-v-8dc4efb0]{width:150px;line-height:1.6em;padding:8px 0;white-space:normal}li>button>select[data-v-8dc4efb0],li>a>select[data-v-8dc4efb0],li>.menuitem>select[data-v-8dc4efb0]{margin:0;margin-left:6px}li>button[data-v-8dc4efb0]:not(:empty),li>a[data-v-8dc4efb0]:not(:empty),li>.menuitem[data-v-8dc4efb0]:not(:empty){padding-right:14px !important}li>button>img[data-v-8dc4efb0],li>a>img[data-v-8dc4efb0],li>.menuitem>img[data-v-8dc4efb0]{width:16px;padding:14px}li>button>input.radio+label[data-v-8dc4efb0],li>button>input.checkbox+label[data-v-8dc4efb0],li>a>input.radio+label[data-v-8dc4efb0],li>a>input.checkbox+label[data-v-8dc4efb0],li>.menuitem>input.radio+label[data-v-8dc4efb0],li>.menuitem>input.checkbox+label[data-v-8dc4efb0]{padding:0 !important;width:100%}li>button>input.checkbox+label[data-v-8dc4efb0]::before,li>a>input.checkbox+label[data-v-8dc4efb0]::before,li>.menuitem>input.checkbox+label[data-v-8dc4efb0]::before{margin:-2px 13px 0}li>button>input.radio+label[data-v-8dc4efb0]::before,li>a>input.radio+label[data-v-8dc4efb0]::before,li>.menuitem>input.radio+label[data-v-8dc4efb0]::before{margin:-2px 12px 0}li>button>input[data-v-8dc4efb0]:not([type=radio]):not([type=checkbox]):not([type=image]),li>a>input[data-v-8dc4efb0]:not([type=radio]):not([type=checkbox]):not([type=image]),li>.menuitem>input[data-v-8dc4efb0]:not([type=radio]):not([type=checkbox]):not([type=image]){width:150px}li>button form[data-v-8dc4efb0],li>a form[data-v-8dc4efb0],li>.menuitem form[data-v-8dc4efb0]{display:flex;flex:1 1 auto}li>button form[data-v-8dc4efb0]:not(:first-child),li>a form[data-v-8dc4efb0]:not(:first-child),li>.menuitem form[data-v-8dc4efb0]:not(:first-child){margin-left:5px}li>button>span.hidden+form[data-v-8dc4efb0],li>button>span[style*='display:none']+form[data-v-8dc4efb0],li>a>span.hidden+form[data-v-8dc4efb0],li>a>span[style*='display:none']+form[data-v-8dc4efb0],li>.menuitem>span.hidden+form[data-v-8dc4efb0],li>.menuitem>span[style*='display:none']+form[data-v-8dc4efb0]{margin-left:0}li>button input[data-v-8dc4efb0],li>a input[data-v-8dc4efb0],li>.menuitem input[data-v-8dc4efb0]{min-width:44px;max-height:40px;margin:2px 0;flex:1 1 auto}li>button input[data-v-8dc4efb0]:not(:first-child),li>a input[data-v-8dc4efb0]:not(:first-child),li>.menuitem input[data-v-8dc4efb0]:not(:first-child){margin-left:5px}li:not(.hidden):not([style*='display:none']):first-of-type>button>form[data-v-8dc4efb0],li:not(.hidden):not([style*='display:none']):first-of-type>button>input[data-v-8dc4efb0],li:not(.hidden):not([style*='display:none']):first-of-type>a>form[data-v-8dc4efb0],li:not(.hidden):not([style*='display:none']):first-of-type>a>input[data-v-8dc4efb0],li:not(.hidden):not([style*='display:none']):first-of-type>.menuitem>form[data-v-8dc4efb0],li:not(.hidden):not([style*='display:none']):first-of-type>.menuitem>input[data-v-8dc4efb0]{margin-top:12px}li:not(.hidden):not([style*='display:none']):last-of-type>button>form[data-v-8dc4efb0],li:not(.hidden):not([style*='display:none']):last-of-type>button>input[data-v-8dc4efb0],li:not(.hidden):not([style*='display:none']):last-of-type>a>form[data-v-8dc4efb0],li:not(.hidden):not([style*='display:none']):last-of-type>a>input[data-v-8dc4efb0],li:not(.hidden):not([style*='display:none']):last-of-type>.menuitem>form[data-v-8dc4efb0],li:not(.hidden):not([style*='display:none']):last-of-type>.menuitem>input[data-v-8dc4efb0]{margin-bottom:12px}li>button[data-v-8dc4efb0]{padding:0}li>button span[data-v-8dc4efb0]{opacity:1}\n",""])},function(t,e,n){"use strict";var o=n(20);n.n(o).a},function(t,e,n){(t.exports=n(1)(!1)).push([t.i,"ul[data-v-2f982451]{display:flex;flex-direction:column}\n",""])},,,,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";n.r(e);var o,r=n(38),i=n.n(r),A=n(79),a=n.n(A),s=n(14),c=n(24),u=n(80),l=n.n(u),d=n(7),f=n(81),p=n.n(f),h=function(t){var e=t.toLowerCase();function n(t,e,n){this.r=t,this.g=e,this.b=n}function o(t,e,o){var r=[];r.push(e);for(var i=function(t,e){var n=new Array(3);return n[0]=(e[1].r-e[0].r)/t,n[1]=(e[1].g-e[0].g)/t,n[2]=(e[1].b-e[0].b)/t,n}(t,[e,o]),A=1;A<t;A++){var a=parseInt(e.r+i[0]*A),s=parseInt(e.g+i[1]*A),c=parseInt(e.b+i[2]*A);r.push(new n(a,s,c))}return r}null===e.match(/^([0-9a-f]{4}-?){8}$/)&&(e=p()(e)),e=e.replace(/[^0-9a-f]/g,"");var r=new n(182,70,157),i=new n(221,203,85),A=new n(0,130,201),a=o(6,r,i),s=o(6,i,A),c=o(6,A,r);return a.concat(s).concat(c)[function(t,e){for(var n=0,o=[],r=0;r<t.length;r++)o.push(parseInt(t.charAt(r),16)%16);for(var i in o)n+=o[i];return parseInt(parseInt(n)%e)}(e,18)]},v={name:"Avatar",directives:{tooltip:d.default,ClickOutside:s.directive},components:{PopoverMenu:c.PopoverMenu},props:{url:{type:String,default:void 0},user:{type:String,default:void 0},isGuest:{type:Boolean,default:!1},displayName:{type:String,default:void 0},size:{type:Number,default:32},allowPlaceholder:{type:Boolean,default:!0},disableTooltip:{type:Boolean,default:!1},disableMenu:{type:Boolean,default:!1},tooltipMessage:{type:String,default:null},isNoUser:{type:Boolean,default:!1},status:{type:String,default:null,validator:function(t){switch(t){case"positive":case"negative":case"neutral":return!0}return!1}},statusColor:{type:[Number,String],default:null,validator:function(t){return/^([a-f0-9]{3}){1,2}$/i.test(t)}}},data:function(){return{avatarUrlLoaded:null,avatarSrcSetLoaded:null,userDoesNotExist:!1,isAvatarLoaded:!1,isMenuLoaded:!1,contactsMenuActions:[],contactsMenuOpenState:!1}},computed:{getUserIdentifier:function(){return this.isDisplayNameDefined?this.displayName:this.isUserDefined?this.user:""},isUserDefined:function(){return void 0!==this.user},isDisplayNameDefined:function(){return void 0!==this.displayName},isUrlDefined:function(){return void 0!==this.url},hasMenu:function(){return!this.disableMenu&&(this.isMenuLoaded?this.menu.length>0:!(this.user===OC.getCurrentUser().uid||this.userDoesNotExist||this.url))},shouldShowPlaceholder:function(){return this.allowPlaceholder&&this.userDoesNotExist},avatarStyle:function(){var t={width:this.size+"px",height:this.size+"px",lineHeight:this.size+"px",fontSize:Math.round(.55*this.size)+"px"},e=h(this.getUserIdentifier);return t.backgroundColor="rgb("+e.r+", "+e.g+", "+e.b+")",t},tooltip:function(){return!this.disableTooltip&&(this.tooltipMessage?this.tooltipMessage:this.displayName)},initials:function(){return this.shouldShowPlaceholder?this.getUserIdentifier.charAt(0).toUpperCase():"?"},menu:function(){return this.contactsMenuActions.map(function(t){return{href:t.hyperlink,icon:t.icon,text:t.title}})}},watch:{url:function(){this.userDoesNotExist=!1,this.loadAvatarUrl()},user:function(){this.userDoesNotExist=!1,this.isMenuLoaded=!1,this.loadAvatarUrl()}},mounted:function(){this.loadAvatarUrl()},methods:{toggleMenu:function(){this.hasMenu&&(this.contactsMenuOpenState=!this.contactsMenuOpenState,this.contactsMenuOpenState&&this.fetchContactsMenu())},closeMenu:function(){this.contactsMenuOpenState=!1},fetchContactsMenu:(o=a()(i.a.mark(function t(){var e,n,o;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e=encodeURIComponent(this.user),t.next=4,l.a.post(OC.generateUrl("contactsmenu/findOne"),"shareType=0&shareWith=".concat(e));case 4:n=t.sent,o=n.data,this.contactsMenuActions=[o.topAction].concat(o.actions),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),this.contactsMenuOpenState=!1;case 12:this.isMenuLoaded=!0;case 13:case"end":return t.stop()}},t,this,[[0,9]])})),function(){return o.apply(this,arguments)}),loadAvatarUrl:function(){var t=this;if(this.isAvatarLoaded=!1,!this.isUrlDefined&&(!this.isUserDefined||this.isNoUser))return this.isAvatarLoaded=!0,void(this.userDoesNotExist=!0);var e=function(e,n){var o="/avatar/{user}/{size}";t.isGuest&&(o="/avatar/guest/{user}/{size}");var r=OC.generateUrl(o,{user:e,size:n});return e===OC.getCurrentUser().uid&&"undefined"!=typeof oc_userconfig&&(r+="?v="+oc_userconfig.avatar.version),r},n=e(this.user,this.size);this.isUrlDefined&&(n=this.url);var o=[n+" 1x",e(this.user,2*this.size)+" 2x",e(this.user,4*this.size)+" 4x"].join(", "),r=new Image;r.onload=function(){t.avatarUrlLoaded=n,t.isUrlDefined||(t.avatarSrcSetLoaded=o),t.isAvatarLoaded=!0},r.onerror=function(){t.userDoesNotExist=!0,t.isAvatarLoaded=!0},this.isUrlDefined||(r.srcset=o),r.src=n}}},m=(n(123),n(0)),g=n(39),b=n.n(g),y=Object(m.a)(v,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"tooltip",rawName:"v-tooltip",value:t.tooltip,expression:"tooltip"},{name:"click-outside",rawName:"v-click-outside",value:t.closeMenu,expression:"closeMenu"}],staticClass:"avatardiv popovermenu-wrapper",class:{"icon-loading":!t.isAvatarLoaded,"avatardiv--unknown":t.userDoesNotExist,"avatardiv--with-menu":t.hasMenu},style:t.avatarStyle,on:{click:t.toggleMenu}},[t.isAvatarLoaded&&!t.userDoesNotExist?n("img",{attrs:{src:t.avatarUrlLoaded,srcset:t.avatarSrcSetLoaded}}):t._e(),t._v(" "),t.hasMenu?n("div",{staticClass:"icon-more"}):t._e(),t._v(" "),t.status?n("div",{staticClass:"avatardiv__status",class:"avatardiv__status--"+t.status,style:{backgroundColor:"#"+t.statusColor}},["neutral"===t.status?n("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"11",viewBox:"0 0 3.175 2.91"}},[n("path",{style:{fill:"#"+t.statusColor},attrs:{d:"M3.21 3.043H.494l.679-1.177.68-1.176.678 1.176z",stroke:"#fff","stroke-width":".265","stroke-linecap":"square"}})]):t._e()]):t._e(),t._v(" "),t.userDoesNotExist?n("div",{staticClass:"unknown"},[t._v("\n\t\t"+t._s(t.initials)+"\n\t")]):t._e(),t._v(" "),t.hasMenu?n("div",{directives:[{name:"show",rawName:"v-show",value:t.contactsMenuOpenState,expression:"contactsMenuOpenState"}],staticClass:"popovermenu menu-center"},[n("PopoverMenu",{attrs:{"is-open":t.contactsMenuOpenState,menu:t.menu}})],1):t._e()])},[],!1,null,"affbc700",null);"function"==typeof b.a&&b()(y);var w=y.exports;n.d(e,"Avatar",function(){return w});
/**
 * @copyright Copyright (c) 2018 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */e.default=w},,,,function(t,e,n){"use strict";t.exports=function(t,e){return function(){for(var n=new Array(arguments.length),o=0;o<n.length;o++)n[o]=arguments[o];return t.apply(e,n)}}},function(t,e,n){"use strict";var o=n(4);function r(t){return encodeURIComponent(t).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}t.exports=function(t,e,n){if(!e)return t;var i;if(n)i=n(e);else if(o.isURLSearchParams(e))i=e.toString();else{var A=[];o.forEach(e,function(t,e){null!=t&&(o.isArray(t)?e+="[]":t=[t],o.forEach(t,function(t){o.isDate(t)?t=t.toISOString():o.isObject(t)&&(t=JSON.stringify(t)),A.push(r(e)+"="+r(t))}))}),i=A.join("&")}if(i){var a=t.indexOf("#");-1!==a&&(t=t.slice(0,a)),t+=(-1===t.indexOf("?")?"?":"&")+i}return t}},function(t,e,n){"use strict";t.exports=function(t){return!(!t||!t.__CANCEL__)}},function(t,e,n){"use strict";(function(e){var o=n(4),r=n(111),i={"Content-Type":"application/x-www-form-urlencoded"};function A(t,e){!o.isUndefined(t)&&o.isUndefined(t["Content-Type"])&&(t["Content-Type"]=e)}var a,s={adapter:(void 0!==e&&"[object process]"===Object.prototype.toString.call(e)?a=n(74):"undefined"!=typeof XMLHttpRequest&&(a=n(74)),a),transformRequest:[function(t,e){return r(e,"Accept"),r(e,"Content-Type"),o.isFormData(t)||o.isArrayBuffer(t)||o.isBuffer(t)||o.isStream(t)||o.isFile(t)||o.isBlob(t)?t:o.isArrayBufferView(t)?t.buffer:o.isURLSearchParams(t)?(A(e,"application/x-www-form-urlencoded;charset=utf-8"),t.toString()):o.isObject(t)?(A(e,"application/json;charset=utf-8"),JSON.stringify(t)):t}],transformResponse:[function(t){if("string"==typeof t)try{t=JSON.parse(t)}catch(t){}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(t){return t>=200&&t<300}};s.headers={common:{Accept:"application/json, text/plain, */*"}},o.forEach(["delete","get","head"],function(t){s.headers[t]={}}),o.forEach(["post","put","patch"],function(t){s.headers[t]=o.merge(i)}),t.exports=s}).call(this,n(110))},function(t,e,n){"use strict";var o=n(4),r=n(112),i=n(71),A=n(114),a=n(115),s=n(75);t.exports=function(t){return new Promise(function(e,c){var u=t.data,l=t.headers;o.isFormData(u)&&delete l["Content-Type"];var d=new XMLHttpRequest;if(t.auth){var f=t.auth.username||"",p=t.auth.password||"";l.Authorization="Basic "+btoa(f+":"+p)}if(d.open(t.method.toUpperCase(),i(t.url,t.params,t.paramsSerializer),!0),d.timeout=t.timeout,d.onreadystatechange=function(){if(d&&4===d.readyState&&(0!==d.status||d.responseURL&&0===d.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in d?A(d.getAllResponseHeaders()):null,o={data:t.responseType&&"text"!==t.responseType?d.response:d.responseText,status:d.status,statusText:d.statusText,headers:n,config:t,request:d};r(e,c,o),d=null}},d.onabort=function(){d&&(c(s("Request aborted",t,"ECONNABORTED",d)),d=null)},d.onerror=function(){c(s("Network Error",t,null,d)),d=null},d.ontimeout=function(){c(s("timeout of "+t.timeout+"ms exceeded",t,"ECONNABORTED",d)),d=null},o.isStandardBrowserEnv()){var h=n(116),v=(t.withCredentials||a(t.url))&&t.xsrfCookieName?h.read(t.xsrfCookieName):void 0;v&&(l[t.xsrfHeaderName]=v)}if("setRequestHeader"in d&&o.forEach(l,function(t,e){void 0===u&&"content-type"===e.toLowerCase()?delete l[e]:d.setRequestHeader(e,t)}),t.withCredentials&&(d.withCredentials=!0),t.responseType)try{d.responseType=t.responseType}catch(e){if("json"!==t.responseType)throw e}"function"==typeof t.onDownloadProgress&&d.addEventListener("progress",t.onDownloadProgress),"function"==typeof t.onUploadProgress&&d.upload&&d.upload.addEventListener("progress",t.onUploadProgress),t.cancelToken&&t.cancelToken.promise.then(function(t){d&&(d.abort(),c(t),d=null)}),void 0===u&&(u=null),d.send(u)})}},function(t,e,n){"use strict";var o=n(113);t.exports=function(t,e,n,r,i){var A=new Error(t);return o(A,e,n,r,i)}},function(t,e,n){"use strict";var o=n(4);t.exports=function(t,e){e=e||{};var n={};return o.forEach(["url","method","params","data"],function(t){void 0!==e[t]&&(n[t]=e[t])}),o.forEach(["headers","auth","proxy"],function(r){o.isObject(e[r])?n[r]=o.deepMerge(t[r],e[r]):void 0!==e[r]?n[r]=e[r]:o.isObject(t[r])?n[r]=o.deepMerge(t[r]):void 0!==t[r]&&(n[r]=t[r])}),o.forEach(["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","maxContentLength","validateStatus","maxRedirects","httpAgent","httpsAgent","cancelToken","socketPath"],function(o){void 0!==e[o]?n[o]=e[o]:void 0!==t[o]&&(n[o]=t[o])}),n}},function(t,e,n){"use strict";function o(t){this.message=t}o.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},o.prototype.__CANCEL__=!0,t.exports=o},function(t,e){var n={utf8:{stringToBytes:function(t){return n.bin.stringToBytes(unescape(encodeURIComponent(t)))},bytesToString:function(t){return decodeURIComponent(escape(n.bin.bytesToString(t)))}},bin:{stringToBytes:function(t){for(var e=[],n=0;n<t.length;n++)e.push(255&t.charCodeAt(n));return e},bytesToString:function(t){for(var e=[],n=0;n<t.length;n++)e.push(String.fromCharCode(t[n]));return e.join("")}}};t.exports=n},function(t,e){function n(t,e,n,o,r,i,A){try{var a=t[i](A),s=a.value}catch(t){return void n(t)}a.done?e(s):Promise.resolve(s).then(o,r)}t.exports=function(t){return function(){var e=this,o=arguments;return new Promise(function(r,i){var A=t.apply(e,o);function a(t){n(A,r,i,a,s,"next",t)}function s(t){n(A,r,i,a,s,"throw",t)}a(void 0)})}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(103).default.create({headers:{requesttoken:OC.requestToken}});e.default=o},function(t,e,n){var o,r,i,A,a;o=n(121),r=n(78).utf8,i=n(122),A=n(78).bin,(a=function(t,e){t.constructor==String?t=e&&"binary"===e.encoding?A.stringToBytes(t):r.stringToBytes(t):i(t)?t=Array.prototype.slice.call(t,0):Array.isArray(t)||(t=t.toString());for(var n=o.bytesToWords(t),s=8*t.length,c=1732584193,u=-271733879,l=-1732584194,d=271733878,f=0;f<n.length;f++)n[f]=16711935&(n[f]<<8|n[f]>>>24)|4278255360&(n[f]<<24|n[f]>>>8);n[s>>>5]|=128<<s%32,n[14+(s+64>>>9<<4)]=s;var p=a._ff,h=a._gg,v=a._hh,m=a._ii;for(f=0;f<n.length;f+=16){var g=c,b=u,y=l,w=d;c=p(c,u,l,d,n[f+0],7,-680876936),d=p(d,c,u,l,n[f+1],12,-389564586),l=p(l,d,c,u,n[f+2],17,606105819),u=p(u,l,d,c,n[f+3],22,-1044525330),c=p(c,u,l,d,n[f+4],7,-176418897),d=p(d,c,u,l,n[f+5],12,1200080426),l=p(l,d,c,u,n[f+6],17,-1473231341),u=p(u,l,d,c,n[f+7],22,-45705983),c=p(c,u,l,d,n[f+8],7,1770035416),d=p(d,c,u,l,n[f+9],12,-1958414417),l=p(l,d,c,u,n[f+10],17,-42063),u=p(u,l,d,c,n[f+11],22,-1990404162),c=p(c,u,l,d,n[f+12],7,1804603682),d=p(d,c,u,l,n[f+13],12,-40341101),l=p(l,d,c,u,n[f+14],17,-1502002290),c=h(c,u=p(u,l,d,c,n[f+15],22,1236535329),l,d,n[f+1],5,-165796510),d=h(d,c,u,l,n[f+6],9,-1069501632),l=h(l,d,c,u,n[f+11],14,643717713),u=h(u,l,d,c,n[f+0],20,-373897302),c=h(c,u,l,d,n[f+5],5,-701558691),d=h(d,c,u,l,n[f+10],9,38016083),l=h(l,d,c,u,n[f+15],14,-660478335),u=h(u,l,d,c,n[f+4],20,-405537848),c=h(c,u,l,d,n[f+9],5,568446438),d=h(d,c,u,l,n[f+14],9,-1019803690),l=h(l,d,c,u,n[f+3],14,-187363961),u=h(u,l,d,c,n[f+8],20,1163531501),c=h(c,u,l,d,n[f+13],5,-1444681467),d=h(d,c,u,l,n[f+2],9,-51403784),l=h(l,d,c,u,n[f+7],14,1735328473),c=v(c,u=h(u,l,d,c,n[f+12],20,-1926607734),l,d,n[f+5],4,-378558),d=v(d,c,u,l,n[f+8],11,-2022574463),l=v(l,d,c,u,n[f+11],16,1839030562),u=v(u,l,d,c,n[f+14],23,-35309556),c=v(c,u,l,d,n[f+1],4,-1530992060),d=v(d,c,u,l,n[f+4],11,1272893353),l=v(l,d,c,u,n[f+7],16,-155497632),u=v(u,l,d,c,n[f+10],23,-1094730640),c=v(c,u,l,d,n[f+13],4,681279174),d=v(d,c,u,l,n[f+0],11,-358537222),l=v(l,d,c,u,n[f+3],16,-722521979),u=v(u,l,d,c,n[f+6],23,76029189),c=v(c,u,l,d,n[f+9],4,-640364487),d=v(d,c,u,l,n[f+12],11,-421815835),l=v(l,d,c,u,n[f+15],16,530742520),c=m(c,u=v(u,l,d,c,n[f+2],23,-995338651),l,d,n[f+0],6,-198630844),d=m(d,c,u,l,n[f+7],10,1126891415),l=m(l,d,c,u,n[f+14],15,-1416354905),u=m(u,l,d,c,n[f+5],21,-57434055),c=m(c,u,l,d,n[f+12],6,1700485571),d=m(d,c,u,l,n[f+3],10,-1894986606),l=m(l,d,c,u,n[f+10],15,-1051523),u=m(u,l,d,c,n[f+1],21,-2054922799),c=m(c,u,l,d,n[f+8],6,1873313359),d=m(d,c,u,l,n[f+15],10,-30611744),l=m(l,d,c,u,n[f+6],15,-1560198380),u=m(u,l,d,c,n[f+13],21,1309151649),c=m(c,u,l,d,n[f+4],6,-145523070),d=m(d,c,u,l,n[f+11],10,-1120210379),l=m(l,d,c,u,n[f+2],15,718787259),u=m(u,l,d,c,n[f+9],21,-343485551),c=c+g>>>0,u=u+b>>>0,l=l+y>>>0,d=d+w>>>0}return o.endian([c,u,l,d])})._ff=function(t,e,n,o,r,i,A){var a=t+(e&n|~e&o)+(r>>>0)+A;return(a<<i|a>>>32-i)+e},a._gg=function(t,e,n,o,r,i,A){var a=t+(e&o|n&~o)+(r>>>0)+A;return(a<<i|a>>>32-i)+e},a._hh=function(t,e,n,o,r,i,A){var a=t+(e^n^o)+(r>>>0)+A;return(a<<i|a>>>32-i)+e},a._ii=function(t,e,n,o,r,i,A){var a=t+(n^(e|~o))+(r>>>0)+A;return(a<<i|a>>>32-i)+e},a._blocksize=16,a._digestsize=16,t.exports=function(t,e){if(null==t)throw new Error("Illegal argument "+t);var n=o.wordsToBytes(a(t,e));return e&&e.asBytes?n:e&&e.asString?A.bytesToString(n):o.bytesToHex(n)}},,,,,,,,,,,,,,,,,,,,,function(t,e,n){var o=function(t){"use strict";var e,n=Object.prototype,o=n.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},i=r.iterator||"@@iterator",A=r.asyncIterator||"@@asyncIterator",a=r.toStringTag||"@@toStringTag";function s(t,e,n,o){var r=e&&e.prototype instanceof h?e:h,i=Object.create(r.prototype),A=new M(o||[]);return i._invoke=function(t,e,n){var o=u;return function(r,i){if(o===d)throw new Error("Generator is already running");if(o===f){if("throw"===r)throw i;return _()}for(n.method=r,n.arg=i;;){var A=n.delegate;if(A){var a=B(A,n);if(a){if(a===p)continue;return a}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===u)throw o=f,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=d;var s=c(t,e,n);if("normal"===s.type){if(o=n.done?f:l,s.arg===p)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(o=f,n.method="throw",n.arg=s.arg)}}}(t,n,A),i}function c(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var u="suspendedStart",l="suspendedYield",d="executing",f="completed",p={};function h(){}function v(){}function m(){}var g={};g[i]=function(){return this};var b=Object.getPrototypeOf,y=b&&b(b(I([])));y&&y!==n&&o.call(y,i)&&(g=y);var w=m.prototype=h.prototype=Object.create(g);function E(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function x(t){var e;this._invoke=function(n,r){function i(){return new Promise(function(e,i){!function e(n,r,i,A){var a=c(t[n],t,r);if("throw"!==a.type){var s=a.arg,u=s.value;return u&&"object"==typeof u&&o.call(u,"__await")?Promise.resolve(u.__await).then(function(t){e("next",t,i,A)},function(t){e("throw",t,i,A)}):Promise.resolve(u).then(function(t){s.value=t,i(s)},function(t){return e("throw",t,i,A)})}A(a.arg)}(n,r,e,i)})}return e=e?e.then(i,i):i()}}function B(t,n){var o=t.iterator[n.method];if(o===e){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=e,B(t,n),"throw"===n.method))return p;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var r=c(o,t.iterator,n.arg);if("throw"===r.type)return n.method="throw",n.arg=r.arg,n.delegate=null,p;var i=r.arg;return i?i.done?(n[t.resultName]=i.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,p):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,p)}function T(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function C(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function M(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(T,this),this.reset(!0)}function I(t){if(t){var n=t[i];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,A=function n(){for(;++r<t.length;)if(o.call(t,r))return n.value=t[r],n.done=!1,n;return n.value=e,n.done=!0,n};return A.next=A}}return{next:_}}function _(){return{value:e,done:!0}}return v.prototype=w.constructor=m,m.constructor=v,m[a]=v.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,a in t||(t[a]="GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},E(x.prototype),x.prototype[A]=function(){return this},t.AsyncIterator=x,t.async=function(e,n,o,r){var i=new x(s(e,n,o,r));return t.isGeneratorFunction(n)?i:i.next().then(function(t){return t.done?t.value:i.next()})},E(w),w[a]="Generator",w[i]=function(){return this},w.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var o=e.pop();if(o in t)return n.value=o,n.done=!1,n}return n.done=!0,n}},t.values=I,M.prototype={constructor:M,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(C),!t)for(var n in this)"t"===n.charAt(0)&&o.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function r(o,r){return a.type="throw",a.arg=t,n.next=o,r&&(n.method="next",n.arg=e),!!r}for(var i=this.tryEntries.length-1;i>=0;--i){var A=this.tryEntries[i],a=A.completion;if("root"===A.tryLoc)return r("end");if(A.tryLoc<=this.prev){var s=o.call(A,"catchLoc"),c=o.call(A,"finallyLoc");if(s&&c){if(this.prev<A.catchLoc)return r(A.catchLoc,!0);if(this.prev<A.finallyLoc)return r(A.finallyLoc)}else if(s){if(this.prev<A.catchLoc)return r(A.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<A.finallyLoc)return r(A.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&o.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var A=i?i.completion:{};return A.type=t,A.arg=e,i?(this.method="next",this.next=i.finallyLoc,p):this.complete(A)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),C(n),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var o=n.completion;if("throw"===o.type){var r=o.arg;C(n)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,o){return this.delegate={iterator:I(t),resultName:n,nextLoc:o},"next"===this.method&&(this.arg=e),p}},t}(t.exports);try{regeneratorRuntime=o}catch(t){Function("r","regeneratorRuntime = r")(o)}},function(t,e,n){t.exports=n(104)},function(t,e,n){"use strict";var o=n(4),r=n(70),i=n(106),A=n(76);function a(t){var e=new i(t),n=r(i.prototype.request,e);return o.extend(n,i.prototype,e),o.extend(n,e),n}var s=a(n(73));s.Axios=i,s.create=function(t){return a(A(s.defaults,t))},s.Cancel=n(77),s.CancelToken=n(119),s.isCancel=n(72),s.all=function(t){return Promise.all(t)},s.spread=n(120),t.exports=s,t.exports.default=s},function(t,e){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
t.exports=function(t){return null!=t&&null!=t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}},function(t,e,n){"use strict";var o=n(4),r=n(71),i=n(107),A=n(108),a=n(76);function s(t){this.defaults=t,this.interceptors={request:new i,response:new i}}s.prototype.request=function(t){"string"==typeof t?(t=arguments[1]||{}).url=arguments[0]:t=t||{},(t=a(this.defaults,t)).method=t.method?t.method.toLowerCase():"get";var e=[A,void 0],n=Promise.resolve(t);for(this.interceptors.request.forEach(function(t){e.unshift(t.fulfilled,t.rejected)}),this.interceptors.response.forEach(function(t){e.push(t.fulfilled,t.rejected)});e.length;)n=n.then(e.shift(),e.shift());return n},s.prototype.getUri=function(t){return t=a(this.defaults,t),r(t.url,t.params,t.paramsSerializer).replace(/^\?/,"")},o.forEach(["delete","get","head","options"],function(t){s.prototype[t]=function(e,n){return this.request(o.merge(n||{},{method:t,url:e}))}}),o.forEach(["post","put","patch"],function(t){s.prototype[t]=function(e,n,r){return this.request(o.merge(r||{},{method:t,url:e,data:n}))}}),t.exports=s},function(t,e,n){"use strict";var o=n(4);function r(){this.handlers=[]}r.prototype.use=function(t,e){return this.handlers.push({fulfilled:t,rejected:e}),this.handlers.length-1},r.prototype.eject=function(t){this.handlers[t]&&(this.handlers[t]=null)},r.prototype.forEach=function(t){o.forEach(this.handlers,function(e){null!==e&&t(e)})},t.exports=r},function(t,e,n){"use strict";var o=n(4),r=n(109),i=n(72),A=n(73),a=n(117),s=n(118);function c(t){t.cancelToken&&t.cancelToken.throwIfRequested()}t.exports=function(t){return c(t),t.baseURL&&!a(t.url)&&(t.url=s(t.baseURL,t.url)),t.headers=t.headers||{},t.data=r(t.data,t.headers,t.transformRequest),t.headers=o.merge(t.headers.common||{},t.headers[t.method]||{},t.headers||{}),o.forEach(["delete","get","head","post","put","patch","common"],function(e){delete t.headers[e]}),(t.adapter||A.adapter)(t).then(function(e){return c(t),e.data=r(e.data,e.headers,t.transformResponse),e},function(e){return i(e)||(c(t),e&&e.response&&(e.response.data=r(e.response.data,e.response.headers,t.transformResponse))),Promise.reject(e)})}},function(t,e,n){"use strict";var o=n(4);t.exports=function(t,e,n){return o.forEach(n,function(n){t=n(t,e)}),t}},function(t,e){var n,o,r=t.exports={};function i(){throw new Error("setTimeout has not been defined")}function A(){throw new Error("clearTimeout has not been defined")}function a(t){if(n===setTimeout)return setTimeout(t,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0)}catch(e){try{return n.call(null,t,0)}catch(e){return n.call(this,t,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(t){n=i}try{o="function"==typeof clearTimeout?clearTimeout:A}catch(t){o=A}}();var s,c=[],u=!1,l=-1;function d(){u&&s&&(u=!1,s.length?c=s.concat(c):l=-1,c.length&&f())}function f(){if(!u){var t=a(d);u=!0;for(var e=c.length;e;){for(s=c,c=[];++l<e;)s&&s[l].run();l=-1,e=c.length}s=null,u=!1,function(t){if(o===clearTimeout)return clearTimeout(t);if((o===A||!o)&&clearTimeout)return o=clearTimeout,clearTimeout(t);try{o(t)}catch(e){try{return o.call(null,t)}catch(e){return o.call(this,t)}}}(t)}}function p(t,e){this.fun=t,this.array=e}function h(){}r.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];c.push(new p(t,e)),1!==c.length||u||a(f)},p.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=h,r.addListener=h,r.once=h,r.off=h,r.removeListener=h,r.removeAllListeners=h,r.emit=h,r.prependListener=h,r.prependOnceListener=h,r.listeners=function(t){return[]},r.binding=function(t){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(t){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}},function(t,e,n){"use strict";var o=n(4);t.exports=function(t,e){o.forEach(t,function(n,o){o!==e&&o.toUpperCase()===e.toUpperCase()&&(t[e]=n,delete t[o])})}},function(t,e,n){"use strict";var o=n(75);t.exports=function(t,e,n){var r=n.config.validateStatus;!r||r(n.status)?t(n):e(o("Request failed with status code "+n.status,n.config,null,n.request,n))}},function(t,e,n){"use strict";t.exports=function(t,e,n,o,r){return t.config=e,n&&(t.code=n),t.request=o,t.response=r,t.isAxiosError=!0,t.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},t}},function(t,e,n){"use strict";var o=n(4),r=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];t.exports=function(t){var e,n,i,A={};return t?(o.forEach(t.split("\n"),function(t){if(i=t.indexOf(":"),e=o.trim(t.substr(0,i)).toLowerCase(),n=o.trim(t.substr(i+1)),e){if(A[e]&&r.indexOf(e)>=0)return;A[e]="set-cookie"===e?(A[e]?A[e]:[]).concat([n]):A[e]?A[e]+", "+n:n}}),A):A}},function(t,e,n){"use strict";var o=n(4);t.exports=o.isStandardBrowserEnv()?function(){var t,e=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function r(t){var o=t;return e&&(n.setAttribute("href",o),o=n.href),n.setAttribute("href",o),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return t=r(window.location.href),function(e){var n=o.isString(e)?r(e):e;return n.protocol===t.protocol&&n.host===t.host}}():function(){return!0}},function(t,e,n){"use strict";var o=n(4);t.exports=o.isStandardBrowserEnv()?{write:function(t,e,n,r,i,A){var a=[];a.push(t+"="+encodeURIComponent(e)),o.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),o.isString(r)&&a.push("path="+r),o.isString(i)&&a.push("domain="+i),!0===A&&a.push("secure"),document.cookie=a.join("; ")},read:function(t){var e=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove:function(t){this.write(t,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(t,e,n){"use strict";t.exports=function(t){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)}},function(t,e,n){"use strict";t.exports=function(t,e){return e?t.replace(/\/+$/,"")+"/"+e.replace(/^\/+/,""):t}},function(t,e,n){"use strict";var o=n(77);function r(t){if("function"!=typeof t)throw new TypeError("executor must be a function.");var e;this.promise=new Promise(function(t){e=t});var n=this;t(function(t){n.reason||(n.reason=new o(t),e(n.reason))})}r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var t;return{token:new r(function(e){t=e}),cancel:t}},t.exports=r},function(t,e,n){"use strict";t.exports=function(t){return function(e){return t.apply(null,e)}}},function(t,e){var n,o;n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",o={rotl:function(t,e){return t<<e|t>>>32-e},rotr:function(t,e){return t<<32-e|t>>>e},endian:function(t){if(t.constructor==Number)return 16711935&o.rotl(t,8)|4278255360&o.rotl(t,24);for(var e=0;e<t.length;e++)t[e]=o.endian(t[e]);return t},randomBytes:function(t){for(var e=[];t>0;t--)e.push(Math.floor(256*Math.random()));return e},bytesToWords:function(t){for(var e=[],n=0,o=0;n<t.length;n++,o+=8)e[o>>>5]|=t[n]<<24-o%32;return e},wordsToBytes:function(t){for(var e=[],n=0;n<32*t.length;n+=8)e.push(t[n>>>5]>>>24-n%32&255);return e},bytesToHex:function(t){for(var e=[],n=0;n<t.length;n++)e.push((t[n]>>>4).toString(16)),e.push((15&t[n]).toString(16));return e.join("")},hexToBytes:function(t){for(var e=[],n=0;n<t.length;n+=2)e.push(parseInt(t.substr(n,2),16));return e},bytesToBase64:function(t){for(var e=[],o=0;o<t.length;o+=3)for(var r=t[o]<<16|t[o+1]<<8|t[o+2],i=0;i<4;i++)8*o+6*i<=8*t.length?e.push(n.charAt(r>>>6*(3-i)&63)):e.push("=");return e.join("")},base64ToBytes:function(t){t=t.replace(/[^A-Z0-9+\/]/gi,"");for(var e=[],o=0,r=0;o<t.length;r=++o%4)0!=r&&e.push((n.indexOf(t.charAt(o-1))&Math.pow(2,-2*r+8)-1)<<2*r|n.indexOf(t.charAt(o))>>>6-2*r);return e}},t.exports=o},function(t,e){function n(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
t.exports=function(t){return null!=t&&(n(t)||function(t){return"function"==typeof t.readFloatLE&&"function"==typeof t.slice&&n(t.slice(0,0))}(t)||!!t._isBuffer)}},function(t,e,n){"use strict";var o=n(29);n.n(o).a},function(t,e,n){e=t.exports=n(1)(!1);var o=n(9),r=o(n(10)),i=o(n(11)),A=o(n(12)),a=o(n(13));e.push([t.i,'@font-face{font-family:"iconfont-vue-e56a121";src:url('+r+");src:url("+r+') format("embedded-opentype"),url('+i+') format("woff"),url('+A+') format("truetype"),url('+a+') format("svg")}.icon[data-v-affbc700]{font-style:normal;font-weight:400}.icon.arrow-left-double[data-v-affbc700]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.arrow-left[data-v-affbc700]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.arrow-right-double[data-v-affbc700]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.arrow-right[data-v-affbc700]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.close[data-v-affbc700]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.confirm-fade[data-v-affbc700]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.confirm[data-v-affbc700]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.menu[data-v-affbc700]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.more[data-v-affbc700]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.pause[data-v-affbc700]:before{font-family:"iconfont-vue-e56a121";content:""}.icon.play[data-v-affbc700]:before{font-family:"iconfont-vue-e56a121";content:""}.avatardiv[data-v-affbc700]{position:relative;display:inline-block}.avatardiv--unknown[data-v-affbc700]{position:relative;background-color:var(--color-text-maxcontrast)}.avatardiv--with-menu[data-v-affbc700]{cursor:pointer}.avatardiv--with-menu .icon-more[data-v-affbc700]{position:absolute;top:0;left:0;display:flex;align-items:center;justify-content:center;width:inherit;height:inherit;cursor:pointer;opacity:0;background:none;font-size:18px}.avatardiv--with-menu .icon-more[data-v-affbc700]:before{font-family:"iconfont-vue-e56a121";font-style:normal;font-weight:400;content:""}.avatardiv--with-menu .icon-more[data-v-affbc700]::before{display:block}.avatardiv--with-menu:focus .icon-more[data-v-affbc700],.avatardiv--with-menu:hover .icon-more[data-v-affbc700]{opacity:1}.avatardiv--with-menu:focus img[data-v-affbc700],.avatardiv--with-menu:hover img[data-v-affbc700]{opacity:0}.avatardiv--with-menu .icon-more[data-v-affbc700],.avatardiv--with-menu img[data-v-affbc700]{transition:opacity var(--animation-quick)}.avatardiv>.unknown[data-v-affbc700]{position:absolute;top:0;left:0;display:block;width:100%;text-align:center;color:var(--color-main-background)}.avatardiv img[data-v-affbc700]{width:100%;height:100%}.avatardiv .avatardiv__status[data-v-affbc700]{position:absolute;top:22px;left:22px;width:10px;height:10px;border:1px solid rgba(255,255,255,0.5);background-clip:content-box}.avatardiv .avatardiv__status--positive[data-v-affbc700]{border-radius:50%;background-color:var(--color-success)}.avatardiv .avatardiv__status--negative[data-v-affbc700]{background-color:var(--color-error)}.avatardiv .avatardiv__status--neutral[data-v-affbc700]{border:none;background-color:transparent !important}.avatardiv .avatardiv__status--neutral svg[data-v-affbc700]{position:absolute;top:-3px;left:-2px}.avatardiv .avatardiv__status--neutral svg path[data-v-affbc700]{fill:#aaa}.avatardiv .popovermenu-wrapper[data-v-affbc700]{position:relative;display:inline-block}.avatardiv .popovermenu[data-v-affbc700]{display:block;margin:0;font-size:initial}\n',""])}])});
//# sourceMappingURL=Avatar.js.map

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = {};

function modulesToDom(moduleId, list, options) {
  for (var i = 0; i < list.length; i++) {
    var part = {
      css: list[i][1],
      media: list[i][2],
      sourceMap: list[i][3]
    };

    if (stylesInDom[moduleId][i]) {
      stylesInDom[moduleId][i](part);
    } else {
      stylesInDom[moduleId].push(addStyle(part, options));
    }
  }
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (moduleId, list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  moduleId = options.base ? moduleId + options.base : moduleId;
  list = list || [];

  if (!stylesInDom[moduleId]) {
    stylesInDom[moduleId] = [];
  }

  modulesToDom(moduleId, list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    if (!stylesInDom[moduleId]) {
      stylesInDom[moduleId] = [];
    }

    modulesToDom(moduleId, newList, options);

    for (var j = newList.length; j < stylesInDom[moduleId].length; j++) {
      stylesInDom[moduleId][j]();
    }

    stylesInDom[moduleId].length = newList.length;

    if (stylesInDom[moduleId].length === 0) {
      delete stylesInDom[moduleId];
    }
  };
};

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    for (var i = 0; i < modules.length; i++) {
      var item = [].concat(modules[i]);

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ 59:
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(10);
var normalizeHeaderName = __webpack_require__(122);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(64);
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(64);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(59)))

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);
var settle = __webpack_require__(123);
var buildURL = __webpack_require__(61);
var buildFullPath = __webpack_require__(125);
var parseHeaders = __webpack_require__(128);
var isURLSameOrigin = __webpack_require__(129);
var createError = __webpack_require__(65);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(131);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(124);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addStylesClient; });
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(117);

/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(494);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(68).default
var update = add("57694d4e", content, true, {});

/***/ })

/******/ });
//# sourceMappingURL=collections.js.map