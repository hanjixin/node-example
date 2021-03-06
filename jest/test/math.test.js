const math = require("../math");
let value = 3;
describe("测试math函数", () => {
  it("测试math.add", () => {
    // 这里的断言实际上和chai的expect是很像的
    expect(math.add(1, 3)).toBe(4);
  });
  it("测试math.mins", () => {
    // 这里的断言实际上和chai的expect是很像的
    expect(math.mins(1, 3)).toBe(-2);
  });

//   expect({ a: 1 }).toBe({ a: 1 }); //判断两个对象是否相等
//   expect(1).not.toBe(2); //判断不等
//   expect(n).toBeNull(); //判断是否为null
//   expect(n).toBeUndefined(); //判断是否为undefined
//   expect(n).toBeDefined(); //判断结果与toBeUndefined相反
//   expect(n).toBeTruthy(); //判断结果为true
//   expect(n).toBeFalsy(); //判断结果为false
//   expect(value).toBeGreaterThan(3); //大于3
//   expect(value).toBeGreaterThanOrEqual(3.5); //大于等于3.5
//   expect(value).toBeLessThan(5); //小于5
//   expect(value).toBeLessThanOrEqual(4.5); //小于等于4.5
//   expect(value).toBeCloseTo(0.3); // 浮点数判断相等
//   expect("Christoph").toMatch(/stop/); //正则表达式判断
//   expect(["one", "two"]).toContain("one"); //不解释

//   function compileAndroidCode() {
//     throw new ConfigError("you are using the wrong JDK");
//   }

//   test("compiling android goes as expected", () => {
//     expect(compileAndroidCode).toThrow();
//     expect(compileAndroidCode).toThrow(ConfigError); //判断抛出异常
//   });
});
