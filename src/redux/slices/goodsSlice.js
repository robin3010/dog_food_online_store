import { createSlice } from '@reduxjs/toolkit';
import {
  calcCondition,
  conditionsCollection,
} from '../../components/Filters/ConditionFilterButton/conditionsCollection';
import { initState } from '../initState';

export const goodsSlice = createSlice({
  name: 'goods',
  initialState: initState.goods,
  reducers: {
    setGoodsList(state, action) {
      state.list = action.payload;
    },
    resetLastSort(state) {
      state.lastSort = '';
    },
    sortGoodsList(state, action) {
      const { lastSort } = state;
      const condition = action.payload;

      const calc = conditionsCollection[calcCondition];

      const sortFunction = (cond) => {
        const currentSort = cond;
        if (lastSort !== currentSort) {
          console.log('first sort');
          state.list.sort((a, b) => calc(b, cond) - calc(a, cond));
        }
        if (currentSort === 'price' && currentSort === lastSort) {
          console.log('price reverse');
          state.list.reverse();
        }
        console.log('lastSort changing');
        state.lastSort = currentSort;
      };

      sortFunction(condition);
    },
  },
});

export const { setGoodsList, resetLastSort, sortGoodsList } = goodsSlice.actions;

export const getGoodsSelector = (state) => state.goods;

export const goodsReducer = goodsSlice.reducer;
