// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({7:[function(require,module,exports) {
module.exports = {
  "type": "service_account",
  "project_id": "simplereservation-204818",
  "private_key_id": "2ac70a45437987c5f3be3351fe14ca0b319a55b4",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC7WguEPWWtIaQT\nrQlXtjCg9C4B8nlRHsawPyT74lnqJBHYNbObuOTBaHAA2yII9l9JPAMsBG3anBxI\ndLQGCKG/T7D4ZkMSomQ4Ag+fhrGF4oPj3YzZ4LCNVIVZdaBiG0WjLXRCN1ytTVS6\ngVJ3spYvDjVcOg4d2/eSPfaPJivZ5sZ5OCsIlrC8n7gmD6ziF1i47SxI5503AgHm\nWmx3gTP9bMRT90vQ1PLk/+c+YPuvCVCDH/euh7p2KKvNg9iR5BZRLfYBLG7SBCm5\nlDjhPqxAvF3CG7s9U4QkDeY6vo13bqgHW2L600FOCO7ieyyNEL1muHjf4nURXJSf\nPk8CCVzNAgMBAAECgf8G+MVK87C9OHZj9n2P4yQY0RhwtQeqHk8MPpqBNtYdquoI\nkBIc7YQdKaM3iYJPCpr/Ge1dr94dghdCNAwVSdda3jCgAY0AzSaof9TJJnI2aWeP\nS2bT7wR/rkzIuZBjkXpPvXDafoDC8NajXHceIb9gp39r3OMfb4KGoMI+MUqQ9nJ/\n07mCn8jNWRUiO+c4adcib7HqP6EQKZL8rLTRLmyi+Zn5teOwRzTcbhHf8bi3SNpI\nSolRCXVpJ9BuDHPOCSBlbYIYVn1pBTiZ+q6KeeBC+1hNbEeXjuqoCc8hW4RoncIM\nLF0ztuIaOwyBnCqUw1sHKJEPJbt88qV+SGJfOvcCgYEA24Lk80SbUOsjpKCcCR7o\nSkvjCbqlvD9+oUUlZVSGfhUfkHSj05tu2kZY07UZbYmelO2V4QIT4i6BHp5XfJjp\nHjIUl9bslQoyvE3QeHnjaGdle9KX9X4D8USH52DUT5/RYRJvD1i3oJliDCSaZldP\nLLJLqosb/FBfKK5C3WmjEhsCgYEA2n6hFj77EEHOg0VaDLYNyeKDF+fbYt0fpLOL\nnJRCxwbfpqqCrj+KeIyN60jrdm8Li7ejJfqH0e+h7uo0SXID/lxFYiwcpwmDv/P+\n0qFj0vdACrXXO0j2Z+x22xxjL0v1gHnKce19OJK8+ygn2QgXlMFXfuc6+ddN1hlG\nHBvA+zcCgYEAs1CZ9p90wQVUeIc677hvyUF0ld4CxWSY7OSvR7dkplpbDoY5zgKK\n64PLzCWEQBbLlJ0Acm5gD8QtdfWjQgUnaaM/b0oCuT07dNecFM59FixgmmXN/JyU\nW+K/oiNXTDQhtkp4rvCqEGc70O+VsURhSQHdDdPVaKe/FFxGAtjofUECgYEArGL6\nP24DcekpwWJnUN4WdPFVEvhonFDwVWcfQLOtGBBxRrMDFe2mF8R1eGx48mFcj6ic\nfSt0G4vgjHqWNFhTlE1CpNk+5f9YxosAwzh4ZQuUqJ6dqPXBC2+Cuw9jpf5dPTda\nJZcFlCwaFGKzRcXfrQr6OHLBkjtv+vrH2QeAs/MCgYA88c3JQUczR0TPKIrOMSju\nOcW62LfoncNRSlFtd2LKwO9cZeYZB3I2UisKrmCHpqwT3j73ajZArmFTqnhBbl1Y\n0zmXPJ2IuHlYM0sXXYqldxqa8heux/t+oa/wTnWTs6Xff4U2vuVWgz5/cSZ7GBqr\nGEUaA/RLYc545y2E/F8S0g==\n-----END PRIVATE KEY-----\n",
  "client_email": "reservations@simplereservation-204818.iam.gserviceaccount.com",
  "client_id": "110825691559141729286",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/reservations%40simplereservation-204818.iam.gserviceaccount.com"
}
;
},{}],1006:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '40767' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
      // Clear the console after HMR
      console.clear();
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[1006,7], null)