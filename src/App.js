import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let isInitial = true;

/**
 *
 * @returns
 */
function App() {
  const dispatch = useDispatch();

  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    let endpoint = process.env.REACT_APP_FIREBASE_URL + "cart.json";

    if (isInitial) {
      isInitial = false;
      return;
    }

    const sendRequest = async () => {
      dispatch(
        uiActions.showNotification({
          state: "pending",
          title: "Sending...",
          message: "Sending cart data...",
        })
      );

      const response = await fetch(endpoint, {
        method: "PUT",
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error(response.message);
      }

      const responseData = await response.json();

      dispatch(
        uiActions.showNotification({
          state: "success",
          title: "success...",
          message: "Send cart data successfuly!",
        })
      );
    };

    sendRequest().catch((error) => {
      dispatch(
        uiActions.showNotification({
          state: "error",
          title: "Error...",
          message: error.message,
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
