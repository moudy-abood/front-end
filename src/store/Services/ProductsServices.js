import API from "./API";

export const createProductsService = async (data) => {
  try {
    const products = await API.post("/product", data);
    return products;
  } catch (error) {
    Promise.reject(error);
  }
};

export const getProductsService = async () => {
  try {
    const products = await API.get("/product");
    return products.data;
  } catch (error) {
    Promise.reject(error);
  }
};

export const updateProductService = async (data) => {
  try {
    const product = await API.put(`/product/${data.uuid}`, {
      category: data.category,
      title: data.title,
      description: data.description,
      price: data.price,
    });
    return product;
  } catch (error) {
    Promise.reject(error);
  }
};

export const deleteProductService = async (data) => {
  try {
    const product = await API.delete(`/product/${data.uuid}`);
    return product;
  } catch (error) {
    Promise.reject(error);
  }
};
