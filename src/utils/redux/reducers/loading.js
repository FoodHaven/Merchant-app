// Loading actions
const SETLOADING = (payload) => {
  return {
    type: "SETLOADING",
    payload,
  };
};

// Reducers
const loadingReducer = (state = 0, action) => {
  switch (action.type) {
    case "SETLOADING":
      return action.payload;
    default:
      return state;
  }
};

export { loadingReducer, SETLOADING };
