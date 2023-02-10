import { createSlice } from '@reduxjs/toolkit';
import { initState } from '../initState';

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: initState.checkout,
  reducers: {
    addItemToCart: {
      reducer(state, action) {
        const itemIndex = state.findIndex((item) => item.id === action.payload.id);
        if (itemIndex === -1) {
          state.push(action.payload);
        }
        // if (itemIndex !== -1) {
        //   state.splice(itemIndex, 1);
        // }
      },
      prepare(item) {
        return {
          payload: {
            id: item.id,
            count: 1,
            isChecked: false,
            quantity: item.stock,
          },
        };
      },
    },
    removeItemFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    itemCountIncrement(state, action) {
      const currentItem = state.find((item) => item.id === action.payload);

      if (currentItem && currentItem.count < currentItem.quantity) {
        currentItem.count += 1;
      }
    },
    itemCountDecrement(state, action) {
      const currentItem = state.find((item) => item.id === action.payload);

      if (currentItem?.count > 1) currentItem.count -= 1;
    },
    itemCountChange(state, action) {
      const currentItem = state.find((item) => item.id === action.payload.id);
      const newValue = action.payload.count;

      if (currentItem) {
        if (newValue < 1) currentItem.count = 1;
        if (newValue <= currentItem.quantity) currentItem.count = newValue;
        if (newValue >= currentItem.quantity) currentItem.count = currentItem.quantity;
      }
    },
    changeIsCheckedState(state, action) {
      const currentItem = state.find((item) => item.id === action.payload);

      if (currentItem) {
        currentItem.isChecked = !currentItem.isChecked;
      }
    },
    changeAllIsCheckedState(state, action) {
      state.map((...item) => ({
        ...item,
        isChecked: action.payload,
      }));
    },
    clearCart() {
      return [];
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  itemCountIncrement,
  itemCountDecrement,
  itemCountChange,
  changeIsCheckedState,
  changeAllIsCheckedState,
  clearCart,
} = checkoutSlice.actions;

export const getCheckoutSelector = (state) => state.checkout;

export const getCheckoutItemSelector = (id, state) => state.checkout.find((item) => item.id === id);

export const checkoutReducer = checkoutSlice.reducer;
