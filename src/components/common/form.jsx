import { ShowerHeadIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";

const type = {
  INPUT: "input",
  SELECT: "select",
};

const CommonForm = ({
  formControl,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
  message,
  isLoading,
  passwordVisible,
  setPasswordVisible,
}) => {
  function renderInputByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || formData["orderStatus"];
    const isPasswordField = getControlItem.type === "password";
    const isPassordVisible = isPasswordField
      ? passwordVisible
        ? "text"
        : "password"
      : getControlItem.type;
    switch (getControlItem.componentType) {
      case "input":
        element = (
          <div className="relative">
            <Input
              className="bg-accent "
              name={getControlItem.name}
              placeholder={getControlItem.placeholder}
              id={getControlItem.name}
              type={isPassordVisible}
              value={value || ""}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [getControlItem.name]: event.target.value,
                })
              }
            />
            {isPasswordField && formData?.password && (
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-all  hover:scale-110 "
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeClosed className="h-4 w-4" />
                )}
              </span>
            )}
          </div>
        );

        break;
      case "select":
        element = (
          <Select
            // 🌟 السحر كله هنا: الـ key بيخلي الـ Select يعيد بناء نفسه فوراً أول ما الـ value تتغير
            key={value}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value || ""} // حماية لو القيمة قادمة بـ undefined
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    // رجعها ديناميكية تماماً وشغلها لحساب الـ id
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          ></Textarea>
        );

        break;
    }
    return element;
  }
  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="flex flex-col gap-3">
        {formControl.map((controlitem) => (
          <div className="grid w-full gap-1.5" key={controlitem.name}>
            <label className="mb-1"> {controlitem.name}</label>
            {renderInputByComponentType(controlitem)}
          </div>
        ))}
      </div>
      <span className="text-sm text-destructive mt-2">{message}</span>
      <Button
        type="submit"
        className={`mb-8 w-full mt-6 ${isBtnDisabled ? "cursor-not-allowed" : ""}`}
        disabled={isBtnDisabled}
      >
        {isLoading ? (
          <svg className="loadingSvg " viewBox="25 25 50 50">
            <circle className="loadingCircle " r="20" cy="50" cx="50"></circle>
          </svg>
        ) : (
          buttonText || "Submit"
        )}
      </Button>
    </form>
  );
};

export default CommonForm;
