import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { deleteAddress, fetchAllAddresses } from "@/store/shop/address-slice";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const AddressCard = ({
  addressInfo,
  currentEditedAddress,
  setCurrentEditedAddress,
  setFormData,
  handleCancelUpdate,
  setCurrentSelctedAddress,
  currentSelctedAddress,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isThisCardBeingEdited = currentEditedAddress?._id === addressInfo?._id;

  function handleDeleteAddress(addressId) {
    dispatch(deleteAddress({ userId: user.id, addressId: addressId })).then(
      (data) => {
        if (data.payload?.success) {
          toast.success(data.payload.message, {
            style: {
              background: "#008236",
              color: "var(--secondary)",
            },
          });
          dispatch(
            fetchAllAddresses({ userId: user.id, addressId: addressInfo._id }),
          ); // Refresh the address list after deletion
        } else {
          toast.error("Failed to delete address", {
            style: {
              background: "#ff0000",
              color: "var(--secondary)",
            },
          });
        }
      },
    );
  }
  function handleEditAddress(addressId) {
    setCurrentEditedAddress(addressId);
    setFormData({
      address: addressInfo?.address,
      city: addressInfo?.city,
      phone: addressInfo?.phone,
      pincode: addressInfo?.pincode,
      notes: addressInfo?.notes,
    });
  }

  return (
    <div>
      <Card
        className={`${
          currentSelctedAddress?._id === addressInfo?._id
            ? "border-primary border-2"
            : ""
        } `}
        onClick={() =>
          setCurrentSelctedAddress
            ? setCurrentSelctedAddress(addressInfo)
            : null
        }
      >
        <CardContent className="grid gap-4">
          <Label> Address : {addressInfo?.address} </Label>
          <Label> City : {addressInfo?.city} </Label>
          <Label> Pincode : {addressInfo?.pincode} </Label>
          <Label> Phone : {addressInfo?.phone} </Label>
          <Label> Notes : {addressInfo?.notes} </Label>
        </CardContent>
        <CardFooter>
          <div className="flex justify-between w-full ">
            <Button
              onClick={() => {
                isThisCardBeingEdited
                  ? handleCancelUpdate()
                  : handleEditAddress(addressInfo);
              }}
              variant="outline"
            >
              {isThisCardBeingEdited ? "Cancel" : "Update"}
            </Button>
            <Button
              onClick={() => {
                handleDeleteAddress(addressInfo._id);
                handleCancelUpdate();
              }}
              variant="outline"
            >
              Delete
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddressCard;
