import Vector3 from './Vector3';

describe(`Vector3`, () => {
  it(`should normalize correctly`, () => {
    expect(new Vector3(10, 10, 10).normalize().magnitude()).toBeCloseTo(1);
  });
});
