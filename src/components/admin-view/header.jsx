import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { AlignJustify, LogOut } from "lucide-react";
import { logoutUser } from "@/store/auth-slice";
import { toast } from "sonner";
import { Sun } from "lucide-react";
import { useContext } from "react";
import { Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { UserCog } from "lucide-react";
import { useSelector } from "react-redux";

const AdminHeader = ({ setOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  function handleLogout() {
    dispatch(logoutUser()).then((data) => {
      if (data?.payload?.success) {
        toast.success("Logout success", {
          style: {
            background: "#008236",
            color: "var(--secondary)",
          },
        });
      }
    });
  }
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className=" flex item-center justify-between px-4 py-3 bg-background">
      <Button
        variant="default"
        onClick={() => setOpen(true)}
        className="lg:hidden sm:block "
      >
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="w-full flex">
        <div className="flex items-center ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarFallback className=" cursor-pointer bg-primary text-white font-extrabold text-lg">
                  {user?.userName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuLabel className="text-lg font-bold">
              {user?.email}
            </DropdownMenuLabel>
          </DropdownMenu>
        </div>
        <div className="flex flex-1 justify-end">
          <div className="flex justify-between gap-5">
            <div>
              <Button
                className="cursor-pointer inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
                onClick={() => toggleTheme()}
              >
                {isDarkMode ? <Sun /> : <Moon />}
                {isDarkMode ? "Light" : "Dark"}
              </Button>
            </div>
            <div>
              <Button onClick={handleLogout} className="cursor-pointer ">
                <LogOut />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
