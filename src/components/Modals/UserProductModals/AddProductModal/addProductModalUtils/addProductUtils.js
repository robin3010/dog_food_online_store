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
    available: true,
  };

  Object.keys(validData).forEach((key) => {
    if (!validData[key]) {
      delete validData[key];
    }
  });

  return validData;
};
