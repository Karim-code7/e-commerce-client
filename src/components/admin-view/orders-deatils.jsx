import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { toast } from "sonner";
import { useEffect } from "react";
import { fetchUser, setIsLoading } from "@/store/admin/user-slice";
import { Badge } from "../ui/badge";
import {
  getAllOrdersByAdmin,
  updateOrderStatus,
} from "@/store/admin/products-slice/order-slice";
const AdminOrdersDetailsView = ({
  handelDeatilsOpen,
  orderId,
  orderDeatils,
}) => {
  const initialFormData = {
    status: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const { userDeatils } = useSelector((state) => state.adminUser);
  const { isLoading } = useSelector((state) => state.adminOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    if (orderDeatils && orderDeatils.userId) {
      dispatch(fetchUser({ userId: orderDeatils?.userId }));
    }
  }, [dispatch, orderDeatils?.userId]);

  function handleUpdateStatus(event) {
    event.preventDefault();

    if (orderDeatils?.orderStatus === formData.status) {
      toast.error("Please select status", {
        style: {
          background: "red",
          color: "white",
          borderRadius: "10px",
          border: "1px solid red",
        },
      });
      return;
    }
    dispatch(setIsLoading());
    dispatch(
      updateOrderStatus({
        id: orderDeatils?._id,
        status: formData.status,
      }),
    ).then((data) => {
      dispatch(setIsLoading());
      if (data.payload.success) {
        toast.success(data.payload.message, {
          style: {
            background: "green",
            color: "white",
            borderRadius: "10px",
            border: "1px solid green",
          },
        });
        dispatch(getAllOrdersByAdmin());
        handelDeatilsOpen(orderId);
      } else {
        toast.error(data.payload.message, {
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
    if (orderDeatils) {
      setFormData({
        status: orderDeatils?.orderStatus,
      });
    }
  }, [orderDeatils]);

  return (
    <DialogContent className="sm:max-w-150 ">
      <DialogTitle className="hidden sr-only mt-6">Order Details</DialogTitle>
      {orderDeatils && orderDeatils?._id ? (
        <div className="grid gap-6 overflow-auto h-[600px]  ">
          <div className="grid gap-2">
            <div className="flex items-center justify-between mt-6 ">
              <p className="font-medium">Order ID</p>
              <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {orderDeatils?.cartId}
              </Label>
            </div>
            <div className="flex items-center justify-between mt-2 ">
              <p className="font-medium">Order Date</p>
              <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {orderDeatils?.orderDate?.split("T")[0]}
              </Label>
            </div>
            <div className="flex items-center justify-between mt-2 ">
              <p className="font-medium">Order Price</p>
              <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                ${orderDeatils?.totalAmount}
              </Label>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="font-medium">Order Status</p>

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
                    orderDeatils?.orderStatus === "Delivered"
                      ? "bg-emerald-600"
                      : orderDeatils?.orderStatus === "Rejected"
                        ? "bg-red-600"
                        : orderDeatils?.orderStatus === "Pending"
                          ? "bg-amber-600"
                          : orderDeatils?.orderStatus === "Completed"
                            ? "bg-blue-600"
                            : "bg-gray-600"
                  }`}
                />
                {orderDeatils?.orderStatus}
              </Badge>
            </div>
          </div>
          <Separator />
          <div className="grid gap-5">
            <div className="grid gap-2">
              <div className="font-medium"> Order Details</div>
              <ul className="grid gap-3">
                {orderDeatils?.cartItems?.map((item) => (
                  <li
                    key={item.productId}
                    className="flex flex-col justify-between gap-2"
                  >
                    <span>
                      ID: <span className="font-medium"> {item.productId}</span>
                    </span>
                    <span>
                      Title:
                      <span className="font-medium"> {item.title}</span>
                    </span>
                    <span>
                      Price:
                      <span className="font-medium"> ${item.price}</span>
                    </span>
                    <span>
                      Quantity:
                      <span className="font-medium"> {item.quantity}</span>
                    </span>
                    <span>
                      Total Price:
                      <span className="font-medium">
                        {" "}
                        ${item.price * item.quantity}
                      </span>
                    </span>
                    <Separator />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2 ">
              <div className="font-medium"> Shipping Info</div>
              <div className="grid gap-0.5 text-muted-foreground">
                <p>{userDeatils?.userName}</p>
                <p>{orderDeatils?.addressInfo?.address}</p>
                <p>{orderDeatils?.addressInfo?.city}</p>
                <p>{orderDeatils?.addressInfo?.pincode}</p>
                <p>{orderDeatils?.addressInfo?.phone}</p>
                <p>{orderDeatils?.addressInfo?.notes}</p>
              </div>
            </div>
          </div>
          <div className="">
            <CommonForm
              formControl={[
                {
                  Label: "Order Status",
                  name: "status",
                  componentType: "select",
                  options: [
                    { id: "Pending", label: "Pending" },
                    { id: "Completed", label: "Completed" },
                    { id: "Delivered", label: "Delivered" },
                    { id: "Rejected", label: "Rejected" },
                  ],
                },
              ]}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleUpdateStatus}
              buttonText={"Update order Status"}
              isBtnDisabled={isLoading}
            />
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

export default AdminOrdersDetailsView;
