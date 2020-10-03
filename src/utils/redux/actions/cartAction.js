const ADD_TO_CART = (item) => {
  return {
    type: "ADD_TO_CART",
    item,
  };
};

const REMOVE_FROM_CART = (item) => {
  return {
    type: "REMOVE_FROM_CART",
    item,
  };
};

const CHANGE_OPTION_AMOUNT = (payload) => {
  return {
    type: "CHANGE_OPTION_AMOUNT",
    foodName: payload.foodName,
    optionName: payload.optionName,
    amount: payload.amount,
  };
};
export { ADD_TO_CART, REMOVE_FROM_CART, CHANGE_OPTION_AMOUNT };
