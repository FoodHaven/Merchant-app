import React from "react";
import { useSelector, useDispatch } from "react-redux";

const CountOccurance = (item, list) => {
  let count = 0;
  for (var i = 0; i < list.length; i++) {
    if (item.name == list[i].name) {
      count = count + 1;
    }
  }
  return count;
};

// const countCartTotal = () => {
//   const cartList = useSelector((state) => state.cartReducer);

// };

export { CountOccurance };
