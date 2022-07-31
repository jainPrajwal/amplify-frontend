import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { default as AddressStyles } from "./Address.module.css";
import { useState } from "react";
import { AddressModal } from "./AddressModal";
import { DeleteAddressModal } from "./DeleteAddressModal";
import { useAddress } from "./hooks/useAddress";

export const SingleAddress = ({
  address,
  index,
  setAddressesMeta,
  showIcons = true,
}) => {
  const { name, city, country, state, street, mobile, pinCode, _id } = address;
  const { iconEditAndDeleteWrapper } = AddressStyles;
  const [ismodalHidden, setIsModalHidden] = useState(true);
  const [isDeleteModalHidden, setIsDeleteModalHidden] = useState(true);
  const { setSelectedAddress } = useAddress();

  return (
    <>
      {!ismodalHidden && (
        <AddressModal
          ismodalHidden={ismodalHidden}
          setIsModalHidden={setIsModalHidden}
          address={address}
          setAddressesMeta={setAddressesMeta}
        />
      )}

      {!isDeleteModalHidden && (
        <DeleteAddressModal
          isDeleteModalHidden={isDeleteModalHidden}
          setIsDeleteModalHidden={setIsDeleteModalHidden}
          setAddressesMeta={setAddressesMeta}
          address={address}
        />
      )}
      <div key={_id} className="my-lg pos-relative w-100">
        {showIcons && (
          <div className={`${iconEditAndDeleteWrapper}`}>
            <div className="d-flex ai-center gap-10">
              <span
                role={`button`}
                className="cursor-pointer"
                onClick={() => {
                  setIsModalHidden(false);
                }}
              >
                <MdEdit size={`20`} />
              </span>
              <span
                role={`button`}
                className="cursor-pointer"
                onClick={() => {
                  setIsDeleteModalHidden(false);
                }}
              >
                <IoMdTrash size={`20`} />
              </span>
            </div>
          </div>
        )}
        <label
          htmlFor={`address-${index}`}
          className={`d-flex ai-start mx-lg gap-10 ${
            showIcons && `cursor-pointer`
          }`}
        >
          {showIcons && (
            <input
              type="radio"
              name={`address`}
              id={`address-${index}`}
              onChange={() => {
                setSelectedAddress({
                  address,
                });
              }}
            />
          )}

          <div>
            <p>{name}</p>
            <p>
              {street}, {city}-{pinCode},
            </p>
            <p>
              {state}, {country}
            </p>

            <p>{mobile}</p>
          </div>
        </label>
      </div>
    </>
  );
};
