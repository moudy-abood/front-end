import API from "./API";

export const createItemService = async (data,cartUuid) => {
  try {
    const item = await API.post(`/cart/${cartUuid}/item`, data);
    return item;
  } catch (error) {
    Promise.reject(error);
  }
};

export const updateItemService = async (data, cartUuid) => {
  try {
    const item = await API.put(
      `/cart/${cartUuid}/item/${data.uuid}`,
      { quantity: data.quantity }
    );
    return item;
  } catch (error) {
    Promise.reject(error);
  }
};

export const deleteItemService = async (uuid, cartUuid) => {
  try {
    const item = await API.delete(`/cart/${cartUuid}/item/${uuid}`);
    return item;
  } catch (error) {
    Promise.reject(error);
  }
};
