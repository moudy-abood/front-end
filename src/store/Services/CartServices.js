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

export const createItemService = async (data, cartUuid) => {
  try {
    const item = await API.post(`/cart/${cartUuid}/item`, data);
    return item;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateItemService = async (itemUuid, newQuantity, cartUuid) => {
  try {
    const item = await API.put(`/cart/${cartUuid}/item/${itemUuid}`, {
      quantity: newQuantity,
    });
    return item;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteItemService = async (uuid, cartUuid) => {
  try {
    const item = await API.delete(`/cart/${cartUuid}/item/${uuid}`);
    return item;
  } catch (error) {
    return Promise.reject(error);
  }
};
