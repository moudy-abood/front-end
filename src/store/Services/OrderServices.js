import API from "./API";

export const createOrderService = async (data) => {
  try {
    const order = await API.post("/order", data);
    return order;
  } catch (error) {
    throw error.response.data;
  }
};

export const getOrdersService = async () => {
  try {
    const orders = await API.get("/order");
    return orders.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getOrderService = async (uuid) => {
  try {
    const order = await API.get(`order/${uuid}`);
    return order.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateOrderService = async (uuid, updateField) => {
  try {
    const order = await API.put(`/order/${uuid}/${updateField}`);
    return order;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteOrderService = async (uuid) => {
  try {
    const order = await API.delete(`/order/${uuid}`);
    return order;
  } catch (error) {
    throw error.response.data;
  }
};
