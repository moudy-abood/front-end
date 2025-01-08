import API from "./API";

export const createCartService = async () => {
  try {
    const cart = await API.post("/cart");
    return cart;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCartService = async () => {
  try {
    const cart = await API.get(`/cart`);
    return cart.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
