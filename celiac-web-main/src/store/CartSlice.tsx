// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Item {
//   donation_id: string;
//   amount: number;
// }

// interface CartState {

//   items: Item[];

// }

// const initialState: CartState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,


//   reducers: {
//     addItem(state, action: PayloadAction<Item>) {
//       const newItem = action.payload;//@ts-ignore
//       const existingItem = state.items.find(item => item.id === newItem.id);
//       if (existingItem) {
//         existingItem.amount++;
//       } else {

//         // state.items.push({ donation_id, amount: 1 });
//       }
//     },
//     removeItem(state, action: PayloadAction<string>) {
//       const idToRemove = action.payload;//@ts-ignore
//       state.items = state.items.filter(item => item.id !== idToRemove);
//     },



//     updateItemQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
//       const { id, quantity } = action.payload;//@ts-ignore
//       const itemToUpdate = state.items.find(item => item.id === id);
//       if (itemToUpdate) {//@ts-ignore
//         itemToUpdate.quantity = quantity;
//       }
//     },
//   },
// });

// export const { addItem, removeItem, updateItemQuantity } = cartSlice.actions;

// export default cartSlice.reducer;
