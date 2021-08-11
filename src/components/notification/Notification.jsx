import React, { useEffect, useState } from "react";
import { useNotifications } from "../../contexts/useNotifications";
import { AlertDanger } from "../snackbars/AlertDanger";

const Notification = (props) => {
  const [exit, setExit] = useState(false);

  const { dispatch } = useNotifications();

  const handleCloseNotification = () => {
    setExit(true);
    console.log("close notification called");
    setTimeout(() => {
      dispatch({
        type: "REMOVE_NOTIFICATION",
        payload: {
          id: props.id,
          type: "SUCCESS",
        },
      });
    }, 400);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleCloseNotification();
    }, 2000);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <>
      {props.type !== "SUCCESS" ? (
        <AlertDanger />
      ) : (
        <div
          className={`alert-content  ${
            props.type === "SUCCESS" && "alert-success"
          }  ${exit ? "exit" : ""}`}
        >
          <i class="fas fa-exclamation-triangle"> </i>
          {props.message}
          <span
            className="btn-dismiss"
            id="btn-danger-close"
            onClick={() => {
              handleCloseNotification();
            }}
          >
            &times;
          </span>
        </div>
      )}
    </>
  );
};

export { Notification };
