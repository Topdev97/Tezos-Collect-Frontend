export const getSignedRandomValue = (range: number = 50) => {
  return Math.random() * range - range / 2;
};
export const getUnsignedRandomValue = (range: number = 50) => {
  return Math.random() * range;
};
