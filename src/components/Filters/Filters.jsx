import { useSelector } from 'react-redux';
import { memo } from 'react';
import { getTagsCollectionSelector } from '../../redux/slices/filtersSlice';
import { Search } from './Search';
import { TagFilterButton } from './TagFilterButton/TagFilterButton';
import { conditionsSet } from './ConditionFilterButton/conditionsSet';
import { ConditionFilterButton } from './ConditionFilterButton/ConditionFilterButton';

export const Filters = memo(() => {
  console.log('Render Filters');

  const tagsCollection = useSelector(getTagsCollectionSelector);

  return (
    <div className="card mb-4">
      <div className="d-flex flex-wrap gap-2 p-3">
        <Search />
        {tagsCollection.map((tag) => (
          <TagFilterButton key={tag} tag={tag} />
        ))}
      </div>
      <div className="px-3 pb-2">
        <span className="text-muted">Сортировать:</span>
        {Object.keys(conditionsSet).map((k) => (
          <ConditionFilterButton
            key={k}
            conditionKey={k}
            conditionValue={conditionsSet[k]}
          />
        ))}
      </div>
    </div>
  );
});
