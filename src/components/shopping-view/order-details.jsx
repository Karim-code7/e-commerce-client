import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const ShoppingOrderDetailsView = ({ orderDeatils }) => {
  const { user } = useSelector((state) => state.auth);
  const { addresseList } = useSelector((state) => state.shopAddress);

  const findAddress =
    addresseList &&
    addresseList.find(
      (address) => address._id === orderDeatils?.addressInfo.addressId,
    );

  return (
    <DialogContent className="sm:max-w-150 overflow-auto max-h-[500px]">
      <DialogTitle className="hidden sr-only mt-6">Order Details</DialogTitle>

      {orderDeatils ? (
        <div className="grid gap-6  ">
          <div className="grid gap-2">
            <div className="flex items-center justify-between  ">
              <p className="font-medium">Order ID</p>
              <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {orderDeatils?._id}
              </Label>
            </div>
            <div className="flex items-center justify-between mt-2 ">
              <p className="font-medium">Order Date</p>
              <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {orderDeatils?.orderDate.split("T")[0]}
              </Label>
            </div>
            <div className="flex items-center justify-between mt-2 ">
              <p className="font-medium">Order Price</p>
              <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                ${orderDeatils?.totalAmount}
              </Label>
            </div>
            <div className="flex items-center justify-between mt-2 ">
              <p className="font-medium">Payment Method</p>
              <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {orderDeatils?.paymentMethods}
              </Label>
            </div>
            <div className="flex items-center justify-between mt-2 ">
              <p className="font-medium">Payment Status </p>
              <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {orderDeatils?.paymentStatus}
              </Label>
            </div>
            <div className="flex items-center justify-between mt-2 ">
              <p className="font-medium">Order Status</p>
              <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                <Badge
                  variant="outline"
                  className={`py-1.5 px-4 font-medium rounded-xl flex items-center gap-2 border w-fit capitalize transition-colors ${
                    orderDeatils?.orderStatus === "delivered"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                      : orderDeatils?.orderStatus === "rejected"
                        ? "bg-red-50 text-red-700 border-red-200/60"
                        : orderDeatils?.orderStatus === "pending"
                          ? "bg-amber-50 text-amber-700 border-amber-200/60"
                          : orderDeatils?.orderStatus === "completed"
                            ? "bg-blue-50 text-blue-700 border-blue-200/60"
                            : "bg-gray-50 text-gray-700 border-gray-200"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      orderDeatils?.orderStatus === "delivered"
                        ? "bg-emerald-600"
                        : orderDeatils?.orderStatus === "rejected"
                          ? "bg-red-600"
                          : orderDeatils?.orderStatus === "pending"
                            ? "bg-amber-600"
                            : orderDeatils?.orderStatus === "completed"
                              ? "bg-blue-600"
                              : "bg-gray-600"
                    }`}
                  />
                  {orderDeatils?.orderStatus}
                </Badge>
              </Label>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4">
            <DialogTitle className="hidden sr-only mt-6">
              Order Details
            </DialogTitle>

            <div className="grid gap-2">
              <div className="font-medium"> Order Details</div>
              <ul className="grid gap-3">
                {orderDeatils &&
                  orderDeatils.cartItems.map((product) => (
                    <li className="flex flex-col justify-between p-2 border-b">
                      <span> Product Name :{product?.productId}</span>
                      <span> Title : {product?.title}</span>
                      <span> Quantity : {product?.quantity}</span>
                      <span> Price : ${product?.price}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-4">
              <div className="grid gap-2 ">
                <div className="font-medium"> Shipping Info</div>
                <div className="grid gap-0.5 text-muted-foreground">
                  <p>{user?.userName}</p>
                  <p>{findAddress?.address}</p>
                  <p>{findAddress?.city}</p>
                  <p>{findAddress?.pincode}</p>
                  <p>{findAddress?.phone}</p>
                  <p>{findAddress?.notes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[200px] gap-2">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-muted-foreground animate-pulse">
            Loading order details...
          </p>
        </div>
      )}
    </DialogContent>
  );
};

export default ShoppingOrderDetailsView;
