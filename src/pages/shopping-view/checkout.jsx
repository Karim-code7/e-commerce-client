import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-item-content";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createOrder } from "@/store/shop/order-slice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.shopOrder);
  const [currentSelctedAddress, setCurrentSelctedAddress] = useState(null);

  const [isPaymentStart, setIsPaymentStart] = useState(false);

  const { approvaleURL } = useSelector((state) => state.shopOrder);

  const { orderList } = useSelector((state) => state.shopOrder);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  console.log(currentSelctedAddress);

  const totalCartAmount =
    cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (total, item) =>
            total + (item.salePrice || item.price) * item.quantity,
          0,
        )
      : 0;
  console.log(cartItems);

  async function handleInitiatePaypalPayment() {
    const orderData = {
      userId: user.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((item) => {
        return {
          productId: item?.productId,
          title: item?.title,
          image: item?.image,
          price: item?.salePrice > 0 ? item?.salePrice : item?.price,
          quantity: item?.quantity,
        };
      }),

      addressInfo: {
        addressId: currentSelctedAddress?._id,
        address: currentSelctedAddress?.address,
        city: currentSelctedAddress?.city,
        pincode: currentSelctedAddress?.pincode,
        phone: currentSelctedAddress?.phone,
        notes: currentSelctedAddress?.notes,
      },
      paymentMethods: "paypal",
      orderStatus: "pending",
      paymentStatus: "paid",
      totalAmount: totalCartAmount.toFixed(2),
      orderDate: new Date(),
      orderUbdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    if (currentSelctedAddress === null) {
      toast.error("Please select an address.", {
        style: {
          background: "#ff0000",
          color: "var(--secondary)",
        },
      });
      return;
    }
    if (cartItems?.items.length === 0) {
      toast.error("Your cart is empty, please add items to cart", {
        style: {
          background: "#ff0000",
          color: "var(--secondary)",
        },
      });
      return;
    }

    dispatch(createOrder(orderData)).then((data) => {
      if (data?.payload?.message) {
        setIsPaymentStart(true);
        toast.success(data?.payload?.message, {
          style: {
            background: "#008236",
            color: "var(--secondary)",
          },
        });
        if (data?.payload?.approvaleURL) {
          window.location.href = data?.payload?.approvaleURL;
        }
      } else {
        setIsPaymentStart(false);
      }
    });
  }

  return (
    <div className=" flex flex-col pt-16  ">
      <div className="relative h-[300px ] w-full overflow-hidden">
        <img
          className="h-full w-full object-cover object-center"
          src={img}
          alt="Checkout Banner"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5   mt-5 p-5 w-full">
        <Address
          currentSelctedAddress={currentSelctedAddress}
          setCurrentSelctedAddress={setCurrentSelctedAddress}
        />
        <Card className="flex flex-col gap-5 pt-10 px-4">
          {cartItems && cartItems.items && cartItems.items.length > 0 ? (
            cartItems.items.map((cartItem) => (
              <UserCartItemsContent
                key={cartItem.productId}
                cartItem={cartItem}
              />
            ))
          ) : (
            <span className="text-center text-muted-foreground mt-10">
              Your cart is empty.
            </span>
          )}
          <div>
            <div className=" mt-8 space-y-4 ">
              <div className="flex justify-between">
                <span className="font-bold">Total </span>
                <span className="font-bold">${totalCartAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button
              // 🌟 أضفنا `isSubmitting` لشروط الإغلاق
              disabled={
                isLoading ||
                isSubmitting ||
                currentSelctedAddress === null ||
                cartItems?.items?.length === 0
              }
              className={`w-full ${
                isLoading ||
                isSubmitting ||
                currentSelctedAddress === null ||
                cartItems?.items?.length === 0
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              onClick={async () => {
                // 1. ⚡ اقلب الزر فوراً وبدون أي تأخير إلى Disabled في نفس الميكرو-ثانية!
                setIsSubmitting(true);

                try {
                  // 2. استدعي دالة الدفع الخاصة بك وانتظرها (تأكد من وضع async/await)
                  await handleInitiatePaypalPayment();
                } catch (error) {
                  // 3. لو حدث خطأ في الشبكة أو السيرفر ولم يتم التحويل، افتح الزر للمستخدم مجدداً
                  setIsSubmitting(false);
                  console.error(error);
                }
              }}
            >
              {/* 💡 حركة احترافية: غير النص إلى "Processing..." أثناء التحويل */}
              {isSubmitting || isLoading
                ? "Processing Payment..."
                : "Checkout with Paypal"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
