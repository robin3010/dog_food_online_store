import { createSlice } from '@reduxjs/toolkit';
import { formatGoodsList, sortGoods } from '../../utils/utils';
import { initState } from '../initState';

const goodsSlice = createSlice({
  name: 'goods',
  initialState: initState.goods,
  reducers: {
    setGoodsList(_, action) {
      return formatGoodsList(action.payload);
    },
    sortGoodsList: {
      reducer(state, action) {
        console.log(action.payload);
        sortGoods(state, action.payload.condition, action.payload.type);
      },
      prepare({ condition, sortFilterName }) {
        return {
          payload: {
            condition,
            type: sortFilterName,
          },
        };
      },
    },
  },
});

export const { setGoodsList, sortGoodsList } = goodsSlice.actions;

export const getGoodsSelector = (state) => state.goods;

export const goodsReducer = goodsSlice.reducer;
