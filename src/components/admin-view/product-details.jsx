import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const ProductDetails = ({
  openDetailsDialog,
  setOpenDetailsDialog,
  selectedProductDetails,
}) => {
  return (
    <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
      <DialogContent className="w-150 2xl:max-w-xl  rounded-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Product Details
          </DialogTitle>
        </DialogHeader>

        {selectedProductDetails && (
          /* تم تغيير flex إلى flex-col لجعل العناصر تحت بعضها */
          <div className="mt-4 space-y-6 text-sm w-full flex flex-col mx-auto">
            {/* صورة المنتج (تم تحديد ارتفاع مناسب وثابت للـ container الخاص بها) */}
            <div className="w-full h-72 rounded-lg overflow-hidden border bg-gray-50 shrink-0">
              <img
                src={selectedProductDetails?.image?.[0]}
                alt={selectedProductDetails?.title}
                className="w-full h-full "
              />
            </div>

            {/* تفاصيل النصوص */}
            <div className="space-y-4 w-full">
              <div className="grid grid-cols-2 gap-4 border-b pb-4">
                <div>
                  <span className="text-xs font-semibold uppercase text-gray-800 dark:text-gray-400 block">
                    Name
                  </span>
                  <span className="font-medium text-gray-900 dark:text-gray-400">
                    {selectedProductDetails?.title}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase text-gray-800 dark:text-gray-400 block">
                    Brand
                  </span>
                  <span className="font-medium text-gray-900 dark:text-gray-400 capitalize">
                    {selectedProductDetails?.brand || "N/A"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b pb-4">
                <div>
                  <span className="text-xs font-semibold uppercase text-gray-800 dark:text-gray-400 block">
                    Price / Sale Price
                  </span>
                  <span className="font-medium text-gray-900 dark:text-gray-400">
                    ${selectedProductDetails?.price} / $
                    {selectedProductDetails?.salePrice || 0}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase text-gray-800 dark:text-gray-400 block">
                    Stock
                  </span>
                  <span className="font-medium text-gray-900 dark:text-gray-400">
                    {selectedProductDetails?.totalStock} units
                  </span>
                </div>
              </div>

              {/* الوصف الكامل */}
              <div>
                <span className="text-xs font-semibold uppercase text-gray-800 dark:text-gray-400 block mb-1">
                  Description
                </span>
                <p className="text-gray-800 dark:text-gray-300 leading-relaxed p-3 rounded-lg border dark:bg-gray-900/50 break-all max-h-32 overflow-y-auto">
                  {selectedProductDetails?.description ||
                    "No description available."}
                </p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
