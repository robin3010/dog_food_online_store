import { useEffect, useState } from 'react';

export const useDebounce = (value, ms = 350) => {
  const [debouncedVal, setDebouncedVal] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedVal(value);
    }, ms);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, ms]);

  return debouncedVal;
};
