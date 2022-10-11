export const random = (): number => Math.random();
export const randomRange = (min: number, max: number) => random() * (max - min) + min;
export const randomInt = (min: number, max: number) => (random() * (max - min + 1) + min) | 0;

/* normal distribution */
export const randomDist = (min: number, max: number, iterations = 1) => {
  if (iterations > 0) {
    let total = 0;
    let i = iterations;
    while (i--) {
      total += randomRange(min, max);
    }
    return total / iterations;
  }
  return 0;
};
