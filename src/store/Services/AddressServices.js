import API from "./API";

export const listUserAddressesService = async () => {
  try {
    const addresses = await API.get("/address");
    return addresses.data;
  } catch (error) {
    Promise.reject(error);
  }
};

export const createAddressService = async (addressData) => {
  try {
    const createdAddress = await API.post("/address", addressData);
    return createdAddress;
  } catch (error) {
    Promise.reject(error);
  }
};

export const updateAddressService = async (data) => {
  try {
    const address = await API.put(`/address/${data.uuid}`, {
      country: data.country,
      city: data.city,
      street: data.street,
      postalCode: data.postalCode,
    });
    return address;
  } catch (error) {
    Promise.reject(error);
  }
};

export const deleteAddressService = async (uuid) => {
  try {
    const address = await API.delete(`/address/${uuid}`);
    return address;
  } catch (error) {
    Promise.reject(error);
  }
};
