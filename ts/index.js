var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 类装饰器
var a;
(function (a) {
    function enhancer(target) {
        target.prototype.name = 'hank';
        target.prototype.hello = '你好';
    }
    var Personal = /** @class */ (function () {
        function Personal() {
        }
        Personal = __decorate([
            enhancer
        ], Personal);
        return Personal;
    }());
    var p = new Personal();
    console.log(p.name);
})(a || (a = {}));
var b;
(function (b) {
    function enhancer(name) {
        return function enhancer(target) {
            target.prototype.name = name;
            target.prototype.eat = function () {
                console.log('eat');
            };
        };
    }
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person = __decorate([
            enhancer('hank')
        ], Person);
        return Person;
    }());
    var p = new Person();
    console.log(p.name);
    p.eat();
})(b || (b = {}));
var c;
(function (c) {
    function enhancer(target) {
        return /** @class */ (function () {
            function class_1() {
                this.name = 'hank';
            }
            class_1.prototype.eat = function () {
                console.log('吃饭饭');
            };
            return class_1;
        }());
    }
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person = __decorate([
            enhancer
        ], Person);
        return Person;
    }());
    var p = new Person();
    console.log(p.name);
    p.eat();
})(c || (c = {}));
// 属性装饰器
var d;
(function (d) {
    function toUpperCase(target, propertyKey) {
        // console.log(desc, 'desc')
        var value = target[propertyKey];
        var getter = function () {
            return value;
        };
        // 用来替换的setter
        var setter = function (newVal) {
            value = newVal.toUpperCase();
        };
        // 替换属性，先删除原先的属性，再重新定义属性
        if (delete target[propertyKey]) {
            Object.defineProperty(target, propertyKey, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            });
        }
    }
    function noEnumerable(target, property, descriptor) {
        console.log('target.getName', target.getName);
        console.log('target.getAge', target.getAge);
        descriptor.enumerable = true;
    }
    var Test = /** @class */ (function () {
        function Test() {
            this.name = 'hank';
        }
        Test.prototype.getName = function () {
            console.log(this.name);
        };
        __decorate([
            toUpperCase
        ], Test.prototype, "name");
        __decorate([
            noEnumerable
        ], Test.prototype, "getName");
        return Test;
    }());
    console.log(new Test().name);
})(d || (d = {}));
