import { createSlice } from '@reduxjs/toolkit';
import { productParams } from '../../utils/constants';
import { calcCondition, formatGoodsList } from '../../utils/utils';
import { initState } from '../initState';

export const goodsSlice = createSlice({
  name: 'goods',
  initialState: initState.goods,
  reducers: {
    setGoodsList: {
      reducer(state, action) {
        state.list = action.payload;
      },
      prepare(goods) {
        return {
          payload: formatGoodsList(goods),
        };
      },
    },
    resetLastSort(state) {
      state.lastSort = '';
    },
    sortGoodsList(state, action) {
      const { lastSort } = state;

      const sortFunction = (cond) => {
        const currentSort = cond;
        if (lastSort !== currentSort) {
          console.log('first sort');
          state.list.sort((a, b) => calcCondition(b, cond) - calcCondition(a, cond));
        }
        if (currentSort === productParams.price && currentSort === lastSort) {
          console.log('price reverse');
          state.list.reverse();
        }
        console.log('lastSort changing');
        state.lastSort = currentSort;
      };
      sortFunction(action.payload);
    },
  },
});

export const { setGoodsList, resetLastSort, sortGoodsList } = goodsSlice.actions;

// export const getGoodsSelector = (state) => state.goods;
export const getGoodsListSelector = (state) => state.goods.list;
export const getLastSortSelector = (state) => state.goods.lastSort;

export const goodsReducer = goodsSlice.reducer;
