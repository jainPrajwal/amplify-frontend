import { useContext } from "react";
import { NotificationContext } from "./notification-context";

const useNotifications = () => {
  return useContext(NotificationContext);
};

export { useNotifications };
