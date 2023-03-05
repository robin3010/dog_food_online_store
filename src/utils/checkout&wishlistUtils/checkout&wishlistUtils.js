export const getItemsIds = (items) => items.map((elem) => elem.id);

export const getIsAllChecked = (itemsList) => {
  const existingItems = itemsList.filter((elem) => !elem.err);
  console.log({ existingItems }, !existingItems.length);

  if (!existingItems.length) {
    return false;
  }
  return existingItems.every((elem) => elem.isChecked);
};

export const getIsCheckedIds = (itemsList) => itemsList.reduce((acc, curr) => {
  if (curr.isChecked) acc.push(curr.id);
  return acc;
}, []);

export const getSelectedItemsCount = (itemsList) => itemsList.reduce((acc, curr) => {
  if (curr.isChecked) return acc + curr.count;
  return acc;
}, 0);

export const getTotal = (itemsList, selected) => {
  const existingItems = itemsList.filter((elem) => !elem.err);

  const selectedItems = selected ? existingItems.filter((item) => item.isChecked) : existingItems;

  return selectedItems.reduce((acc, curr) => {
    const totalPrice = acc.totalPrice || 0;
    const totalDiscount = acc.totalDiscount || 0;
    const totalPriceDiscounted = acc.totalPriceDiscounted || 0;
    const ItemCount = curr.count ?? 1;
    const itemTotal = curr.price * ItemCount;
    const itemDiscount = Math.round(!!curr.discount && itemTotal / curr.discount);

    return {
      ...acc,
      totalPrice: totalPrice + itemTotal,
      totalDiscount: totalDiscount + itemDiscount,
      totalPriceDiscounted: totalPriceDiscounted + (itemTotal - itemDiscount),
    };
  }, {});
};

export const combineItemParams = (fetchedList, additionalParamsList) => fetchedList.map((item) => {
  if (item.err) {
    return item;
  }
  return {
    ...item,
    ...additionalParamsList.find((elem) => elem.id === item.id),
  };
});
