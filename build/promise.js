"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  function MainPromise(callback) {
    if (typeof callback !== 'function') {
      return console.error('Аргументом была передана не функция');
    }

    this.runningProcess = false;
    this.runQueue = [];

    this.resolve = function (data) {
      if (!this.runningProcess) {
        this.runningProcess = true;
        this.runQueue.forEach(function (item) {
          if (_typeof(data) == 'object') {
            callback(item(data));
          } else {
            data = item(data);
          }
        });
      }
    }.bind(this);

    this.reject = function (error) {
      if (!this.runningProcess) {
        this.runningProcess = true;
        this.catch(error);
      }
    }.bind(this);

    setTimeout(function () {
      try {
        callback(this.resolve, this.reject);
      } catch (error) {
        this.reject(error);
      }
    }.bind(this), 0);

    this.then = function (funcThen) {
      this.runQueue.push(funcThen);
      return this;
    }.bind(this);

    this.catch = function (funcCatch) {
      return funcCatch;
    };
  }

  window.MainPromise = MainPromise;
})();