export const withoutProperty = (fullUserData, property) => {
  const { [property]: unused, ...rest } = fullUserData;

  return rest;
};

export const renameIdKey = ({ _id: id, ...rest }) => ({
  id,
  ...rest,
});
