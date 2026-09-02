import { createContext, useState } from "react"; // ✅ أضفنا useState
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDeatils } from "@/store/shop/product-slice"; // ✅ تصحيح السبلنج
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"; // ✅ أضفنا الـ imports الناقصة
import { toast } from "sonner";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { cartItems } = useSelector((state) => state.shopCart);

  const [filters, setFilter] = useState(
    sessionStorage.getItem("filters")
      ? JSON.parse(sessionStorage.getItem("filters"))
      : {},
  );

  const { user } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();

  const handleGetProductDetails = async (productId) => {
    try {
      const result = await dispatch(fetchProductDeatils(productId));
      if (result.payload) {
        setOpenDetailsDialog(true);
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems?.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId,
      );
      const getQuantity = getCartItems[indexOfCurrentItem]?.quantity;

      if (getQuantity + 1 > getTotalStock) {
        toast.error(`Only ${getQuantity} quantity can be added for this item`, {
          style: {
            background: "#db1a07",
            color: "var(--secondary)",
          },
        });
        return;
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      }),
    ).then((data) => {
      if (data.payload?.success) {
        dispatch(fetchCartItems({ userId: user?.id }));
        toast.success(data.payload.message, {
          style: {
            background: "#008236",
            color: "var(--secondary)",
          },
        });
      } else {
        toast.error(data.payload.message, {
          style: {
            background: "#db1a07",
            color: "var(--secondary)",
          },
        });
      }
    });
  }

  return (
    <ProductContext.Provider
      value={{
        user,
        products,
        openDetailsDialog,
        setOpenDetailsDialog,
        handleGetProductDetails,
        handleAddToCart,
        filters,
        setFilter,
      }}
    >
      {children} {/* ✅ أهم سطر عشان الأبلكيشن يظهر */}
    </ProductContext.Provider>
  );
};

export default ProductContext;
