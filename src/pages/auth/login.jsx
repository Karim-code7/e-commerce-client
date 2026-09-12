import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config/index";
import { lognUser } from "@/store/auth-slice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  function onSubmit(event) {
    event.preventDefault();
    if (formData.email.trim() === "" || formData.password.trim() === "") {
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
    dispatch(lognUser(formData)).then((data) => {
      if (data?.payload?.success) {
        setMessage(data?.payload?.message);
        toast.success(data?.payload?.message, {
          style: {
            background: "#008236",
            color: "var(--secondary)",
          },
        });
      } else {
        setMessage(data?.payload?.message || "Connection  error ");

        toast.warning(data?.payload?.message || "Connection  error ", {
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
          Sign in to your acoount
        </h1>
        <span className="mt-2">Don't have an account</span>

        <Link
          className="font-medium ml-2 text-primary hover:underline"
          to="/auth/register"
        >
          Register
        </Link>
      </div>
      <CommonForm
        formControl={loginFormControls}
        buttonText={`Sign In`}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        message={message}
        isBtnDisabled={!(formData.email && formData.password.length >= 8)}
        isLoading={isLoading}
      />
    </div>
  );
}

export default AuthLogin;
