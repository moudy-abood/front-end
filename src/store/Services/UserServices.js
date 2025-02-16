import API from "./API";

export const getUserService = async () => {
  try {
    const profile = await API.get("/user");
    return profile.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const updateUserService = async (data) => {
  try {
    const user = await API.put("/user", {
      email:data.email,
      name: data.name,
      phoneNumber: data.phoneNumber,
    });
    return user;
  } catch (error) {
    throw  error.response?.data?.validation?.body?.message
  }
};

export const updateUserCredentialsService = async (data) => {
  try {
    await API.put("/user/credentials", {
      email: data.email,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
  } catch (error) {
    throw error.response?.data;
  }
};

export const deleteUserService = async (uuid) => {
  try {
    const user = await API.delete(`/user/${uuid}`);
    return user;
  } catch (error) {
    throw error.response?.data;
  }
};
