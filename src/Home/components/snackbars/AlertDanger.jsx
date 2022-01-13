import { useEffect, useState } from "react";
import { useNotifications } from "../notification/context/useNotifications";

const AlertDanger = (props) => {
  const [exit, setExit] = useState(false);

  const { dispatch } = useNotifications();
  const handleCloseNotification = () => {
    setExit(true);

    setTimeout(() => {
      dispatch({
        type: "REMOVE_NOTIFICATION",
        payload: {
          id: props.id,
          type: "DANGER",
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
    <div className={`alert-content alert-danger ${exit ? "exit" : ""}`}>
      <div>
        <i className="fa fa-check-circle" aria-hidden="true"></i>
        {props.message}
      </div>
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
  );
};

export { AlertDanger };
