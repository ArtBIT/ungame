import Vector2 from './Vector2';

describe(`Vector2`, () => {
  it(`should normalize correctly`, () => {
    expect(new Vector2(10, 10).normalize().magnitude()).toBeCloseTo(1);
  });
});
