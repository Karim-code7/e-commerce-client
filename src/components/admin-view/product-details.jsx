import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const ProductDetails = ({
  openDetailsDialog,
  setOpenDetailsDialog,
  selectedProductDetails,
}) => {
  return (
    <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-950">
            Product Details
          </DialogTitle>
        </DialogHeader>

        {selectedProductDetails && (
          <div className="mt-4 space-y-4 text-sm text-gray-600">
            {/* صورة المنتج */}
            <div className="w-full h-48 rounded-lg overflow-hidden border bg-gray-50">
              <img
                src={selectedProductDetails?.image?.[0]}
                alt={selectedProductDetails?.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* تفاصيل النصوص */}
            <div className="grid grid-cols-2 gap-4 border-b pb-4">
              <div>
                <span className="text-xs font-semibold uppercase text-gray-400 block">
                  Name
                </span>
                <span className="font-medium text-gray-900">
                  {selectedProductDetails?.title}
                </span>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-gray-400 block">
                  Brand
                </span>
                <span className="font-medium text-gray-900 capitalize">
                  {selectedProductDetails?.brand || "N/A"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-b pb-4">
              <div>
                <span className="text-xs font-semibold uppercase text-gray-400 block">
                  Price / Sale Price
                </span>
                <span className="font-medium text-gray-900">
                  ${selectedProductDetails?.price} / $
                  {selectedProductDetails?.salePrice || 0}
                </span>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-gray-400 block">
                  Stock
                </span>
                <span className="font-medium text-gray-900">
                  {selectedProductDetails?.totalStock} units
                </span>
              </div>
            </div>

            {/* الوصف الكامل */}
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400 block mb-1">
                Description
              </span>
              <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                {selectedProductDetails?.description ||
                  "No description provided for this product."}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
