export const formatNewProductData = (values) => {
  const validData = {
    ...values,
    wight: /\d+\s*$/.test(values.wight)
      ? `${values.wight.trim()} г`
      : values.wight,
    stock: +values.stock,
    price: +values.price,
    discount: +values.discount,
    tags: values.tags.trim().replace(/\s+|,$/g, '').split(','),
    available: values.available,
  };

  Object.keys(validData).forEach((key) => {
    if (validData[key] === undefined) {
      delete validData[key];
    }
    if (validData.pictures === '') {
      delete validData.pictures;
    }
  });

  return validData;
};
