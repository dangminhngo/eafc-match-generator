export function getStars(stars = 0) {
  const full = Math.floor(stars);
  const half = stars - full === 0.5 ? 1 : 0;
  const none = 5 - full - half;
  return {
    full,
    half,
    none,
  };
}

export function randomArrElem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}
