import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { capturePayment } from "@/store/shop/order-slice";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "react-router-dom";

const PaypalReturnPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerID = params.get("PayerID");
  const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

  setTimeout(() => {}, 2000);
  useEffect(() => {
    if (paymentId && payerID && orderId) {
      const orderData = {
        paymentId,
        payerID,
        orderId,
      };

      dispatch(capturePayment(orderData)).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          setTimeout(() => {
            window.location.href = "/shop/payment-success";
          }, 2000);
          toast.success("Payment captured successfully!", {
            style: {
              background: "#008236",
              color: "var(--secondary)",
            },
          });
        } else {
          toast.error(data?.payload?.message || "Payment capture failed!", {
            style: {
              background: "#ff0000",
              color: "var(--secondary)",
            },
          });
        }
      });
    }
  }, [dispatch, paymentId, payerID, orderId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment... Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default PaypalReturnPage;
