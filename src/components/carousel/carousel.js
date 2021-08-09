import { slides } from "./slides/slides";

const reducerCallbackFunction = (state, action) => {
  switch (action.type) {
    case "NEXT":
      return {
        ...state,
        currentIndex: (state.currentIndex + 1) % slides.length,
      };

    case "PREV":
      return {
        ...slides,
        currentIndex: (state.currentIndex - 1 + slides.length) % slides.length,
      };

    case "GOTO":
      return {
        currentIndex: action.payload,
      };
    default:
      return state;
  }
};
export { reducerCallbackFunction };
