import { useProducts } from "../../context/useProducts";
import { useEffect } from "react";
import "./modalSortBy.css";
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
    modalDispatch({ type: "CLOSE_SORTBY_MODAL" });
  };
  useEffect(() => {
    document.addEventListener(`click`, (event) => {
      
      
      if (
        !(
          event.target.closest(`.modal`) ||
          event.target.classList.contains(`btn-sort-by`)
        )
      ) {
        // if whatever you are clicking is a NOT a part of modal OR is NOT the sort by button itself then close the modal
        closeModal();
      }
    });
  }, [isSortByModalOpen]);
  return (
    <div className="wrapper-mobile-sort-by-modal">
      <div
        className={` ${
          isSortByModalOpen === true ? "modal-bg modal-bg-active" : ""
        }`}
      >
        <div className="modal modal-sort-by">
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
                className="red text-upper fs-2 clear-all"
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
                    checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
                    value={"PRICE_LOW_TO_HIGH"}
                    onChange={(e) => {
                      
                      storeDispatch({
                        type: "SORT",
                        payload: "PRICE_LOW_TO_HIGH",
                      });
                    }}
                  />
                  <span className="fs-14">Price Low To High</span>
                  <span
                    className={`checkmark ${
                      sortBy === "PRICE_LOW_TO_HIGH" ? `checkmark-active` : ``
                    }`}
                  >
                    <span></span>
                  </span>
                </label>
              </div>
              <div className="row">
                <label className="checkbox-label  checkboxRoundRadio-label">
                  <input
                    type="radio"
                    name="sortBy"
                    checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
                    value={"PRICE_HIGH_TO_LOW"}
                    onChange={() => {
                      storeDispatch({
                        type: "SORT",
                        payload: "PRICE_HIGH_TO_LOW",
                      });
                    }}
                  />
                  <span className="fs-14"> Price High To Low</span>
                  <span
                    className={`checkmark ${
                      sortBy === "PRICE_HIGH_TO_LOW" ? `checkmark-active` : ``
                    }`}
                  >
                    <span></span>
                  </span>
                </label>
              </div>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ModalSortBy };
