import bannerOne from "../../assets/4021598.webp";
import bannerTwo from "../../assets/4028472.webp";
import bannerThree from "../../assets/4021545.webp";
import {} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ShirtIcon,
  CloudLightning,
  BabyIcon,
  WatchIcon,
  UmbrellaIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllFiltred } from "@/store/shop/product-slice";
import { useSelector } from "react-redux";
import ShppingProductTile from "./product-tile";
import ProductDetailsDialog from "./product-details";
import { Shirt } from "lucide-react";
import { WashingMachine } from "lucide-react";
import { ShoppingBasket } from "lucide-react";
import { Airplay } from "lucide-react";
import { Images } from "lucide-react";
import { Heater } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductContext from "@/context/ProductContext";
import { useContext } from "react";
import { getFeatureImages } from "@/store/common";
const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "levi", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];

const ShoppingHome = () => {
  const { setFilter } = useContext(ProductContext);

  const [currentSlide, setCurrentSlide] = useState(0);

  const { products } = useSelector((state) => state.shopProducts);
  const { allImageFeatures } = useSelector((state) => state.featureImage);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const featuredProducts = products.slice(0, 4);

  function handleNavigateToListingPage(getCurrentItem, section) {
    if (section === "category") {
      const currentFilters = { category: [getCurrentItem.id] };
      setFilter(currentFilters);
      navigate(`/shop/listing`);
    } else if (section === "brand") {
      const currentFilters = { brand: [getCurrentItem.id] };
      setFilter(currentFilters);
      navigate(`/shop/listing`);
    }
  }
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(
        (prevSlide) => (prevSlide + 1) % allImageFeatures?.length,
      );
    }, 50000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(
      fetchAllFiltred({ filterParams: {}, sortParams: "price-lowtohigh" }),
    );
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex  pt-16   flex-col min-h-screen  ">
      <div className="relative w-full h-40 sm:h-100 lg:h-140 2xl:h-160  overflow-hidden ">
        {allImageFeatures.map((slide, index) => (
          <img
            src={slide.imageUrls[0]}
            key={index}
            alt=""
            className={` ${index === currentSlide ? "opacity-100" : "opacity-0"} absolute top-0 left-0 w-full h-full  transition-opacity duration-1000`}
          />
        ))}
        <Button
          variant="default"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + allImageFeatures?.length) %
                allImageFeatures?.length,
            )
          }
          className="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer"
        >
          <ChevronLeftIcon className="w-4 h-4 text-white" />
        </Button>
        <Button
          variant="default"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide + 1 + allImageFeatures?.length) %
                allImageFeatures?.length,
            )
          }
          className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
        >
          <ChevronRightIcon className="w-4 h-4 text-white" />
        </Button>
      </div>
      <section className="    py-12  bg-slate-100 dark:bg-[#0B0F19]  ">
        <h2 className="text-3xl font-semibold text-center mb-8 ">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 container mx-auto px-4 ">
          {categoriesWithIcon.map((categoryItem, index) => (
            <Card
              key={index}
              onClick={() => handleNavigateToListingPage(categoryItem, "brand")}
              className="group relative cursor-pointer overflow-hidden transition-all duration-300
                 /* ألوان الـ Light Mode */
                 bg-white rounded-xl border border-gray-200 hover:border-indigo-500/50 hover:shadow-md
                 /* ألوان الـ Dark Mode */
                 dark:bg-[#111622] dark:border-[#1e2538] dark:hover:border-[#4f46e5]/50 dark:hover:shadow-[0_0_20px_rgba(79,70,229,0.15)]"
            >
              <CardContent className="flex flex-col items-center justify-center p-6">
                {/* الأيقونة */}
                <categoryItem.icon className="w-12 h-12 mb-4   dark:text-[#4f46e5] transition-transform duration-300 group-hover:scale-110 group-hover:text-[#6366F1]" />

                {/* النص */}
                <span className="font-bold text-gray-700 dark:text-[#F9FAFB] dark:group-hover:text-white transition-colors duration-300">
                  {categoryItem.label}
                </span>

                {/* الخط العلوي السحري */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-[#6366F1] shadow-[0_0_12px_rgba(99,102,241,0.6)] transition-all duration-300 group-hover:w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="    py-12  bg-slate-100 text-black dark:bg-[#0B0F19] dark:text-[#F9FAFB] ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8 ">
            Shop by Brand
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((categoryItem, index) => (
              <Card
                key={index}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "brand")
                }
                className="group relative cursor-pointer overflow-hidden transition-all duration-300
                 /* ألوان الـ Light Mode */
                 bg-white rounded-xl border border-gray-200 hover:border-indigo-500/50 hover:shadow-md
                 /* ألوان الـ Dark Mode */
                 dark:bg-[#111622] dark:border-[#1e2538] dark:hover:border-[#4f46e5]/50 dark:hover:shadow-[0_0_20px_rgba(79,70,229,0.15)]"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  {/* الأيقونة */}
                  <categoryItem.icon className="w-12 h-12 mb-4   dark:text-[#4f46e5] transition-transform duration-300 group-hover:scale-110 group-hover:text-[#6366F1]" />

                  {/* النص */}
                  <span className="font-bold text-gray-700 dark:text-[#F9FAFB] dark:group-hover:text-white transition-colors duration-300">
                    {categoryItem.label}
                  </span>

                  {/* الخط العلوي السحري */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-[#6366F1] shadow-[0_0_12px_rgba(99,102,241,0.6)] transition-all duration-300 group-hover:w-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="    py-12  bg-slate-100 text-black dark:bg-[#0B0F19] dark:text-[#F9FAFB] ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8  dark:text-gray-100">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts && featuredProducts.length > 0 ? (
              featuredProducts.map((productItem) => (
                <ShppingProductTile
                  key={productItem._id}
                  product={productItem}
                />
              ))
            ) : (
              <p className="text-center text-gray-400 col-span-full">
                No products found.
              </p>
            )}
          </div>
        </div>
      </section>
      <ProductDetailsDialog />
    </div>
  );
};

export default ShoppingHome;
