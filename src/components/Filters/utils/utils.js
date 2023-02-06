export const getFilteredByTags = (goods, tags) => {
  if (tags) {
    return goods.reduce((acc, current) => {
      if (tags.every((el) => current.tags.includes(el))) return [...acc, current];
      return acc;
    }, []);
  }
  return goods;
};

export const getTagsHash = (goods) => {
  const hash = [];
  goods.forEach((el) => {
    el.tags.forEach((tag) => {
      const isExist = hash.includes(tag);
      if (!isExist) {
        hash.push(tag);
      }
    });
  });
  return hash;
};
