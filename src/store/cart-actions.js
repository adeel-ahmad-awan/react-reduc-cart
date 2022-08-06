import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    // function to get data from server
    const fetchData = async () => {
      let endpoint = process.env.REACT_APP_FIREBASE_URL + "cart.json";
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(response.message);
      }

      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      console.log({ cartData });
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      // dispatch error notification if we got an error
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
