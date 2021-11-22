import _cloneDeep from "lodash/cloneDeep";

export const calculateCols = (windowDimensions, cols) => {
  const { innerWidth } = windowDimensions;
  let value = _cloneDeep(cols);

  if (innerWidth > 0 && innerWidth < 600) value = cols / 3.3;
  else if (innerWidth > 600 && innerWidth < 960) value = cols / 2.2;
  else if (innerWidth > 960 && innerWidth < 1280) value = cols / 1.1;
  return value;
};
