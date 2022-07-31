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
import axios from "axios";
import { BASE_API } from "../constants/api";
import { useNotifications } from "../Home/components/notification/context/useNotifications";
import { v4 } from "uuid";

export const AddressModal = ({
  ismodalHidden,
  setIsModalHidden,
  setAddressesMeta,
  address,
}) => {
  const ModalRef = useRef(null);
  const handleModalClose = useCallback(
    () => setIsModalHidden(true),
    [setIsModalHidden]
  );

  const [editAddress, setEditAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    name: address?.name || ``,
    mobile: address?.mobile || ``,
    country: address?.country || ``,
    state: address?.state || ``,
    city: address?.city || ``,
    street: address?.street || ``,
    pinCode: address?.pinCode || ``,
  });
  const [loadingStatus, setLoadingStatus] = useState(`idle`);
  const { dispatch: notificationDispatch } = useNotifications();

  return (
    <>
      <Modal>
        <ModalOverlay isHidden={ismodalHidden}>
          <div
            ref={ModalRef}
            className="modal"
            style={{ display: ismodalHidden ? `none` : `block` }}
          >
            <ModalContainer>
              <div className="d-flex">
                <ModalHeader handleModalClose={handleModalClose}>
                  {`Address`}
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

                  
                  if (editAddress) {
                    (async () => {
                      setLoadingStatus(`loading`);
                    
                      try {
                        const { data, status } = await axios.post(
                          `${BASE_API}/address/${address._id}`,
                          {
                            address: addressForm,
                          }
                        );
                        if (status === 201) {
                          setLoadingStatus(`success`);
                          if (`address` in data) {
                            setAddressesMeta((prevState) => ({
                              ...prevState,
                              addresses: prevState.addresses.map((address) => {
                                if (address._id === data.address._id) {
                                  return data.address;
                                }
                                return address;
                              }),
                            }));

                            setIsModalHidden(true);
                            notificationDispatch({
                              type: "ADD_NOTIFICATION",
                              payload: {
                                id: v4(),
                                type: "SUCCESS",
                                message: data?.message,
                              },
                            });
                          }
                        }
                      } catch (error) {
                        setLoadingStatus(`error`);
                      }
                    })();
                  } else {
                    (async () => {
                      setLoadingStatus(`loading`);
                      try {
                        const { data, status } = await axios.post(
                          `${BASE_API}/address`,
                          {
                            address: addressForm,
                          }
                        );
                        if (status === 201) {
                          setLoadingStatus(`success`);
                          if (`address` in data) {
                            setAddressesMeta((prevState) => ({
                              ...prevState,
                              addresses: prevState.addresses.concat(
                                data.address
                              ),
                            }));
                          }
                          setIsModalHidden(true);
                          notificationDispatch({
                            type: "ADD_NOTIFICATION",
                            payload: {
                              id: v4(),
                              type: "SUCCESS",
                              message: data?.message,
                            },
                          });
                        }
                      } catch (error) {
                        setLoadingStatus(`error`);
                      }
                    })();
                  }
                }}
              >
                <ModalBody>
                  <ModalRow
                    extendedClassNames={`row-saved-collection f-direction-col ai-start`}
                  >
                    <input
                      type="text"
                      id="name"
                      className="input input-text p-md w-100 fs-1 border-transparent"
                      value={addressForm.name}
                      onChange={(e) => {
                        setAddressForm((prevState) => ({
                          ...prevState,
                          name: e.target.value,
                        }));
                      }}
                      placeholder="Enter Name"
                    />
                  </ModalRow>
                  <ModalRow
                    extendedClassNames={`row-saved-collection f-direction-col ai-start`}
                  >
                    <input
                      type="text"
                      className="input input-text p-md w-100 fs-1 border-transparent"
                      value={addressForm.mobile}
                      onChange={(e) => {
                        setAddressForm((prevState) => ({
                          ...prevState,
                          mobile: e.target.value,
                        }));
                      }}
                      placeholder="Enter Mobile No"
                    />
                  </ModalRow>
                  <ModalRow
                    extendedClassNames={`row-saved-collection f-direction-col ai-start`}
                  >
                    <input
                      type="text"
                      className="input input-text p-md w-100 fs-1 border-transparent"
                      value={addressForm.country}
                      onChange={(e) => {
                        setAddressForm((prevState) => ({
                          ...prevState,
                          country: e.target.value,
                        }));
                      }}
                      placeholder="Enter Country"
                    />
                  </ModalRow>

                  <ModalRow
                    extendedClassNames={`row-saved-collection f-direction-col ai-start`}
                  >
                    <input
                      type="text"
                      className="input input-text p-md w-100 fs-1 border-transparent"
                      value={addressForm.state}
                      onChange={(e) => {
                        setAddressForm((prevState) => ({
                          ...prevState,
                          state: e.target.value,
                        }));
                      }}
                      placeholder="Enter State"
                    />
                  </ModalRow>

                  <ModalRow
                    extendedClassNames={`row-saved-collection f-direction-col ai-start`}
                  >
                    <input
                      type="text"
                      className="input input-text p-md w-100 fs-1 border-transparent"
                      value={addressForm.city}
                      onChange={(e) => {
                        setAddressForm((prevState) => ({
                          ...prevState,
                          city: e.target.value,
                        }));
                      }}
                      placeholder="Enter City"
                    />
                  </ModalRow>

                  <ModalRow
                    extendedClassNames={`row-saved-collection f-direction-col ai-start`}
                  >
                    <input
                      type="text"
                      className="input input-text p-md w-100 fs-1 border-transparent"
                      value={addressForm.street}
                      onChange={(e) => {
                        setAddressForm((prevState) => ({
                          ...prevState,
                          street: e.target.value,
                        }));
                      }}
                      placeholder="Enter Street"
                    />
                  </ModalRow>
                  <ModalRow
                    extendedClassNames={`row-saved-collection f-direction-col ai-start`}
                  >
                    <input
                      type="text"
                      className="input input-text p-md w-100 fs-1 border-transparent"
                      value={addressForm.pinCode}
                      onChange={(e) => {
                        setAddressForm((prevState) => ({
                          ...prevState,
                          pinCode: e.target.value,
                        }));
                      }}
                      placeholder="Enter Pin Code"
                    />
                  </ModalRow>
                  <ModalRow
                    extendedClassNames={`row-saved-collection jc-end gap-10`}
                  >
                    <button
                      className="btn btn-danger bg-transparent red"
                      style={{
                        border: `1px solid var(--kaali-danger)`,
                      }}
                      onClick={() => {
                        setIsModalHidden(true);
                      }}
                    >
                      Discard
                    </button>
                    {address ? (
                      <button
                        disabled={loadingStatus === `loading`}
                        className="btn btn-danger"
                        type="submit"
                        name="editAddress"
                        onClick={() => setEditAddress(true)}
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        disabled={loadingStatus === `loading`}
                        className="btn btn-danger"
                        type="submit"
                        name="saveAddress"
                      >
                        Save
                      </button>
                    )}
                  </ModalRow>
                </ModalBody>
              </form>
              {!address && (
                <ModalFooter>
                  <button
                    className="btn btn-danger bg-transparent red w-100 my-lg"
                    style={{
                      border: `1px solid var(--kaali-danger)`,
                    }}
                    onClick={() => {
                      setAddressForm({
                        name: `Test`,
                        mobile: `9998887776`,
                        country: `India`,
                        state: `Maharashtra`,
                        city: `Pune`,
                        pinCode: `422412`,
                        street: `dalal street`,
                      });
                    }}
                  >
                    Fill Dummy Details
                  </button>
                </ModalFooter>
              )}
            </ModalContainer>
          </div>
        </ModalOverlay>
      </Modal>
    </>
  );
};
