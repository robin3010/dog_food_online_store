import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: initState.wishlist,
  reducers: {
    addToWishlist(state, action) {
      const itemIndex = state.findIndex((item) => item === action.payload);
      if (itemIndex === -1) {
        return [
          ...state,
          {
            id: action.payload,
            isChecked: false,
          },
        ];
      }
      return state;
    },
    removeFromWishlist(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    removeSelectedFromWishlist(state, action) {
      return state.filter((item) => action.payload.every((id) => id !== item.id));
    },
    clearWishlist() {
      return [];
    },
    changeIsCheckedState(state, action) {
      const currentItem = state.find((item) => item.id === action.payload);

      if (currentItem) {
        currentItem.isChecked = !currentItem.isChecked;
      }
    },
    changeAllIsCheckedState(state, action) {
      return state.map((item) => ({
        ...item,
        isChecked: action.payload,
      }));
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  removeSelectedFromWishlist,
  clearWishlist,
  changeIsCheckedState,
  changeAllIsCheckedState,
} = wishlistSlice.actions;

export const getWishlistSelector = (state) => state.wishlist;

export const wishlistReducer = wishlistSlice.reducer;
