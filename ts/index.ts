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
    // console.log(desc, 'desc')
    let value = target[propertyKey]

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
  function noEnumerable(
    target: any,
    property: string,
    descriptor: PropertyDescriptor
  ) {
    console.log(descriptor, 'descriptor')

    // console.log('target.getName', target.getName)
    console.log('target.getAge', target.getAge)
    // descriptor.enumerable = true
  }
  class Test {
    @toUpperCase
    public name: String = 'hank'
    constructor() {}
    @noEnumerable
    getName() {
      console.log(this.name)
    }
  }
  console.log(new Test().name)
  console.log(new Test().getName())
}

namespace e {
  interface Person {
    age: number
  }
  function addAge(target: any, methodName: string, paramsIndex: number) {
    console.log(target)
    console.log(methodName)
    console.log(paramsIndex)
    target.age = 10
  }
  class Person {
    login(username: string, @addAge password: string) {
      console.log(this.age, username, password)
    }
  }
  let p = new Person()
  p.login('zhufeng', '123456')
}

namespace f {
  interface A {
    name: string
    [propName: string]: any
  }
  interface B {
    speak: string
  }
  interface C extends B, A {
    hello: string
  }
  class Person implements C {
    name: string = ''
    speak: string = ''
    hello: string = ''
  }
  class Person2 extends Person {
    name: string = ''
    speak: string = ''
    hello: string = ''
  }
}
interface Bird {
  name: string
  fly(): void
}
interface Person {
  name: string
  talk(): void
}

// 联合类型
type m = Bird | Person

//交叉类型
type n = Bird & Person

// keyof 索引类型查询操作符
interface Person {
  name: string
  age: number
  gender: 'male' | 'female'
}
//type PersonKey = 'name'|'age'|'gender';
type PersonKey = keyof Person
