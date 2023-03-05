import { userProductFormInitValues } from '../formsConstants';

export const getFormInitialValues = (values) => {
  if (!values) return userProductFormInitValues;

  const preFill = Object.keys(userProductFormInitValues).reduce((acc, curr) => {
    if (Object.keys(values).includes(curr)) {
      acc[curr] = values[curr];
    }
    return acc;
  }, {});

  const preFillFormated = {
    ...preFill,
    wight: preFill.wight.replace(/\D*/g, ''),
    tags: preFill.tags.join(', '),
  };
  return preFillFormated;
};
