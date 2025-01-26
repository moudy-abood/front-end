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
  return token ? true : false;
};
