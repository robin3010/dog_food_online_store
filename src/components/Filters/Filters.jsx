import { useSelector } from 'react-redux';
import { memo } from 'react';
import { getFiltersSelector } from '../../redux/slices/filtersSlice';
import { Search } from './Search';
import { TagFilterButton } from './TagFilterButton/TagFilterButton';

export const Filters = memo(() => {
  console.log('Render Filters');

  const { tagsCollection } = useSelector(getFiltersSelector);

  return (
    <div className="card mb-4">
      <div className="d-flex flex-wrap gap-2 p-3">
        <Search />
        {tagsCollection.map((tag) => (
          <TagFilterButton key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
});
