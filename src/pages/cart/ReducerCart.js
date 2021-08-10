const reducerCart = (state, { type, payload }) => {
  switch (type) {
    case "ADD_TO_CART":
      return state.concat(payload);

    default:
      return state;
  }
};
export { reducerCart };
