import { createSlice } from '@reduxjs/toolkit';
import { getTagsHash } from '../../components/Filters/filterUtils/filterUtils';
import { initState } from '../initState';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: initState.filters,
  reducers: {
    setSearchFilter(state, action) {
      state.search = action.payload;
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

export const { setSearchFilter, setTagsCollection } = filtersSlice.actions;

export const getSearchFilterSelector = (state) => state.filters.search;
export const getTagsCollectionSelector = (state) => state.filters.tagsCollection;

export const filtersReducer = filtersSlice.reducer;
