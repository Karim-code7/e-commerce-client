import { ChartNoAxesCombined } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, LayoutDashboard, ShoppingBasket } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Star } from "lucide-react";
const adminSidebarMenuitems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
  {
    id: "features",
    label: "Features",
    path: "/admin/features",
    icon: <Star size={25} />,
  },
];

function MenuItems({ setOpen }) {
  const currentPath = location.pathname;

  const navigate = useNavigate();

  return (
    <nav className=" mt-4 flex-col flex gap-2">
      {adminSidebarMenuitems.map((menuitem) => (
        <div
          key={menuitem.id}
          onClick={() => {
            navigate(menuitem.path);
            setOpen?.(false); // طريقة مختصرة واحترافية للتحقق والاستدعاء
          }}
          className={`flex items-center gap-3 rounded-xl px-4 py-3 cursor-pointer transition-all duration-200 font-medium text-sm
    ${
      menuitem.path === currentPath
        ? "text-primary bg-primary/10 border-l-4 border-primary shadow-sm shadow-primary/5 font-semibold"
        : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
    }`}
        >
          {/* الأيقونة */}
          <div
            className={`transition-colors ${menuitem.path === currentPath ? "text-primary" : "text-muted-foreground"}`}
          >
            {menuitem.icon}
          </div>

          {/* النص الجانبي */}
          <span className="tracking-wide">{menuitem.label}</span>
        </div>
      ))}
    </nav>
  );
}
const AdminSideBar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      {open ? (
        <div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="left" className="w-64 ">
              <div className="flex flex-col h-full">
                <SheetHeader className="border-b">
                  <SheetTitle className="flex gap-2 items-center mt-5 mb-5 ">
                    <ChartNoAxesCombined size={30} />
                    <span className="text-2xl font-semibold"> Admin Panel</span>
                  </SheetTitle>
                </SheetHeader>
                <MenuItems setOpen={setOpen} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      ) : (
        <aside className="hidden w-58 flex-col border-r border-border bg-card text-foreground lg:flex transition-colors duration-200">
          {/* الهيدر الخاص بالـ Sidebar */}
          <div
            onClick={() => navigate("/admin/dashboard")}
            className="flex cursor-pointer items-center gap-2 py-6 px-4 hover:bg-muted/30 transition-colors duration-150"
          >
            {/* تم تغيير لون الأيقونة إلى الـ primary البنفسجي المميز */}
            <ChartNoAxesCombined className="text-primary" size={30} />
            <div className="text-[22px] font-bold tracking-tight">
              Admin Panel
            </div>
          </div>

          {/* الخط الفاصل الناعم والمتوافق مع الـ Dark Mode */}
          <div className="border-b border-border w-full"></div>

          {/* قائمة العناصر */}
          <div className="py-4 px-3 flex-1 overflow-y-auto">
            <MenuItems />
          </div>
        </aside>
      )}
    </Fragment>
  );
};

export default AdminSideBar;
