import { createSlice } from '@reduxjs/toolkit';
import { getTagsHash } from '../../components/Filters/filterUtils/filterUtils';
import { initState } from '../initState';

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: initState.filters,
  reducers: {
    setSearchFilter(state, action) {
      state.search = action.payload;
    },
    setTagsFilter(state, action) {
      const isExist = state.tagsSelected.includes(action.payload);

      if (isExist) state.tagsSelected = state.tagsSelected.filter((tag) => tag !== action.payload);
      if (!isExist) state.tagsSelected.push(action.payload);
    },
    setTagsCollection(state, action) {
      if (!action.payload) {
        state.tagsCollection = [];
      }
      const tagsHash = getTagsHash(action.payload);
      state.tagsCollection = tagsHash;
    },
  },
});

export const { setSearchFilter, setTagsFilter, setTagsCollection } = filtersSlice.actions;

export const getFiltersSelector = (state) => state.filters;

export const filtersReducer = filtersSlice.reducer;
