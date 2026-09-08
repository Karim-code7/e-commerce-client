import ProductImageUpload from "@/components/admin-view/image-upload";
import ProductDetails from "@/components/admin-view/product-details";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProduct,
  getProductDeatilsForAdmin,
} from "@/store/admin/products-slice";
import axios from "axios";
import { Plus } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const initialFormData = {
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};
const URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);

  const [formData, setFormData] = useState(initialFormData);

  const [imageFile, setImageFile] = useState([]);

  const [imageError, setFileError] = useState(null);

  const [imageLoadingState, setImageLoadingState] = useState(false);

  const [currentEditedId, setCurrentEditedId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 2;

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentProducts = productList
    ? productList.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const totalPages = productList
    ? Math.ceil(productList.length / itemsPerPage)
    : 0;

  const dispatch = useDispatch();

  async function onSubmit(event) {
    event.preventDefault();

    try {
      // 🌟 التعديل الجوهري: بنلف على الـ Array ونضيف كل الصور تحت نفس اسم الـ Key الموحد للباك إند "my_file"
      setImageLoadingState(true);
      // 🌟 الباك إند بيرجع Array خيوط [url1, url2, ...] بنحفظه بالكامل في الـ State
      currentEditedId !== null &&
        dispatch(editProduct({ formData, id: currentEditedId })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllProduct());
              setOpenCreateProductsDialog(false);
              setCurrentEditedId(null);
              setFormData(initialFormData);
              setImageLoadingState(false);
              toast.success("Product Edit successfully", {
                style: {
                  background: "#008236",
                  color: "var(--secondary)",
                },
              });
            }
          },
        );

      if (imageFile && imageFile.length > 0) {
        const dataFormImages = new FormData();
        imageFile?.forEach((file) => {
          dataFormImages.append("my_file", file);
        });

        const response = await axios.post(
          `${URL}/api/admin/products/upload-image`,
          dataFormImages,
          { withCredentials: true },
        );

        // 🌟 الباك إند بيرجع Array خيوط [url1, url2, ...] بنحفظه بالكامل في الـ State
        const finalImageUrls = response.data?.result;
        dispatch(
          addNewProduct({
            ...formData,
            image: finalImageUrls,
          }),
        ).then((data) => {
          if (data?.payload?.success) {
            setImageLoadingState(false);
            dispatch(fetchAllProduct());
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast.success("Product add successfully", {
              style: {
                background: "#008236",
                color: "var(--secondary)",
              },
            });
          }
        });
      }
    } catch (err) {
      setImageLoadingState(false);
      console.log(err);
    }
  }

  function handleDetailsProduct(id) {
    dispatch(getProductDeatilsForAdmin(id)).then((data) => {
      if (data?.payload?.success) {
        setSelectedProductDetails(data?.payload?.data);
        setOpenDetailsDialog(true);
      }
    });
  }
  function handleDelete(getCurrentPorjectId) {
    dispatch(deleteProduct(getCurrentPorjectId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProduct());

        toast.success("Product deleted successfully", {
          style: {
            background: "#008236",
            color: "var(--secondary)",
          },
        });
      }
    });
  }

  function isFormValide() {
    return Object.keys(formData)
      .filter((key) => key != "__v" && key != "averageReview")
      .map((key) => formData[key] != "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="w-full overflow-x-auto rounded-lg border  bg-card shadow-sm">
        <div className="flex justify-between items-center px-6 py-4 mb-4">
          <div>
            <h2 className="text-xl font-bold dark:text-gray-300 text-gray-800">
              All Products ({productList?.length || 0})
            </h2>
          </div>
          <Button
            onClick={() => setOpenCreateProductsDialog(true)}
            className=" text-white  cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>
        <div className="w-full overflow-x-auto rounded-sm border   shadow-sm">
          <table className="w-full border-collapse text-sm text-gray-500">
            <thead className=" text-xs uppercase  dark:text-gray-300  text-gray-600 font-semibold border-b ">
              <tr>
                <th scope="col" className="px-6 py-4 text-left">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-4 text-left">
                  CreatedAt
                </th>
                <th scope="col" className="px-6 py-4">
                  Price
                </th>
                <th scope="col" className="px-6 py-4">
                  Category
                </th>
                <th scope="col" className="px-6 py-4">
                  Stock
                </th>
                <th scope="col" className="px-6 py-4">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 ">
                  Action
                </th>
                <th scope="col" className="text-center ">
                  Detials
                </th>
              </tr>
            </thead>
            <tbody className="divide-y  bg-card  border-t ">
              {currentProducts && currentProducts.length > 0
                ? currentProducts.map((productItem) => (
                    <AdminProductTile
                      key={productItem?._id}
                      setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                      setCurrentEditedId={setCurrentEditedId}
                      setFormData={setFormData}
                      product={productItem}
                      handleDelete={handleDelete}
                      handleDetailsProduct={handleDetailsProduct}
                      setImageFile={setImageFile}
                    />
                  ))
                : null}
            </tbody>
          </table>

          {/* أزرار التنقل السفلي (Pagination UI) المطابقة للتصميم */}
          <div className="flex items-center justify-between border-t px-6 py-4 ">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium  border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← Previous
            </button>

            <div className="text-sm ">
              Page <span className="font-medium ">{currentPage}</span> of{" "}
              <span className="font-medium ">{totalPages || 1}</span>
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || totalPages === 0}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium   border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        <Sheet
          open={openCreateProductsDialog}
          onOpenChange={() => {
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
            setFormData(initialFormData);
          }}
        >
          <SheetContent side="right" className="overflow-auto px-5">
            <SheetHeader>
              <SheetTitle>
                {currentEditedId !== null ? "Edit Product" : " Add New Product"}
              </SheetTitle>
              <ProductImageUpload
                imageFile={imageFile}
                setImageFile={setImageFile}
                setFileError={setFileError}
                setImageLoadingState={setImageLoadingState}
                imageLoadingState={imageLoadingState}
                isEditMode={currentEditedId !== null}
              />
              <div>
                <SheetDescription
                  className={`text-sm mt-2 ${imageError ? "text-red-500 font-medium animate-shake" : "text-muted-foreground"}`}
                >
                  {imageError
                    ? imageError
                    : "Fill in the details to add a new product."}
                </SheetDescription>
              </div>
            </SheetHeader>
            <div className="">
              <CommonForm
                formControl={addProductFormElements}
                formData={formData}
                setFormData={setFormData}
                buttonText={currentEditedId !== null ? "Edit" : "Add"}
                onSubmit={onSubmit}
                isBtnDisabled={
                  !isFormValide() || imageLoadingState || imageFile.length < 1
                }
              />
            </div>
          </SheetContent>
        </Sheet>
        <ProductDetails
          openDetailsDialog={openDetailsDialog}
          setOpenDetailsDialog={setOpenDetailsDialog}
          selectedProductDetails={selectedProductDetails}
        />
      </div>
    </Fragment>
  );
}
export default AdminProducts;
