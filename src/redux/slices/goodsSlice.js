import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';

export const goodsSlice = createSlice({
  name: 'goods',
  initialState: initState.goods,
  reducers: {
    setGoodsList(state, action) {
      state.list = action.payload;
    },
  },
});

export const {
  setGoodsList,
} = goodsSlice.actions;

export const getGoodsSelector = (state) => state.goods;

export const goodsReducer = goodsSlice.reducer;
