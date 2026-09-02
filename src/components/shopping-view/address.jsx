import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { useState } from "react";
import { addressFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import ProductContext from "@/context/ProductContext";
import {
  addNewAddres,
  editAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AddressCard from "./address-card";

const initialAddressFormData = {
  address: "",
  city: "",
  notes: "",
  phone: "",
  pincode: "",
};
const Address = ({ currentSelctedAddress, setCurrentSelctedAddress }) => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedAddress, setCurrentEditedAddress] = useState(null);

  const dispatch = useDispatch();
  const { user } = useContext(ProductContext);
  const { addresseList } = useSelector((state) => state.shopAddress);
  function handleManageAddress(event) {
    event.preventDefault();
    if (addresseList.length >= 3 && !currentEditedAddress) {
      setFormData(initialAddressFormData);
      toast.error("You can only add up to 3 addresses.", {
        style: {
          background: "#ff0000",
          color: "var(--secondary)",
        },
      });
      return;
    }
    dispatch(
      addNewAddres({
        userId: user?.id,
        ...formData,
      }),
    ).then((data) => {
      if (data.payload?.success) {
        toast.success(data.payload.message, {
          style: {
            background: "#008236",
            color: "var(--secondary)",
          },
        });
        dispatch(fetchAllAddresses({ userId: user?.id })); // ✅ ضفناها عشان نجيب العناوين بعد ما نضيف منتج للعربة

        setFormData(initialAddressFormData);
      }
    });
  }
  function isFormDataValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  function handleSaveAddress(event) {
    event.preventDefault();

    dispatch(
      editAddress({
        userId: user?.id,
        addressId: currentEditedAddress._id,
        formData,
      }),
    ).then((data) => {
      if (data.payload?.success) {
        toast.success(data.payload.message, {
          style: {
            background: "#008236",
            color: "var(--secondary)",
          },
        });
        dispatch(fetchAllAddresses({ userId: user?.id }));
        setFormData(initialAddressFormData);
        setCurrentEditedAddress(null);
      }
    });
  }
  useEffect(() => {
    dispatch(fetchAllAddresses({ userId: user?.id }));
  }, [dispatch]);

  function handleCancelUpdate() {
    setCurrentEditedAddress(null);
    setFormData(initialAddressFormData);
  }
  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2 w-full">
        {addresseList && addresseList?.length > 0 ? (
          addresseList.map((singleAddressItem) => (
            <AddressCard
              key={singleAddressItem._id}
              addressInfo={singleAddressItem}
              currentEditedAddress={currentEditedAddress}
              setCurrentEditedAddress={setCurrentEditedAddress}
              setFormData={setFormData}
              handleSaveAddress={handleSaveAddress}
              handleCancelUpdate={handleCancelUpdate}
              setCurrentSelctedAddress={setCurrentSelctedAddress}
              currentSelctedAddress={currentSelctedAddress}
            />
          ))
        ) : (
          <p className="text-center col-span-full">No addresses found.</p>
        )}
      </div>
      <CardHeader>
        <CardTitle> Add new Address </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3  ">
        <CommonForm
          formControl={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedAddress ? "Update" : "Add"}
          onSubmit={
            currentEditedAddress ? handleSaveAddress : handleManageAddress
          }
          isBtnDisabled={!isFormDataValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
