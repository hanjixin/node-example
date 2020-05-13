// 类装饰器
namespace a {
  interface Personal {
    name: String
    hello: any
  }
  function enhancer(target: any) {
    target.prototype.name = 'hank'
    target.prototype.hello = '你好'
  }

  @enhancer
  class Personal {
    constructor() {}
  }
  let p: Personal = new Personal()
  console.log(p.name)
}

namespace b {
  interface Person {
    name: string
    eat: any
  }
  function enhancer(name: string) {
    return function enhancer(target: any) {
      target.prototype.name = name
      target.prototype.eat = function () {
        console.log('eat')
      }
    }
  }

  @enhancer('hank')
  class Person {
    constructor() {}
  }
  let p: Person = new Person()
  console.log(p.name)
  p.eat()
}

namespace c {
  interface Person {
    name: string
    eat: any
  }
  function enhancer(target: any) {
    return class {
      name: string = 'hank'
      eat() {
        console.log('吃饭饭')
      }
    }
  }
  @enhancer
  class Person {
    constructor() {}
  }
  let p: Person = new Person()
  console.log(p.name)
  p.eat()
}

// 属性装饰器
namespace d {
  function toUpperCase(target: any, propertyKey: string) {
    let value = target[propertyKey];

    const getter = function () {
      return value
    }
    // 用来替换的setter
    const setter = function (newVal: string) {
      value = newVal.toUpperCase()
    }
    // 替换属性，先删除原先的属性，再重新定义属性
    if (delete target[propertyKey]) {
      Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
      })
    }
  }
  class Test {
      @toUpperCase
      public name: String = 'hank'
  }
  console.log(new Test().name)
}
