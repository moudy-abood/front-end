import API from "./API";

export const createOrderService = async (data) => {
  try {
    const order = await API.post("/order", data);
    return order;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getOrdersService = async () => {
  try {
    const orders = await API.get("/order");
    return orders.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateOrderService = async (uuid, updateField) => {
  try {
    const order = await API.put(`/order/${uuid}/${updateField}`);
    return order;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteOrderService = async (uuid) => {
  try {
    const order = await API.delete(`/order/${uuid}`);
    return order;
  } catch (error) {
    return Promise.reject(error);
  }
};
