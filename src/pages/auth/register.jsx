import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config/index";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  userName: "",
  email: "",
  password: "",
};
function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  function onSubmit(event) {
    event.preventDefault();
    if (
      formData.email.trim() === "" ||
      formData.password.trim() === "" ||
      formData.userName.trim() === ""
    ) {
      setMessage("Please fill in all fields");
      toast.warning("Please fill in all fields", {
        style: {
          background: "var(--destructive)",
          color: "var(--secondary)",
        },
      });
      return;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setMessage("Please enter a valid email address");
        toast.warning("Please enter a valid email address", {
          style: {
            background: "var(--destructive)",
            color: "var(--secondary)",
          },
        });
        return;
      }
      const passwordRegex = /^(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
      if (!passwordRegex.test(formData.password)) {
        setMessage(
          "Password must be 8-16 characters long and contain at least one letter",
        );
        toast.warning(
          "Password must be 8-16 characters long and contain at least one letter",
          {
            style: {
              background: "var(--destructive)",
              color: "var(--secondary)",
            },
          },
        );
        return;
      }
    }
    if (formData.userName.length < 3 || formData.userName.length > 20) {
      setMessage("Username must be between 3 and 20 characters long");
      toast.warning("Username must be between 3 and 20 characters long", {
        style: {
          background: "var(--destructive)",
          color: "var(--secondary)",
        },
      });
      return;
    }
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message, {
          style: {
            background: "#008236",
            color: "var(--secondary)",
          },
        });
        navigate("/auth/login");
      } else {
        toast.warning(data?.payload?.message, {
          style: {
            background: "var(--destructive)",
            color: "var(--secondary)",
          },
        });
      }
    });
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <span className="mt-2">Already have an account</span>

        <Link
          className="font-medium ml-2 text-primary hover:underline"
          to="/auth/login"
        >
          Login
        </Link>
      </div>
      <CommonForm
        formControl={registerFormControls}
        buttonText={`Sign Up`}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        isBtnDisabled={
          !(
            formData.email &&
            formData.password.length >= 8 &&
            formData.userName
          )
        }
        isLoading={isLoading}
        message={message}
        passwordVisible={passwordVisible}
        setPasswordVisible={setPasswordVisible}
      />
    </div>
  );
}

export default AuthRegister;
