import { AlertDanger } from "../snackbars/AlertDanger";
import { AlertSuccess } from "../snackbars/AlertSuccess";

const Notification = (props) => {
  return (
    <>
      {props.type === "SUCCESS" ? (
        <AlertSuccess {...props} />
      ) : (
        <AlertDanger {...props} />
      )}
    </>
  );
};

export { Notification };
