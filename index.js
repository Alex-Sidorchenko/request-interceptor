class RequestInterceptor {
  static _instance;

  constructor() {
    if (RequestInterceptor._instance) {
      throw new Error("Instantiation failed");
    }
    RequestInterceptor._instance = this;
    this.defaultXHROpen = window.XMLHttpRequest.prototype.open;
  }

  initIntercepting() {
    window.XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
      // do something with the method, url and etc.
      this.addEventListener('load', function() {
        // do something with the response text
        console.log('load: ' + this.responseText);
      });
      return defaultXHROpen.apply(this, arguments);
    }
  }

  stopIntercepting() {
    if (defaultXHROpen) {
      window.XMLHttpRequest.prototype.open = defaultXHROpen;
    }
  }
}

module.exports.RequestInterceptor = RequestInterceptor;
