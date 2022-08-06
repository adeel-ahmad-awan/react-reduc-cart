import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const initialState = {
  items: [],
  totalQuantity: 0,
};

/**
 * cartSlice
 */
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity = state.totalQuantity + 1;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity = existingItem.quantity + 1;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemToCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity = state.totalQuantity - 1;

      if (existingItem.quantity > 1) {
        existingItem.quantity = existingItem.quantity - 1;
        // existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      } else {
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
  },
});

/**
 *
 * @param {*} cart
 * @returns
 */
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        state: "pending",
        title: "Sending...",
        message: "Sending cart data...",
      })
    );

    const sendRequest = async () => {
      let endpoint = process.env.REACT_APP_FIREBASE_URL + "cart.json";
      const response = await fetch(endpoint, {
        method: "PUT",
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error(response.message);
      }

      const responseData = await response.json();
    };

    try {
      await sendRequest();
      // dispatch success if we successfully send the request
      dispatch(
        uiActions.showNotification({
          state: "success",
          title: "success...",
          message: "Send cart data successfuly!",
        })
      );
    } catch (error) {
      // dispatch error if we got an error
      dispatch(
        uiActions.showNotification({
          state: "error",
          title: "Error...",
          message: error.message,
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice;
