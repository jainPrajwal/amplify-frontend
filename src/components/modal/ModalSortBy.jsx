import { useProducts } from "../../contexts/useProducts";

const ModalSortBy = ({
  status: {
    state: { isSortByModalOpen },
    dispatch: modalDispatch,
  },
}) => {
  const {
    state: { sortBy },
    dispatch: storeDispatch,
  } = useProducts();

  const closeModal = () => {
    modalDispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <div
      className={` ${
        isSortByModalOpen === true ? "modal-bg modal-bg-active" : ""
      }`}
    >
      <div className="modal">
        <div className="modal-container">
          <span className="circle">
            <span
              id="btn-modal-close"
              onClick={() => {
                closeModal();
              }}
            >
              ×
            </span>
          </span>

          <div className="modal-header">
            <div
              className="header header-tertiary text-black px-1"
              style={{ marginBottom: 0 }}
            >
              Sort By
            </div>
            <div
              className="red text-upper fs-2"
              onClick={() =>
                storeDispatch({ type: "SORT", payload: "RECOMMENDED" })
              }
            >
              {" "}
              clear all
            </div>
          </div>
          <hr className="modal-hr" />
          <div className="modal-body">
            <div className="row">
              <label className="checkbox-label  checkboxRoundRadio-label">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "PRICE_LOW_TO_HIGH"}
                  value={"PRICE_LOW_TO_HIGH"}
                  onChange={() => {
                    storeDispatch({
                      type: "SORT",
                      payload: "PRICE_LOW_TO_HIGH",
                    });
                  }}
                />
                <span className="fs-14">Price Low To High</span>
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="row">
              <label className="checkbox-label  checkboxRoundRadio-label">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "PRICE_HIGH_TO_LOW"}
                  value={"PRICE_HIGH_TO_LOW"}
                  onChange={() => {
                    storeDispatch({
                      type: "SORT",
                      payload: "PRICE_HIGH_TO_LOW",
                    });
                  }}
                />
                <span className="fs-14"> Price High To Low</span>
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  );
};

export { ModalSortBy };
