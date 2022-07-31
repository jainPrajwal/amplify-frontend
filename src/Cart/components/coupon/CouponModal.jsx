import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalRow,
  ModalOverlay,
  ModalContainer,
} from "kaali-ui";
import { MdClose } from "react-icons/md";
import { useCallback, useRef, useState } from "react";
import { default as couponModalStyles } from "./CouponModal.module.css";
import axios from "axios";
import { BASE_API } from "../../../constants/api";
import { useAuth } from "../../../Auth/context/useAuth";
import { selectRandomCoupon } from "./utils/selectRandomCoupon";





export const CouponModal = ({
  isCouponModalHidden,
  setisCouponModalHidden,
  address,
  setAddressesMeta,
  setCoupon,
}) => {
  const ModalRef = useRef(null);
  const handleModalClose = useCallback(
    () => setisCouponModalHidden(true),
    [setisCouponModalHidden]
  );
  const { loggedInUser } = useAuth();

  const [loadingStatus, setLoadingStatus] = useState(`idle`);
  const { couponModal } = couponModalStyles;
  return (
    <>
      <Modal>
        <ModalOverlay isHidden={isCouponModalHidden}>
          <div
            ref={ModalRef}
            className={`modal ${couponModal}`}
            style={{ display: isCouponModalHidden ? `none` : `block` }}
          >
            <ModalContainer>
              <div className="d-flex">
                <ModalHeader handleModalClose={handleModalClose}>
                  {`Coupon`}
                </ModalHeader>
                <span
                  className="ml-auto header-tertiary cursor-pointer"
                  role={`button`}
                  onClick={() => handleModalClose()}
                >
                  <MdClose />
                </span>
              </div>

              <hr className="modal-hr" />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <ModalBody>
                  <ModalRow>
                    <div>
                      <img
                        className="w-100"
                        src="https://res.cloudinary.com/dmk11fqw8/image/upload/v1658721207/fall-down_ge4qpm.png"
                        alt=""
                      />
                    </div>
                  </ModalRow>
                
                  <ModalRow>
                    {
                      <div
                        className="header-tertiary text-center"
                        style={{
                          fontFamily: `Quattrocento Sans, sans-serif`,
                        }}
                      >
                        Play Quiz And Win Exciting Rewards
                      </div>
                    }
                  </ModalRow>
                  <ModalRow
                    extendedClassNames={`row-saved-collection jc-end gap-10`}
                  >
                    <button
                      className="btn btn-danger bg-transparent red"
                      style={{
                        border: `1px solid var(--kaali-danger)`,
                      }}
                      onClick={async () => {
                        const randomCoupon = selectRandomCoupon();
                      

                        try {
                          const { data, status } = await axios.post(
                            `${BASE_API}/coupon `,
                            {
                              coupon: {
                                coupon: randomCoupon,
                              },
                              email: loggedInUser.email,
                            }
                          );
                          if (status === 201) {
                            if (`coupon` in data) {
                              setCoupon(data.coupon);
                            }
                          }
                        } catch (error) {}
                      }}
                    >
                      Pretend to be a winner
                    </button>

                    <button
                      disabled={loadingStatus === `loading`}
                      className="btn btn-danger"
                      type="submit"
                    >
                      <a href="/" style={{ color: `inherit` }}>
                        {" "}
                        Play Quiz
                      </a>
                    </button>
                  </ModalRow>
                </ModalBody>
              </form>

              <ModalFooter></ModalFooter>
            </ModalContainer>
          </div>
        </ModalOverlay>
      </Modal>
    </>
  );
};
