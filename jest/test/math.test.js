const math = require("../math");
describe("测试math函数", () => {
  it("测试math.add", () => {
    // 这里的断言实际上和chai的expect是很像的
    expect(math.add(1, 3)).toBe(4);
  });
  it("测试math.mins", () => {
    // 这里的断言实际上和chai的expect是很像的
    expect(math.mins(1, 3)).toBe(-2);
  });
});
