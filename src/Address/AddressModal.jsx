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
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { BASE_API } from "../constants/api";

export const AddressModal = ({
  ismodalHidden,
  setIsModalHidden,
  setAddressesMeta,
}) => {
  const ModalRef = useRef(null);
  const handleModalClose = useCallback(
    () => setIsModalHidden(true),
    [setIsModalHidden]
  );

  const [addressForm, setAddressForm] = useState({
    name: ``,
    mobile: ``,
    country: ``,
    state: ``,
    city: ``,
    street: ``,
    pinCode: ``,
  });

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
                  // console.log(`address `, addressForm);
                  (async () => {
                    try {
                      const { data, status } = await axios.post(
                        `${BASE_API}/address`,
                        {
                          address: addressForm,
                        }
                      );
                      if (status === 201) {
                        if (`address` in data) {
                          setAddressesMeta((prevState) => ({
                            ...prevState,
                            addresses: prevState.addresses.concat(data.address),
                          }));
                        }
                      }
                    } catch (error) {}
                  })();
                }}
              >
                <ModalBody>
                  <ModalRow
                    extendedClassNames={`row-saved-collection f-direction-col ai-start`}
                  >
                    <input
                      type="text"
                      id="name"
                      className="input input-text p-md w-100 fs-1"
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
                      className="input input-text p-md w-100 fs-1"
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
                      className="input input-text p-md w-100 fs-1"
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
                      className="input input-text p-md w-100 fs-1"
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
                      className="input input-text p-md w-100 fs-1"
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
                      className="input input-text p-md w-100 fs-1"
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
                      className="input input-text p-md w-100 fs-1"
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
                    <button className="btn btn-danger" type="submit">
                      Save
                    </button>
                  </ModalRow>
                </ModalBody>
              </form>
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
            </ModalContainer>
          </div>
        </ModalOverlay>
      </Modal>
    </>
  );
};
