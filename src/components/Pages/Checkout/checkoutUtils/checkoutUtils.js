export const getCheckoutIds = (checkout) => checkout.map((elem) => elem.id);

export const getIsAllChecked = (checkoutList) => checkoutList.every((elem) => elem.isChecked);

export const getIsCheckedIds = (checkoutList) => checkoutList.reduce((acc, curr) => {
  if (curr.isChecked) acc.push(curr.id);
  return acc;
}, []);

export const getSelectedItemsCount = (checkoutList) => checkoutList.reduce((acc, curr) => {
  if (curr.isChecked) return acc + curr.count;
  return acc;
}, 0);

export const getTotal = (checkoutList) => {
  const selectedItems = checkoutList.filter((item) => item.isChecked);
  // console.log(selectedItems);

  return selectedItems.reduce((acc, curr) => {
    // console.log(acc.totalPrice, acc.totalDiscount, acc.totalPriceDiscounted);
    const totalPrice = acc.totalPrice || 0;
    const totalDiscount = acc.totalDiscount || 0;
    const totalPriceDiscounted = acc.totalPriceDiscounted || 0;
    const itemTotal = curr.price * curr.count;
    const itemDiscount = Math.round(!!curr.discount && itemTotal / curr.discount);

    return {
      ...acc,
      totalPrice: totalPrice + itemTotal,
      totalDiscount: totalDiscount + itemDiscount,
      totalPriceDiscounted: totalPriceDiscounted + (itemTotal - itemDiscount),
    };
  }, {});
};

export const addCheckoutItemParams = (fetchedList, checkout) => fetchedList.map((item) => (
  {
    ...item,
    ...checkout.find((elem) => elem.id === item.id),
  }
));
