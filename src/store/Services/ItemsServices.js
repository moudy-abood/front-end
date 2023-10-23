import API from "./API";

export const createItemService = async (data) => {
  try {
    const cartUuid = await API.get("/cart");
    const item = await API.post(`/cart/${cartUuid.data.uuid}/item`, data);
    return item;
  } catch (error) {
    Promise.reject(error);
  }
};

export const updateItemService = async (data) => {
  try {
    const cartUuid = await API.get("/cart");
    const item = await API.put(
      `/cart/${cartUuid.data.uuid}/item/${data.uuid}`,
      { quantity: data.quantity }
    );
    return item;
  } catch (error) {
    Promise.reject(error);
  }
};

export const deleteItemService = async (uuid) => {
  try {
    const cartUuid = await API.get("/cart");
    const item = await API.delete(`/cart/${cartUuid.data.uuid}/item/${uuid}`);
    return item;
  } catch (error) {
    Promise.reject(error);
  }
};
