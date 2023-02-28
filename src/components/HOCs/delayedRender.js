import { useEffect, useState } from 'react';

export const delayedRender = (WrappedComponent) => function delayedRenderFunc({ delay, ...rest }) {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsShown(true);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [delay]);

  return isShown ? <WrappedComponent {...rest} /> : null;
};
