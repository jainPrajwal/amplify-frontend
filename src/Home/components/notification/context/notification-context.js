import { createContext, useReducer } from "react";
import { Notification } from "../Notification";

export const NotificationContext = createContext();
const initialState = [];
const NotificationProvider = (props) => {
  
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_NOTIFICATION":
        return [...state, { ...action.payload }];

      case "REMOVE_NOTIFICATION":
        return state.filter(
          (notification) => notification.id !== action.payload.id
        );

      default:
        return state;
    }
  }, initialState);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      <div>
        <div className={"alert-wrapper"}>
          {state.map((notification) => {
            return <Notification {...notification} key={notification.id} />;
          })}
        </div>
        {props.children}
      </div>
    </NotificationContext.Provider>
  );
};

export { NotificationProvider };
