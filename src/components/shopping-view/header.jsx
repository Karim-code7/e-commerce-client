import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import { useEffect } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import UserCartWrapper from "./cart-wrapper";
import { Label } from "../ui/label";
import ProductContext from "../../context/ProductContext";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { shoppingViewHeaderMenuItems } from "@/config/index";
function MenuItems({ setOpen }) {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const { setFilter } = useContext(ProductContext);
  const navigate = useNavigate();
  function handleNavigate(getCurrentMenuItem) {
    const { id, path } = getCurrentMenuItem;

    if (setOpen) setOpen(false);

    const isCategory = !["home", "products", "search"].includes(id);

    if (isCategory) {
      const currentFilters = { category: [id] };
      sessionStorage.setItem("filters", JSON.stringify(currentFilters));
      setFilter(currentFilters);
      navigate(`${path}?category=${id}`);
    } else {
      sessionStorage.removeItem("filters");
      setFilter({});
      navigate(path);
    }
  }
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="flex flex-col gap-2 xl:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => {
        const isActive =
          menuItem.id === "home" ||
          menuItem.id === "search" ||
          (menuItem.id === "products" && !category)
            ? currentPath === menuItem.path
            : category === menuItem.id;

        return (
          <Label
            onClick={() => handleNavigate(menuItem)}
            key={menuItem.id}
            className={`flex items-center gap-2 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
              ${
                isActive
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
          >
            <menuItem.icon className="h-5 w-5 " />

            {menuItem.label}
          </Label>
        );
      })}
    </nav>
  );
}
function HeaderRightContent() {
  const disptch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  function handlelogout() {
    disptch(logoutUser());
  }
  useEffect(() => {
    disptch(fetchCartItems({ userId: user?.id }));
  }, [disptch]);

  return (
    <div className="flex lg:items-center   gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          className="cursor-pointer inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
          onClick={() => toggleTheme()}
        >
          {isDarkMode ? <Sun /> : <Moon />}
          {isDarkMode ? "Light" : "Dark"}
        </Button>
        <div className="relative">
          <Button
            onClick={() => setOpenCartSheet(true)}
            variant="outline"
            size="icon"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItems && cartItems.items && cartItems.items.length > 0 && (
              <div className="absolute -top-2 right-0 text-sm bg-red-500 w-4 h-4 rounded-full text-white flex items-center justify-center">
                {cartItems && cartItems.items && cartItems.items.length}
              </div>
            )}

            <span className="sr-only">User cart</span>
          </Button>
        </div>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="dark:bg-slate-700 bg-black">
            <AvatarFallback className="dark:bg-slate-700 bg-black text-white font-extrabold text-lg">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div
              onClick={() => navigate("/shop/account")}
              className="flex  items-center gap-4 w-full cursor-pointer"
            >
              <UserCog className=" h-4 w-4 " />
              Account
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer " onClick={handlelogout}>
            <LogOut className="mr-2 h-4 w-4" />
            LogOut
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
const ShoppingHeader = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  return (
    <header
      className="fixed top-0 z-40 w-full border-b transition-colors duration-300
                   /* ألوان الـ Light Mode */
                   bg-white/80 border-gray-200 backdrop-blur-md
                   /* ألوان الـ Dark Mode */
                   dark:bg-[#111725]/80 dark:border-[#1e2538] dark:backdrop-blur-md"
    >
      <div className="flex h-16  items-center sm:justify-between gap-4 lg:gap-0 px-4 md:px-6 ">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold hidden sm:block  ">Ecommerce</span>
        </Link>
        <div className="hidden xl:block ">
          <MenuItems />
        </div>
        <div className="flex justify-center items-center gap-6 mr-6 ml-6 lg:mr-0 ">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="xl:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle header menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-75 sm:w-100 flex flex-col p-0"
            >
              {/* الجزء العلوي: اللوجو */}
              <div className="p-6 border-b">
                <SheetHeader className="text-left">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary p-1.5 rounded-lg text-primary-foreground">
                      <HousePlug className="h-6 w-6" />
                    </div>
                    <SheetTitle className="text-xl font-bold tracking-tight">
                      Ecommerce
                    </SheetTitle>
                  </div>
                </SheetHeader>
              </div>

              {/* الجزء الأوسط: القائمة مع Scroll */}
              <div className="flex-1 overflow-y-auto p-4 flex-col custom-scrollbar">
                <MenuItems setOpen={setOpen} />
              </div>

              {/* الجزء السفلي: معلومات المستخدم أو الإعدادات */}
              <div className="p-4 border-t bg-muted/30">
                <div className="flex items-center gap-3 px-2 py-2">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={user?.image} />
                    <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold truncate w-37.5">
                      {user?.userName}
                    </span>
                    <span className="text-xs text-muted-foreground truncate w-37.5">
                      {user?.email}
                    </span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex">
            {isAuthenticated && (
              <div className="">{<HeaderRightContent />}</div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
