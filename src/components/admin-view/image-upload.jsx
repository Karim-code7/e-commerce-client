import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  setFileError,
  imageLoadingState,
  isEditMode,
  isCustomStyling = false,
  isMultiple = true,
}) => {
  const inputRef = useRef(null);
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  // 1️⃣ دالة حذف صورة معينة بناءً على الـ index بتاعها
  // 1️⃣ دالة فحص أحجام الصور (فلترة الملفات التي تتعدى 5 ميجا)
  const validateAndFilterFiles = (filesList) => {
    return filesList.filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        setFileError(`File "${file.name}" is too large. Max size is 5MB.`);
        return false;
      }
      return true;
    });
  };

  // 2️⃣ الدالة الموحدة لتحديث الـ State وفحص الحد الأقصى (5 صور)
  const updateImageFile = (filesList) => {
    if (filesList.length === 0) return; // إذا لم تكن هناك ملفات صالحة بعد الفلترة، لا تفعل شيئاً

    const currentLength = Array.isArray(imageFile) ? imageFile.length : 0;

    // فحص هل الإجمالي (القديم + الجديد) سيتخطى 5 صور
    if (currentLength + filesList.length > 5) {
      setFileError("You can only upload a maximum of 5 images");
      return;
    }

    // تحديث الحالة وإضافة الصور الجديدة
    setImageFile((prev) => [
      ...(Array.isArray(prev) ? prev : []),
      ...filesList,
    ]);
    setFileError(null); // تصفير الأخطاء لأن العملية تمت بنجاح
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // 3️⃣ دالة اختيار الملفات بالطريقة التقليدية (Browse)
  const handleImageFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = validateAndFilterFiles(selectedFiles);
    updateImageFile(validFiles); // تمرير الملفات للدالة الموحدة 🌟
  };

  // 4️⃣ دالة الـ Drop (السحب والإفلات)
  function handleDrop(event) {
    event.preventDefault();
    if (isEditMode) return;

    const droppedFiles = Array.from(event.dataTransfer.files);
    const validFiles = validateAndFilterFiles(droppedFiles);

    // تم التعديل هنا واستدعاء الدالة الموحدة لسد الثغرة ومنع التكرار 🌟
    updateImageFile(validFiles);
  }

  // 5️⃣ دالة السماح بالسحب فوق العنصر (إلزامية لكي يعمل الـ Drop)
  function handleDragOver(event) {
    event.preventDefault();
  }

  // 6️⃣ دالة حذف صورة معينة وتصفير الـ input
  function handleRemoveImage(indexToRemove) {
    setImageFile((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    if (inputRef.current) {
      inputRef.current.value = ""; // تصفير القيمة لإتاحة إعادة اختيار نفس الملف
    }
  }
  return (
    <div
      className={`w-full  mt-4 ${isCustomStyling ? "" : " max-w-md mx-auto"}`}
    >
      <Label className="text-lg font-semibold mb-2 block">
        Upload Images (Up to 5)
      </Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${isEditMode ? "opacity-40" : ""} border-2 border-dashed rounded-lg sm:p-4 p-2 flex flex-col gap-3`}
      >
        <Input
          id="image-upload"
          type="file"
          multiple={isMultiple} // تفعيل اختيار كذا صورة مع بعض
          ref={inputRef}
          className={`${imageFile && imageFile.length >= (isMultiple ? 5 : 1) ? "hidden" : "cursor-pointer"}`}
          onChange={handleImageFileChange}
          disabled={isEditMode || (imageFile && imageFile.length >= 5)}
        />

        {(!imageFile || imageFile.length === 0) && (
          <label
            className={`flex flex-col items-center justify-center h-32 text-sm font-semibold ${isEditMode ? "cursor-not-allowed" : "cursor-pointer"}`}
            htmlFor="image-upload"
          >
            <UploadCloudIcon className="sm:w-10 sm:h-10 text-muted-foreground mb-2" />
            <span className="text-[12px] sm:text-sm text-center">
              Drag & drop or click to upload images
            </span>
          </label>
        )}

        {imageLoadingState ? (
          <Skeleton className="bg-gray-100 h-12 w-full rounded-md" />
        ) : (
          imageFile &&
          imageFile.length > 0 && (
            <div className="flex flex-col gap-2 w-full">
              {imageFile.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between w-full gap-2 p-2 bg-muted/50 rounded-md border"
                >
                  <div className="flex items-center shrink-0">
                    <FileIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary mr-2" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium break-all flex-1">
                    {file?.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button" // تأمين عشان ما يعملش Submit للفورم بالخطأ
                    className="text-muted-foreground hover:text-destructive h-8 w-8"
                    onClick={() => handleRemoveImage(idx)}
                  >
                    <XIcon className="w-4 h-4" />
                    <span className="sr-only">Remove File</span>
                  </Button>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
