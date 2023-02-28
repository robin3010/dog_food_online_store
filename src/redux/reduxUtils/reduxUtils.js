export const withoutProperty = (fullUserData, property) => {
  const { [property]: unused, ...rest } = fullUserData;

  return rest;
};
