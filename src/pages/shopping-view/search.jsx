import { Input } from "@/components/ui/input";
import { fetchSearchProducts } from "@/store/shop/search-slice";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ShoppingProductTile from "./product-tile";
import { clearSearchProducts } from "@/store/shop/search-slice";
import { fetchAllFiltred } from "@/store/shop/product-slice";
import ProductDetailsDialog from "./product-details";
const SearchProducts = () => {
  const { searchProducts, isLoading } = useSelector(
    (state) => state.shopSearch,
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const [keyWord, setKeyword] = useState("");
  const { products } = useSelector((state) => state.shopProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (keyWord && keyWord.trim() != "" && keyWord.trim().length > 2) {
        setSearchParams({ keyword: keyWord.trim() });
        dispatch(fetchSearchProducts(keyWord.trim()));
      } else {
        setSearchParams({ keyword: keyWord.trim() });

        dispatch(clearSearchProducts());

        dispatch(
          fetchAllFiltred({ filterParams: {}, sortParams: "price-lowtohigh" }),
        );
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [keyWord, dispatch, setSearchParams]);

  return (
    <div className="container mt-16 mx-auto md:px-6 dark:bg-[#0B0F19] px-4 py-8">
      <div className="flex justify-center mb-8 ">
        <div className="w-full flex items-center">
          <Input
            value={keyWord}
            name="keyWord"
            onChange={(e) => setKeyword(e.target.value)}
            className="text-lg py-6"
            placeholder="Search Products..."
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {(() => {
          // 1. حالة: المستخدم كاتب كلمة بحث فعلاً
          if (keyWord.trim().length >= 2) {
            if (searchProducts.length > 0) {
              return searchProducts.map((product) => (
                <ShoppingProductTile key={product._id} product={product} />
              ));
            } else {
              // 🌟 لو ملقاش نتائج: يعرض رسالة خطأ + المنتجات الكلية كـ اقتراح عشان الصفحة ما تفضلش فاضية
              return (
                <div className="col-span-full space-y-6">
                  <div className="text-center py-6">
                    <p className="text-xl font-semibold text-gray-600">
                      No products found matching "{keyWord}"
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      But check out our top products below!
                    </p>
                  </div>

                  {/* عرض المنتجات الكلية كبديل ذكي */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {products &&
                      products.length > 0 &&
                      products.map((product) => (
                        <ShoppingProductTile
                          key={product._id}
                          product={product}
                        />
                      ))}
                  </div>
                </div>
              );
            }
          }

          // 2. حالة: أول ما يفتح الصفحة والخانة فاضية -> يعرض المنتجات العادية كلها
          if (products && products.length > 0) {
            return products.map((product) => (
              <ShoppingProductTile key={product._id} product={product} />
            ));
          }

          return null;
        })()}
      </div>
      <ProductDetailsDialog />
    </div>
  );
};

export default SearchProducts;
