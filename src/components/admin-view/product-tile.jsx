import React from "react";
import { TableRow, TableCell } from "../ui/table"; // تأكد من مسار مكونات الجدول لديك
import { Button } from "../ui/button";
import { getProductDeatilsForAdmin } from "@/store/admin/products-slice";

const AdminProductTile = ({
  product,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  setFormData,
  handleDelete,
  handleDetailsProduct,
  setImageFile,
}) => {
  const optimizedUrls = Array.isArray(product?.image)
    ? product.image.map((img) =>
        img?.replace("/upload/", "/upload/f_auto,q_auto/"),
      )
    : [];

  const isOutOfStock = product.totalStock <= 0;
  const statusText = isOutOfStock ? "Out of Stock" : "Active";

  return (
    <TableRow className=" transition-colors text-center">
      {/* 1. عمود المنتج (الصورة + الاسم + الفئة) */}
      <TableCell className="py-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden border  shrink-0">
            <img
              src={optimizedUrls[0]}
              alt={product?.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-medium dark:text-gray-200 text-gray-900 text-sm">
              {product?.title}
            </span>
            <span className="text-xs dark:text-gray-400 text-gray-600 capitalize">
              {product?.category || "Category"}
            </span>
          </div>
        </div>
      </TableCell>

      <TableCell className="py-4 text-sm dark:text-gray-300 text-gray-600">
        {new Date(product?.createdAt).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </TableCell>
      {/* 2. عمود السعر */}
      <TableCell className="py-4 font-medium dark:text-gray-300 text-gray-600 text-center">
        {product?.salePrice > 0 ? (
          <div className="flex flex-col">
            <span className="text-sm font-semibold">${product?.salePrice}</span>
            <span className="text-xs dark:text-gray-300 text-gray-600 line-through">
              ${product?.price}
            </span>
          </div>
        ) : (
          <span className="text-sm font-semibold ">${product?.price}</span>
        )}
      </TableCell>

      {/* 3. عمود المخزون */}
      <TableCell className="py-4 text-sm dark:text-gray-300 text-gray-600">
        {product?.category}
      </TableCell>

      <TableCell className="py-4 text-sm dark:text-gray-300 text-gray-600">
        {product?.totalStock}
      </TableCell>

      {/* 4. عمود الحالة (Status Badge) */}
      <TableCell className="py-4">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-medium border ${
            !isOutOfStock
              ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
              : "bg-rose-50 text-rose-700 border-rose-200/60"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              !isOutOfStock ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
            }`}
          />
          {statusText}
        </span>
      </TableCell>

      {/* 5. عمود العمليات (Actions) */}
      <TableCell className="py-4 text-right">
        <div className="flex items-center gap-2 justify-end">
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
              setImageFile(true);
            }}
            className=" dark:text-gray-300 text-gray-600 hover:text-gray-100  bg-accent dark:bg-gray-600  dark:hover:bg-gray-400   font-medium text-sm cursor-pointer"
          >
            Edit
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => handleDelete(product?._id)}
            className=" bg-red-500 hover:bg-red-700 dark:text-white text-white font-medium text-sm cursor-pointer"
          >
            Delete
          </Button>
        </div>
      </TableCell>
      <TableCell className="py-4 text-sm dark:text-gray-300 text-gray-600">
        <Button
          variant="default"
          size="sm"
          onClick={() => {
            handleDetailsProduct(product?._id);
          }}
          className=" dark:text-gray-300 text-gray-600 hover:text-gray-100  bg-accent dark:bg-gray-600  dark:hover:bg-gray-400   font-medium text-sm cursor-pointer"
        >
          Details
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default AdminProductTile;
