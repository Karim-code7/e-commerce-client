import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog"; // 🌟 تم إزالة DialogTrigger لأنه لم يعد له حاجة
import AdminOrdersDetailsView from "./orders-deatils";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByAdmin,
  getOrderDeatilsForAdmin,
  setOrderDeatils,
} from "@/store/admin/products-slice/order-slice";
import { Badge } from "../ui/badge";

const AdminOrdersView = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { allOrders, orderDeatils } = useSelector((state) => state.adminOrders);
  const dispatch = useDispatch();

  function handelDeatilsOpen(cartId) {
    dispatch(setOrderDeatils());
    dispatch(getOrderDeatilsForAdmin({ id: cartId }));
    setOpenDetailsDialog(true);
  }

  useEffect(() => {
    dispatch(getAllOrdersByAdmin());
  }, [dispatch]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allOrders && allOrders.length > 0 ? (
                allOrders.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item._id}</TableCell>
                    <TableCell>{item.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline" // استخدام الـ outline لتسهيل التحكم أو إزالته تماماً
                        className={`py-1.5 px-4 font-medium rounded-xl flex items-center gap-2 border w-fit capitalize transition-colors ${
                          item?.orderStatus === "Delivered"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                            : item?.orderStatus === "Rejected"
                              ? "bg-red-50 text-red-700 border-red-200/60"
                              : item?.orderStatus === "Pending"
                                ? "bg-amber-50 text-amber-700 border-amber-200/60" // اللون البرتقالي الهادئ
                                : item?.orderStatus === "Completed"
                                  ? "bg-blue-50 text-blue-700 border-blue-200/60"
                                  : "bg-gray-50 text-gray-700 border-gray-200"
                        }`}
                      >
                        {/* 🌟 الدائرة الصغيرة (Status Dot) الملونة التي تظهر في التصميم */}
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item?.orderStatus === "Delivered"
                              ? "bg-emerald-600"
                              : item?.orderStatus === "Rejected"
                                ? "bg-red-600"
                                : item?.orderStatus === "Pending"
                                  ? "bg-amber-600"
                                  : item?.orderStatus === "Completed"
                                    ? "bg-blue-600"
                                    : "bg-gray-600"
                          }`}
                        />

                        {/* النص الخاص بالحالة */}
                        {item?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.totalAmount}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        onClick={() => handelDeatilsOpen(item?._id)}
                        className="btn btn-primary"
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={openDetailsDialog}
        onOpenChange={(open) => {
          setOpenDetailsDialog(open);
          if (!open) dispatch(setOrderDeatils());
        }}
      >
        <AdminOrdersDetailsView
          orderDeatils={orderDeatils}
          orderId={orderDeatils?._id}
          handelDeatilsOpen={handelDeatilsOpen}
        />
      </Dialog>
    </>
  );
};

export default AdminOrdersView;
