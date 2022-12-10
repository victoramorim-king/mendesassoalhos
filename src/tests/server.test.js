const server = require('../server');

test("Test subtotal function with just one value", () =>{
  expect(server("R$ 123,45")).toBe("R$ 123,45")
})

test("Test subtotal function with an array of values", () =>{
  expect(server(["R$ 123,45", "R$ 678,90"])).toBe("R$ 802,35")
})
