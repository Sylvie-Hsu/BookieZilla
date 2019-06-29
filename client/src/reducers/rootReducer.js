const initState = {
  token: null
};

const rootReducer = (state = initState, action) => {
  if (action.type === "UPDATE_TOKEN") {
    return {
      ...state,
      token: action.token
    };
  }
  return state;
};

export default rootReducer;
