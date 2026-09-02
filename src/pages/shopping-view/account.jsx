import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.jpg";
import ShoppingOrders from "@/components/shopping-view/orders";
import Address from "@/components/shopping-view/address";
const ShoppingAccount = () => {
  return (
    <div className="flex flex-col">
      <div className="relative h-75 w-full overflow-hidden">
        <img
          width={`1600`}
          height={`300`}
          style={{ aspectRatio: `1600/300`, objectFit: "cover" }}
          src={accImg}
          className="h-full w-full object- object-center "
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6  shadow-sm ">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger className="cursor-pointer" value="orders">
                Orders
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="address">
                Address
              </TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ShoppingAccount;
