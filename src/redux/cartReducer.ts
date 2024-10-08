import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { produce } from 'immer';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) =>
      produce(state, draft => {
        const existingItem = draft.items.find(item => item.id === action.payload.id);
        if (existingItem) {
          existingItem.quantity += action.payload.quantity;
        } else {
          draft.items.push(action.payload);
        }
      }),
    removeFromCart: (state, action: PayloadAction<number>) =>
      produce(state, draft => {
        draft.items = draft.items.filter(item => item.id !== action.payload);
      }),
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
