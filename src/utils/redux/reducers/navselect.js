const NavselectReducer = (state = "Main", action) => {
  switch (action.type) {
    case "SELECT_NAVSTATE":
      return action.category;

    default:
      return state;
  }
};

export { NavselectReducer };
