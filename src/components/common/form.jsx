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
}) => {
  function renderInputByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || formData["orderStatus"];

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            className="bg-accent "
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value || ""}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
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
      <Button
        type="submit"
        className={`mb-8 mt-2 w-full ${isBtnDisabled ? "cursor-not-allowed" : ""}`}
        disabled={isBtnDisabled}
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
