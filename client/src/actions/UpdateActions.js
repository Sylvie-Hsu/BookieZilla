export const updateId = id => {
  return {
    type: "UPDATE_ID",
    id: id
  };
};

export const updateToken = token => {
  return {
    type: "UPDATE_TOKEN",
    token: token
  };
};
