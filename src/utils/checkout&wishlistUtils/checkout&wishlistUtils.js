export const getItemsIds = (items) => items.map((elem) => elem.id);

export const getIsAllChecked = (itemsList) => itemsList.every((elem) => elem.isChecked);

export const getIsCheckedIds = (itemsList) => itemsList.reduce((acc, curr) => {
  if (curr.isChecked) acc.push(curr.id);
  return acc;
}, []);

export const getSelectedItemsCount = (itemsList) => itemsList.reduce((acc, curr) => {
  if (curr.isChecked) return acc + curr.count;
  return acc;
}, 0);

export const getTotal = (itemsList, selected) => {
  let selectedItems = itemsList;
  if (selected) {
    selectedItems = itemsList.filter((item) => item.isChecked);
  }
  // console.log({ selectedItems });

  return selectedItems.reduce((acc, curr) => {
    // console.log(acc.totalPrice, acc.totalDiscount, acc.totalPriceDiscounted);
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

export const combineItemParams = (fetchedList, additionalParamsList) => fetchedList.map((item) => (
  {
    ...item,
    ...additionalParamsList.find((elem) => elem.id === item.id),
  }
));
