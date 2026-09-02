import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-item-content";

const UserCartWrapper = ({ cartItems, setOpenCartSheet }) => {
  const navigate = useNavigate();
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (total, item) =>
            total + item.salePrice > 0
              ? item.salePrice
              : item.price * item.quantity,
          0,
        )
      : 0;
  return (
    <SheetContent className="sm:max-w-md p-6  gap-0">
      <SheetHeader className="p-0">
        <SheetTitle className="mb-4">Your Cart</SheetTitle>
      </SheetHeader>
      <div className=" ">
        <div className="space-y-4">
          {cartItems && cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <UserCartItemsContent key={item.productId} cartItem={item} />
            ))
          ) : (
            <p className="text-center text-muted-foreground mt-10">
              Your cart is empty.
            </p>
          )}
        </div>
        <div className=" mt-8 space-y-4 ">
          <div className="flex justify-between">
            <span className="font-bold">Total </span>
            <span className="font-bold">${totalCartAmount.toFixed(2)} </span>
          </div>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6"
      >
        CheckOut
      </Button>
    </SheetContent>
  );
};

export default UserCartWrapper;
