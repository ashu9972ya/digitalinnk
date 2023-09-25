import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
  
    increaseQuantity: (state, action) => {
      const itemIdToIncrease = action.payload.id;
      const existingItem = state.items.find(
        (item) => item.id === itemIdToIncrease
      );

      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    
    decreaseQuantity: (state, action) => {
      const itemIdToDecrease = action.payload.id;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === itemIdToDecrease
      );

      if (existingItemIndex !== -1) {
        if (state.items[existingItemIndex].quantity > 1) {
          state.items[existingItemIndex].quantity -= 1;
        } else {
          // Remove the item from the basket when quantity reaches 0
          state.items.splice(existingItemIndex, 1);
        }
      }
    },
  },
});

export const {
  addToBasket,
  increaseQuantity,
  decreaseQuantity,
} = basketSlice.actions;

export default basketSlice.reducer;
