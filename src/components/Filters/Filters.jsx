import { useSelector } from 'react-redux';
import { getTagsCollectionSelector } from '../../redux/slices/filtersSlice';
import { Search } from './Search/Search';
import { TagFilterButton } from './TagFilterButton/TagFilterButton';
import { conditionsSet } from './ConditionFilterButton/conditionsSet';
import { ConditionFilterButton } from './ConditionFilterButton/ConditionFilterButton';

export function Filters() {
  const tagsCollection = useSelector(getTagsCollectionSelector);

  return (
    <div className="card mb-4">
      <div className="row row-cols-auto align-items-center g-2 p-3">
        <Search />
        {tagsCollection.map((tag) => (
          <TagFilterButton key={tag} tag={tag} />
        ))}
      </div>
      <div className="d-flex flex-wrap gap-3 row-gap-1 align-items-center px-3 pb-2">
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
}
