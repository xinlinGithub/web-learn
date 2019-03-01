"use strict";

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Plane = (function() {
  _createClass(Plane, null, [
    {
      key: "alive",
      value: function alive() {
        return true;
      }
    }
  ]);

  function Plane(name, attack) {
    _classCallCheck(this, Plane);

    (this.name = name), (this.attach = attack);
  }

  _createClass(Plane, [
    {
      key: "fly",
      value: function fly() {
        console.log("biubiubiu");
      }
    }
  ]);

  return Plane;
})();

var p = new Plane("plane", false);

// 主要继承公有和静态 且继承后constructor指向本身

var AttackPlane = (function(_Plane) {
  _inherits(AttackPlane, _Plane);

  function AttackPlane(name, attack) {
    _classCallCheck(this, AttackPlane);

    var _this = _possibleConstructorReturn(
      this,
      (AttackPlane.__proto__ || Object.getPrototypeOf(AttackPlane)).call(
        this,
        name,
        attack
      )
    );
    // 继承私有

    _this.blood = 100;
    return _this;
  }

  _createClass(AttackPlane, [
    {
      key: "attack",
      value: function attack() {
        this.blood += 10;
      }
    }
  ]);

  return AttackPlane;
})(Plane);

var attackP = new AttackPlane("attackPlane", true);
