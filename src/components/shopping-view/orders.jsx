import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogTrigger } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllOrderByUserId,
  getOrderDeatils,
  resetOrderDeatils,
} from "@/store/shop/order-slice";

import { Badge } from "../ui/badge";
import { fetchAllAddresses } from "@/store/shop/address-slice";
const ShoppingOrders = () => {
  const { orderList, orderDeatils } = useSelector((state) => state.shopOrder);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllAddresses({ userId: user?.id }));
  }, [user]);

  function handleFetchOrderDetails(id) {
    dispatch(resetOrderDeatils());
    dispatch(getOrderDeatils(id));
  }
  useEffect(() => {
    if (user) {
      dispatch(getAllOrderByUserId(user.id));
    }
  }, [user]);

  return (
    <Card>
      <CardHeader>
        <CardTitle> All Orders </CardTitle>
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
            {orderList && orderList.length > 0 ? (
              orderList.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell> {order.orderDate.split("T")[0]}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`py-1.5 px-4 font-medium rounded-xl flex items-center gap-2 border w-fit capitalize transition-colors ${
                        order?.orderStatus === "delivered"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                          : order?.orderStatus === "rejected"
                            ? "bg-red-50 text-red-700 border-red-200/60"
                            : order?.orderStatus === "pending"
                              ? "bg-amber-50 text-amber-700 border-amber-200/60"
                              : order?.orderStatus === "completed"
                                ? "bg-blue-50 text-blue-700 border-blue-200/60"
                                : order?.orderStatus === "inShipping"
                                  ? "bg-purple-50 text-purple-700 border-purple-200/60"
                                  : "bg-gray-50 text-gray-700 border-gray-200"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          order?.orderStatus === "delivered"
                            ? "bg-emerald-600"
                            : order?.orderStatus === "rejected"
                              ? "bg-red-600"
                              : order?.orderStatus === "pending"
                                ? "bg-amber-600"
                                : order?.orderStatus === "completed"
                                  ? "bg-blue-600"
                                  : "bg-gray-600"
                        }`}
                      />
                      {order?.orderStatus === "completed"
                        ? "Completed"
                        : order?.orderStatus === "inProgress"
                          ? "In Progress"
                          : order?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>${order.totalAmount}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="btn btn-primary cursor-pointer"
                          onClick={() => handleFetchOrderDetails(order?._id)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <ShoppingOrderDetailsView orderDeatils={orderDeatils} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  <p>No Order Available</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShoppingOrders;
