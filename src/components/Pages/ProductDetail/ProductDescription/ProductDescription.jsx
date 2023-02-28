import { useOutletContext } from 'react-router-dom';

export function ProductDescription() {
  const description = useOutletContext();

  return (
    <p className="py-3 px-4">{description}</p>
  );
}
