import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import {
  deleteFeatureImage,
  getFeatureImages,
  uploadImage,
} from "@/store/common";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

function AdminFeatures() {
  const [imageFile, setImageFile] = useState([]);

  const [imageError, setFileError] = useState(null);

  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { allImageFeatures, isLoading } = useSelector(
    (state) => state.featureImage,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function getAllFeatureImages() {
      try {
        dispatch(getFeatureImages());
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }
    getAllFeatureImages();
  }, [dispatch]);

  async function FeatureImagesUpload() {
    setImageLoadingState(true);
    const data = new FormData();
    imageFile?.forEach((file) => {
      data.append("my_file", file);
    });

    await dispatch(uploadImage(data))
      .then((res) => {
        toast.success(res?.payload?.message);
        dispatch(getFeatureImages());
        setImageLoadingState(false);
        setImageFile(null);
      })
      .catch((err) => {
        toast.error(err?.message);
        setImageLoadingState(false);
        setFileError(err?.message);
      });
  }
  async function deleteImage(id) {
    await dispatch(deleteFeatureImage(id))
      .then(() => {
        toast.success("Image deleted successfully");
        dispatch(getFeatureImages());
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  }

  return (
    <div>
      <h1 className="text-4xl  dark:text-gray-100 text-gray-800 mb-6 ml-4">
        Upload Features Images
      </h1>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
        setFileError={setFileError}
        isMultiple={false}
      />
      <div
        className={`text-sm mt-2 ${imageError ? "text-red-500 font-medium animate-shake" : "text-muted-foreground"}`}
      >
        {imageError
          ? imageError
          : "Fill in the details to upload an image for the features."}
      </div>
      <Button
        className={`w-full mt-5 ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
        onClick={FeatureImagesUpload}
        disabled={!imageFile || imageFile.length === 0 || imageLoadingState}
      >
        {isLoading ? "Uploading..." : "Upload Images"}
      </Button>

      {/* شبكة توزيع الصور (Grid) */}
      <div className="flex flex-col gap-4 mt-5">
        <div className="w-full  dark:bg-gray-800  bg-white mt-6 border rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold dark:text-gray-100 text-gray-800 mb-4">
            Uploaded Feature Images
          </h3>

          {/* شبكة توزيع الصور (Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            {allImageFeatures && allImageFeatures.length > 0 ? (
              allImageFeatures.map((image) => (
                <div
                  key={image._id}
                  className="flex flex-col rounded-xl  shadow-sm hover:shadow-md transition-shadow duration-350"
                >
                  {/* حاوية الصورة الأساسية لضمان أبعاد متناسقة وثابتة */}
                  <div className="w-full overflow-hidden rounded-lg  flex items-center justify-center">
                    <img
                      src={image.imageUrls[0]}
                      alt="Feature Image"
                      className="object-cover  transition-transform duration-300 hover:scale-102"
                    />
                  </div>

                  {/* زرار الحذف متاح دائماً تحت الصورة بشكل واضح واحترافي لـ لوحة التحكم */}
                  <div className="mt-3 pt-2  ">
                    <Button
                      variant="default"
                      onClick={() => deleteImage(image._id)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      Delete Image
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm col-span-full text-center py-8">
                No feature images uploaded yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminFeatures;
