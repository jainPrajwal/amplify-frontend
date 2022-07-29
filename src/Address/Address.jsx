import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../Auth/context/useAuth";
import { BASE_API } from "../constants/api";
import { AddressModal } from "./AddressModal";
import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { default as AddressStyles } from "./Address.module.css";

export const Address = () => {
  const [ismodalHidden, setIsModalHidden] = useState(true);

  const [addressesMeta, setAddressesMeta] = useState({
    addresses: [],
  });

  const { loggedInUser } = useAuth();
  const { iconEditAndDeleteWrapper } = AddressStyles;

  useEffect(() => {
    (async () => {
      try {
        if (loggedInUser && loggedInUser.token) {
          const { data, status } = await axios.get(`${BASE_API}/address`);
          if (status === 200) {
            if (`addresses` in data) {
              console.log(data.addresses);
              setAddressesMeta((prevState) => ({
                ...prevState,
                addresses: data.addresses,
              }));
            }
          }
        }
      } catch (error) {}
    })();
  }, [loggedInUser]);
  return (
    <>
      {!ismodalHidden && (
        <AddressModal
          ismodalHidden={ismodalHidden}
          setIsModalHidden={setIsModalHidden}
          setAddressesMeta={setAddressesMeta}
        />
      )}
      <div className="header header-tertiary text-black ">Address</div>
      <div>
        {addressesMeta.addresses.map(
          (
            { name, city, country, state, street, mobile, pinCode, _id },
            index
          ) => {
            return (
              <div key={_id} className="my-lg pos-relative">
                <div className={`${iconEditAndDeleteWrapper}`}>
                  <div className="d-flex ai-center gap-10">
                    <MdEdit size={`20`}/>
                    <IoMdTrash size={`20`}/>
                  </div>
                </div>
                <label
                  htmlFor={`address-${index}`}
                  className="d-flex ai-start mx-lg gap-10"
                >
                  <input
                    type="radio"
                    name={`address`}
                    id={`address-${index}`}
                  />

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
            );
          }
        )}
      </div>

      <div className="d-flex jc-end">
        <button
          className="btn btn-danger bg-transparent red"
          style={{
            border: `1px solid var(--kaali-danger)`,
          }}
          onClick={() => {
            setIsModalHidden(false);
          }}
        >
          <span>+</span>
          Add Address
        </button>
      </div>
    </>
  );
};
