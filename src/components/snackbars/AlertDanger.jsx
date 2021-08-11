const AlertDanger = () => {
  return (
    <div className="alert-content alert-danger">
      This is a danger with dismissal button.
      <span className="btn-dismiss" id="btn-danger-close">
        &times;
      </span>
    </div>
  );
};

export { AlertDanger };
