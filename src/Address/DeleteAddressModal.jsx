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
import { useAddress } from "./hooks/useAddress";

const handleDeleteAddress = async ({
  address,
  setLoadingStatus,
  setAddressesMeta,
  setIsDeleteModalHidden,
  setSelectedAddress
}) => {
  try {
    setLoadingStatus(`idle`);
    const { data, status } = await axios.delete(
      `${BASE_API}/address/${address._id}`
    );
    if (status === 200) {
      setLoadingStatus(`success`);
      if (`address` in data) {
        setAddressesMeta((prevState) => ({
          ...prevState,
          addresses: prevState.addresses.filter(
            (address) => address._id !== data.address._id
          ),
        }));
        setSelectedAddress(null)
        setIsDeleteModalHidden(true);
      }
    }
  } catch (error) {
    setLoadingStatus(`error`);
    console.error(`error `, error);
  }
};

export const DeleteAddressModal = ({
  isDeleteModalHidden,
  setIsDeleteModalHidden,
  address,
  setAddressesMeta,

}) => {
  const ModalRef = useRef(null);
  const handleModalClose = useCallback(
    () => setIsDeleteModalHidden(true),
    [setIsDeleteModalHidden]
  );

  const [loadingStatus, setLoadingStatus] = useState(`idle`);

  const { setSelectedAddress } = useAddress();
  return (
    <>
      <Modal>
        <ModalOverlay isHidden={isDeleteModalHidden}>
          <div
            ref={ModalRef}
            className="modal"
            style={{ display: isDeleteModalHidden ? `none` : `block` }}
          >
            <ModalContainer>
              <div className="d-flex">
                <ModalHeader handleModalClose={handleModalClose}>
                  {`Delete Address`}
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
                    <p>Are you sure you want to delete the address?</p>
                  </ModalRow>
                  <ModalRow
                    extendedClassNames={`row-saved-collection jc-end gap-10`}
                  >
                    <button
                      disabled={loadingStatus === `loading`}
                      className="btn btn-danger"
                      type="submit"
                      name="editAddress"
                      onClick={() =>
                        handleDeleteAddress({
                          address,
                          setLoadingStatus,
                          setAddressesMeta,
                          setIsDeleteModalHidden,
                          setSelectedAddress
                        })
                      }
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-danger bg-transparent red"
                      style={{
                        border: `1px solid var(--kaali-danger)`,
                      }}
                      onClick={() => {
                        setIsDeleteModalHidden(true);
                      }}
                    >
                      Discard
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
