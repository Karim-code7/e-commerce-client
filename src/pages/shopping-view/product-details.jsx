import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { StarIcon } from "lucide-react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { ProductContext } from "../../context/ProductContext";
import StarRatingComponent from "@/components/common/star-rating";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addReview, getReview } from "@/store/shop/review-slice";
import { useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
function ProductDetailsDialog() {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const { productDeatails } = useSelector((state) => state.shopProducts);
  const { isLoding } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { reviews, isLoading } = useSelector((state) => state.shopReview);
  const { openDetailsDialog, setOpenDetailsDialog, handleAddToCart } =
    useContext(ProductContext);

  const [image, setImage] = useState(0);

  const handleOpenChange = () => {
    setOpenDetailsDialog(false);
  };

  const handleRatingChange = (getRating) => {
    setRating(getRating);
  };

  const disptach = useDispatch();

  function handleAddReview() {
    const reviewData = {
      userId: user?.id,
      productId: productDeatails?._id,
      userName: user?.userName,
      reviewMessage: reviewMsg,
      reviewValue: rating,
    };
    disptach(addReview(reviewData)).then((data) => {
      if (data?.payload?.success) {
        disptach(getReview(productDeatails?._id));
        setRating(0);
        setReviewMsg("");
        toast.success(data?.payload?.message || "review added successfully", {
          style: {
            background: "#008236",
            color: "var(--secondary)",
          },
        });
      } else {
        disptach(getReview(productDeatails?._id));

        toast.error(data?.payload?.message, {
          style: {
            background: "red",
            color: "white",
            borderRadius: "10px",
            border: "1px solid red",
          },
        });
      }
    });
  }
  useEffect(() => {
    setRating(0);
    setReviewMsg("");
    setImage(0);
    disptach(getReview(productDeatails?._id));
  }, [productDeatails?._id, disptach]);
  const hasSalePrice = productDeatails?.salePrice > 0;

  const averageReview =
    reviews?.length > 0
      ? (
          reviews?.reduce((acc, review) => acc + review.reviewValue, 0) /
          reviews?.length
        ).toFixed(2)
      : 0;

  return (
    <Dialog open={openDetailsDialog} onOpenChange={handleOpenChange}>
      {/* 1. إضافة overflow-y-auto وتحديد max-h لضمان السكرول في الموبايل */}
      <DialogContent className="max-w-[50vw] sm:max-w-[40vw] lg:max-w-[60vw] 2xl:max-w-[45vw] max-h-[70vh] overflow-y-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-4">
        <DialogTitle className="sr-only">Product Details</DialogTitle>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {/* 2. حاوية الصورة - ثابتة الأبعاد في الموبايل لتجنب التمطيط */}

          <div className="flex flex-col gap-4 h-full">
            <div className="  aspect-square lg:aspect-auto">
              <img
                src={productDeatails?.image[image]}
                alt={productDeatails?.title}
                className="w-full min-h-87.5 object-cover rounded-md"
              />
            </div>
            <div className="  aspect-square grid grid-cols-4 gap-2 lg:aspect-auto h-37.5 ">
              {productDeatails?.image?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={productDeatails?.title}
                  className="max-w-full h-37.5 object-cover rounded-md"
                  onClick={() => setImage(index)}
                />
              ))}
            </div>
          </div>
          {/* 3. قسم المعلومات */}
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
                {productDeatails?.title}
              </h1>
              <p className="text-muted-foreground mt-2 text-sm lg:text-base leading-relaxed wrap-break-word">
                {productDeatails?.description}
              </p>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span
                  className={`text-xl lg:text-2xl font-bold ${
                    hasSalePrice
                      ? "line-through text-muted-foreground text-lg"
                      : "text-primary"
                  }`}
                >
                  ${productDeatails?.price?.toFixed(2)}
                </span>
                {hasSalePrice && (
                  <span className="text-xl lg:text-2xl font-bold text-primary">
                    ${productDeatails.salePrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* التقييم */}
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-0.5">
                  {[...Array(Math.round(averageReview))].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="w-4 h-4 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">({averageReview})</span>
              </div>
            </div>

            <Button
              onClick={() =>
                handleAddToCart(
                  productDeatails?._id,
                  productDeatails?.totalStock,
                )
              }
              className="w-full py-6 text-lg font-semibold shadow-md  cursor-pointer"
              disabled={isLoding || productDeatails?.totalStock <= 0}
            >
              {productDeatails?.totalStock <= 0
                ? "Out of Stock"
                : "Add to Cart"}
            </Button>

            <Separator className="my-2" />

            {/* 4. قسم المراجعات - تحديد ارتفاع داخلي للسكرول */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center min-h-50 gap-2 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="text-sm font-medium animate-pulse">
                  Loading reviews...
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-bold">Reviews</h2>
                <div className="max-h-50 overflow-y-auto pr-2 flex flex-col gap-6 custom-scrollbar">
                  {reviews && reviews.length > 0 ? (
                    reviews?.map((review, idx) => (
                      <div key={idx} className="flex gap-4 items-start">
                        <Avatar className="h-10 w-10 shrink-0 border">
                          <AvatarFallback className="bg-black text-white font-bold">
                            {review.userName?.slice(0, 3).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1.5">
                          <h3 className="font-semibold text-sm">
                            {review.userName?.charAt(0).toUpperCase() +
                              review.userName?.slice(1)}
                          </h3>
                          <div className="flex items-center gap-0.5">
                            {[...Array(review?.reviewValue)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className="w-4 h-4 fill-yellow-500 text-yellow-500"
                              />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground leading-snug">
                            {review?.reviewMessage}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground">
                      No reviews yet
                    </div>
                  )}
                </div>

                {/* إدخال مراجعة جديدة */}
                <div className="mt-5 flex flex-col gap-3">
                  <Label>Write a review</Label>
                  <div className="flex  flex-col">
                    <div className="my-5 flex gap-2 ">
                      <StarRatingComponent
                        rating={rating}
                        handleRatingChange={handleRatingChange}
                      />
                    </div>
                    <Input
                      name="reviewMsg"
                      value={reviewMsg}
                      onChange={(event) => setReviewMsg(event.target.value)}
                      className="flex-1 mb-4 p-3"
                      placeholder="Write a review..."
                    />
                    <Button
                      disabled={rating == 0 || reviewMsg === ""}
                      className="shrink-0"
                      onClick={handleAddReview}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
