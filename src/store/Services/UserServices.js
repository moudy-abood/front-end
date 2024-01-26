import API from "./API";

export const getProfileService = async () => {
  try {
    const profile = await API.get("/user");
    return profile.data;
  } catch (error) {
    Promise.reject(error);
  }
};

export const updateUserService = async (data) => {
  try {
    const user = await API.put("/user", {
      email: data.email,
      password: data.password,
      name: data.name,
      phoneNumber: data.phoneNumber,
    });
    return user;
  } catch (error) {
    Promise.reject(error);
  }
};

export const deleteUserService = async (uuid) => {
  try {
    const user = await API.delete(`/user/${uuid}`);
    return user;
  } catch (error) {
    Promise.reject(error);
  }
};
