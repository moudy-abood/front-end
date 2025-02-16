import API from "./API";
import { filtersHelper } from "../../utils/helpers";

export const createProductsService = async (data) => {
  try {
    const products = await API.post("/product", data);
    return products;
  } catch (error) {
    return Promise.reject(error);
  }
};

// keeping this func to prevent crashes, will be deleted later
export const getProductsService = async (page) => {
  try {
    const products = await API.get(`/product?page=${page || 1}`);
    return products.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllProductsService = async ({ search, page }) => {
  const filters = search
    ? filtersHelper("like", "title", `%${search}%`, page)
    : null;
  try {
    const products = await API.get("/product/", { params: filters });
    return products.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCategoryProducts = async ({ category, page }) => {
  const filters = filtersHelper("eq", "category", category, page);
  try {
    const products = await API.get("/product/", { params: filters });
    return products.data;
  } catch (error) {
    return Promise.reject(error);
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
    return Promise.reject(error);
  }
};

export const deleteProductService = async (data) => {
  try {
    const product = await API.delete(`/product/${data.uuid}`);
    return product;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCategories = async () => {
  try {
    const categories = await API.get(`/product/categories`);
    return categories.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
