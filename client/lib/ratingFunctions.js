

export const recommendedPercentage = (recommended) => {
  if (!recommended.true || !recommended.false) {
    return '0%';
  }
  let t = parseInt(recommended.true);
  let f = parseInt(recommended.false);
  if (t + f === 0) {
    return '0%';
  }
  return Math.floor(100 * t / (t + f)) + '%';
};

export const ratingPercentages = (ratings) => {
  let max = 0;
  let out = [];
  [5, 4, 3, 2, 1].forEach(x => {
    let val = ratings[x] ? parseInt(ratings[x]) : 0;
    max = val > max ? val : max;
    out.push(val);
  });
  if (max === 0) {
    return out;
  }
  return out.map(x => Math.floor(100 * x / max));
};

export const totalRating = (ratings) => {
  let total = 0;
  let count = 0;
  [5, 4, 3, 2, 1].forEach(x => {
    let val = ratings[x] ? parseInt(ratings[x]) : 0;
    count += val;
    total += val * x;
  });
  if (count === 0) {
    return 0;
  }
  return Math.floor(4 * total / count) / 4;
};