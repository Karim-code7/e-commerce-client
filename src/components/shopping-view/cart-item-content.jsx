import { MinusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Minus } from "lucide-react";
import { Plus } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteCartItems, ubdateCartQuantity } from "@/store/shop/cart-slice";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import ProductContext from "@/context/ProductContext";
import { useContext } from "react";

const UserCartItemsContent = ({ cartItem, id }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { products } = useContext(ProductContext);

  const { trashLoading, ubdateLodaing } = useSelector(
    (state) => state.shopCart,
  );
  const dispatch = useDispatch();

  function handleCartItemDele(getCartItem) {
    dispatch(
      deleteCartItems({
        userId: user.id,
        productId: getCartItem?.productId,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Cart item is deleted successfully", {
          style: {
            background: "#008236",
            color: "var(--secondary)",
          },
        });
      }
    });
  }

  function handleUpdatedQuantity(getCartItem, typeOfAction) {
    if (typeOfAction === "add") {
      const getCartItems = cartItems?.items || [];
      const getItemFromProducts = products.find(
        (item) => item._id === getCartItem.productId,
      );
      if (!getItemFromProducts) return;

      const getIndexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCartItem.productId,
      );
      const currentQuantityInCart =
        getIndexOfCurrentItem > -1
          ? getCartItems[getIndexOfCurrentItem]?.quantity
          : 0;
      if (currentQuantityInCart + 1 > getItemFromProducts.totalStock) {
        toast.error(
          `Only ${getItemFromProducts.totalStock} quantity can be added for this item`,
          {
            style: {
              background: "#db1a07",
              color: "var(--secondary)",
            },
          },
        );
        return;
      }
    }
    dispatch(
      ubdateCartQuantity({
        userId: user?.id,

        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "add"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      }),
    );
  }

  return (
    <div className="flex items-center  space-x-4">
      <img
        src={cartItem?.image[0]}
        alt={cartItem.title}
        className="w-20 h-20 rounded object-cover"
      />

      <div className="  flex-1     ">
        <h2 className=" font-extrabold ">{cartItem?.title}</h2>
        <div className="flex items-center gap-2 mt-1">
          <Button
            onClick={() => handleUpdatedQuantity(cartItem, "decrease")}
            disabled={cartItem?.quantity <= 1 || ubdateLodaing}
            variant="outline"
            className="h-8 w-8 cursor-pointer "
            size="icon"
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            onClick={() => handleUpdatedQuantity(cartItem, "add")}
            variant="outline"
            className="h-8 w-8 cursor-pointer "
            size="icon"
            disabled={ubdateLodaing}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Plus</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(1)}
        </p>
        <button disabled={trashLoading}>
          <Trash2
            onClick={() => handleCartItemDele(cartItem)}
            className={`  mt-1 ${trashLoading ? " text-gray-700  cursor-not-allowed  " : " text-red-700 cursor-pointer"}`}
            size={20}
          />
        </button>
      </div>
    </div>
  );
};

export default UserCartItemsContent;
