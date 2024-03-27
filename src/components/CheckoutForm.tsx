import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./context";
import styled from "styled-components";
import { CartItem, FormData } from "../types/index";

const defaultFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  zipCode: "",
  city: "",
  phone: "",
};

//#region Styles
const InputForm = styled.div`
  display: flex;
`;

const PaymentInput = styled.fieldset`
  diplay: flex;
  border: none;
`;

const NameInput = styled.fieldset`
  display: flex;
  border: none;
`;

const CityInput = styled.fieldset`
  display: flex;
  border: none;
`;
//#endregion

function getSessionStorageOrDefault(key: string, defaultValue: CartItem[]) {
  const stored = sessionStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }
  return JSON.parse(stored);
}

export function CheckoutForm() {
  //Cart för senare användning för att skapa confirmation page
  const { cart, deleteCart } = useContext(CartContext)!;
  const navigate = useNavigate();

  const [confirmationItems, setConfirmationItems] = useState(
    getSessionStorageOrDefault("confirmationItems", [])
  );

  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const { firstName, lastName, email, address, zipCode, city, phone } =
    formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //lägg till logik för confirmation page
    setConfirmationItems(cart);
    const addressData: FormData = formData;

    //Store current formdata to SessionStorage
    sessionStorage.setItem("addressData", JSON.stringify(addressData));
    sessionStorage.setItem("confirmedItems", JSON.stringify(cart));

    deleteCart();
    //Navigate to ConfirmationPage
    navigate("/ConfirmationPage");
    setFormData(defaultFormData);
  };

  return (
    <div>
      <h2>KASSA</h2>
      <InputForm>
        <form onSubmit={onSubmit}>
          <div>
            Välj betalmetod:
            <PaymentInput>
              <input type="radio" id="card" name="paymentMethod" value="card" />
              <label htmlFor="card">Kreditkort</label>
              <input
                type="radio"
                id="klarna"
                name="paymentMethod"
                value="klarna"
              />
              <label htmlFor="card">Klarna</label>
              <input
                type="radio"
                id="swish"
                name="paymentMethod"
                value="swish"
              />
              <label htmlFor="card">Swish</label>
            </PaymentInput>
          </div>
          <NameInput>
            <div>
              <label>
                Förnamn:
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={onChange}
                />
              </label>
            </div>
            <div>
              <label>
                Efternamn:
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={onChange}
                />
              </label>
            </div>
          </NameInput>
          <div>
            <label>
              Epost:
              <input
                type="email"
                id="email"
                value={email}
                onChange={onChange}
              />
            </label>
          </div>
          <div>
            <label>
              Adress:
              <input
                type="text"
                id="address"
                value={address}
                onChange={onChange}
              />
            </label>
          </div>
          <CityInput>
            <div>
              <label>
                Postnr:
                <input
                  type="text"
                  id="zipCode"
                  value={zipCode}
                  onChange={onChange}
                />
              </label>
            </div>
            <div>
              <label>
                Stad:
                <input type="text" id="city" value={city} onChange={onChange} />
              </label>
            </div>
          </CityInput>
          <div>
            <label>
              Telefon:
              <input type="text" id="phone" value={phone} onChange={onChange} />
            </label>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </InputForm>
    </div>
  );
}