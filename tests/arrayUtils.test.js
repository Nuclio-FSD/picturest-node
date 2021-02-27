const { removeElementFromArray } = require('../src/utils/arrayUtils');

describe('Test Array Utils', () => {
  it('It should remove the element in the array', () => {
    const result = removeElementFromArray("hola", ["chau", "hola"]);
    
    expect(result.length).toBe(1);
    expect(result[0]).toBe("chau");
  });

  it('It should remove the element in the array', () => {
    const result = removeElementFromArray("hola", ["chau", "hola"]);
    
    expect(result.length).toBe(1);
    expect(result[0]).toBe("chau");
  });

  it('It should do nothing if the array is empty', () => {
    const result = removeElementFromArray("hola", []);
    
    expect(result.length).toBe(0);
  });

  it('It should remove the element in the array even if it is repeated', () => {
    const result = removeElementFromArray("hola", ["chau", "hola", "hola"]);
    
    expect(result.length).toBe(1);
    expect(result[0]).toBe("chau");
  });
});