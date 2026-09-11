import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config/index";
import { lognUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  function onSubmit(event) {
    event.preventDefault();
    dispatch(lognUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message, {
          style: {
            background: "#008236",
            color: "var(--secondary)",
          },
        });
      } else {
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
      />
    </div>
  );
}

export default AuthLogin;
