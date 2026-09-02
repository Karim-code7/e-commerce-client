import React from "react";
import ProductFilter from "./filter";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { fetchAllFiltred } from "@/store/shop/product-slice"; //
import { sortOptions } from "@/config"; //
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ShoppingProductTile from "./product-tile";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "./product-details";
import { useContext } from "react";
import ProductContext from "../../context/ProductContext";

const ShoppingListing = () => {
  const dispatch = useDispatch();

  const [sort, setSort] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const { products, filters, setFilter } = useContext(ProductContext);
  function handleSortChange(value) {
    setSort(value);
  }

  function handleFilter(getCurrentoptions, getSectionId) {
    let cpyFilters = { ...filters };

    const indexOfCurrentSection =
      Object.keys(cpyFilters).indexOf(getCurrentoptions);
    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getCurrentoptions]: [getSectionId],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getCurrentoptions].indexOf(getSectionId);
      if (indexOfCurrentOption === -1) {
        cpyFilters[getCurrentoptions].push(getSectionId);
      } else {
        cpyFilters[getCurrentoptions].splice(indexOfCurrentOption, 1);
      }
    }
    setFilter(cpyFilters);

    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFiltred({
          filterParams: filters,
          sortParams: sort,
        }),
      );
  }, [dispatch, filters, sort]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSort(`price-lowtohigh`);
  }, []);

  function createSearchParamsHelper(filterParams) {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");

        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }

    return queryParams.join("&");
  }

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const creatQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(creatQueryString));
    }
  }, [filters, setSearchParams]);

  return (
    <div className="grid grid-cols-1 mt-16  md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6   dark:bg-[#0B0F19] ">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm border-b dark:bg-[#0B0F19]">
        <div className="p-4 border-b flex   items-center justify-between">
          <h2 className="text-lg font-semibold "> All Products</h2>
          <div className="flex items-center gap-3 ">
            <span className="text-muted-foreground ">
              {products?.length || 0} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-50">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={handleSortChange}
                >
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem key={option.id} value={option.id}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-5">
          {/* Product items will be rendered here */}
          {products.length > 0 &&
            products.map((productItem) => (
              <ShoppingProductTile
                key={productItem._id}
                product={productItem}
              />
            ))}
        </div>
      </div>
      <ProductDetailsDialog />
    </div>
  );
};

export default ShoppingListing;
