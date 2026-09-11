import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ProductContext from "../../context/ProductContext";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { brandOptionsMap, categoryOptionsMap } from "@/config/index";

const ShoppingProductTile = ({ product }) => {
  const { isLoding } = useSelector((state) => state.shopCart);
  const { handleGetProductDetails, handleAddToCart } =
    useContext(ProductContext);

  return (
    <Card className="w-full transition-all duration-500 bg-slate-100    mx-auto pt-0 dark:bg-[#111622] dark:border-[#1e2538] dark:hover:border-[#4f46e5]/50 dark:hover:shadow-[0_0_20px_rgba(79,70,229,0.15)] gap-0 overflow-hidden">
      <div
        onClick={() => handleGetProductDetails(product?._id)}
        className="relative overflow-hidden "
      >
        <div className="hover:scale-105 transition-transform duration-200 h-[350px]">
          <div className=" w-full h-full ">
            <img
              src={product?.image[0]}
              alt={product?.title}
              className="w-full h-full  rounded-t-lg"
            />
          </div>
        </div>
        {product?.salePrice && product?.salePrice > 0 ? (
          <Badge
            variant="outline"
            className="absolute top-2 left-2 py-1 px-2.5 bg-rose-50/90 backdrop-blur-sm text-rose-700 border border-rose-200/60 rounded-xl shadow-sm font-semibold text-xs select-none uppercase tracking-wider"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse mr-1" />
            Sale
          </Badge>
        ) : null}
        <div className="absolute bottom-4 left-2">
          <Badge
            variant="outline"
            className={`py-1 px-2.5 bg-blue-50/90 backdrop-blur-sm  border  rounded-xl shadow-sm font-semibold text-xs select-none  tracking-wider ${
              product?.totalStock <= 0
                ? "text-rose-700 border-rose-200/60"
                : "text-blue-700 border-blue-200/60"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                product?.totalStock <= 0 ? "bg-rose-500" : "bg-blue-500 "
              } animate-pulse`}
            />
            {product?.totalStock <= 0
              ? "Out of stock"
              : ` ${product?.totalStock}`}
          </Badge>
        </div>
      </div>
      <div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-sm text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0
                  ? "line-through text-muted-foreground"
                  : "text-primary"
              } text-lg font-semibold`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 && (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => handleAddToCart(product._id, product.totalStock)}
            disabled={isLoding || product?.totalStock <= 0}
            className={` w-full  ${
              isLoding || product?.totalStock <= 0 ? "cursor-not-allowed " : ""
            }`}
          >
            {product?.totalStock <= 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ShoppingProductTile;
