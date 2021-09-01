function isWithinRange(value, minVal, maxVal) {
  if (Number(value) === NaN) {
    return false;
  }
  if (minVal <= value && maxVal >= value) {
    return true;
  }
  return false;
}

export { isWithinRange };
