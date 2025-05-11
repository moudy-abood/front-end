export const filtersHelper = (op, key, value, page = 1) => {
  return {
    filterParameters: [
      {
        op,
        key,
        value,
      },
    ],
    page,
  };
};

export const optionsHelper = (searchParams) => {
  return {
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    page: searchParams.get("page") || 1,
  };
};

export const checkToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const authErrorHandler = (error, data) => {
  return {
    email: {
      typo: error?.includes("email") ? error : "",
      alreadyUsed: error? "email already in use" : "",
    },
    password: error?.includes("password") ? error : "",
    reEnteredPassword:
      (data?.password || data?.newPassword) === data?.reEnteredPassword
        ? ""
        : "Password does not match",
    name: error?.includes("name") ? error : "",
    phoneNumber: error?.includes("phoneNumber") ? error : "",
    loginEmail: error?.includes("email") ? error : "",
    loginPassword: error?.includes("password") ? error : "",
    failedLogin: data ? "Wrong email or password" : "",
    newPassword: error?.includes("newPassword") ? error : "",
    oldPassword: {
      typo: error?.includes("oldPassword") ? error : "",
      wrongPassword: error?.includes("wrong password") ? error : "",
    },
  };
};

export const addressErrorHandler = (error) => {
  return {
    country: error?.includes("country") ? error : "",
    city: error?.includes("city") ? error : "",
    street: error?.includes("street") ? error : "",
    postalCode: error?.includes("postalCode") ? error : "",
    tempCountry: error?.includes('tempAddress')? error:""
  };
};
