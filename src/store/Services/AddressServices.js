import API from "./API";

export const listAddressesService = async () => {
  try {
    const addresses = await API.get("/address");
    return addresses.data;
  } catch (error) {
    throw error.response;
  }
};

export const AddressService = async (uuid) => {
  try {
    const address = await API.get(`/address/${uuid}`);
    return address.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createAddressService = async (addressData) => {
  try {
    const createdAddress = await API.post("/address", addressData);
    return createdAddress;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateAddressService = async (data, uuid) => {
  try {
    const address = await API.put(`/address/${uuid}`, {
      country: data.country,
      city: data.city,
      street: data.street,
      postalCode: data.postalCode,
    });
    return address;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteAddressService = async (uuid) => {
  try {
    const address = await API.delete(`/address/${uuid}`);
    return address;
  } catch (error) {
    throw error.response.data;
  }
};
