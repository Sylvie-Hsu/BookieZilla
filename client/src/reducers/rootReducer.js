const initState = {
  id: 219547,
  token: null
};

const rootReducer = (state = initState, action) => {
  if (action.type === "UPDATE_ID") {
    return {
      ...state,
      id: action.id
    };
  }
  if (action.type === "UPDATE_TOKEN") {
    return {
      ...state,
      token: action.token
    };
  }
  return state;
};

export default rootReducer;
