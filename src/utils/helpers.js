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

export const errorHandler = (error, data) => {
  return {
    email: {
      typo: error?.includes("email") ? error : "",
      alreadyUsed: error === undefined ? "email already in use" : "",
    },
    password: error?.includes("password") ? error : "",
    reEnteredPassword:
      data?.password === data?.reEnteredPassword
        ? ""
        : "Password does not match",
    name: error?.includes("name") ? error : "",
    phoneNumber: error?.includes("phoneNumber") ? error : "",
    loginEmail: error?.includes("email") ? error : "",
    loginPassword: error?.includes("password") ? error : "",
    failedLogin: data ? "Wrong email or password" : "",
  };
};
