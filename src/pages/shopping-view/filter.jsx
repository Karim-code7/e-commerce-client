import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { filterOptions } from "@/config";
import { Fragment } from "react";

const ProductFilter = ({ filters, handleFilter }) => {
  return (
    <div className="dark:bg-[#111725]   bg-background rounded-lg shadow-sm  ">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold "> Filters</h2>
      </div>
      <div className="p-4 space-y-4 ">
        {Object.keys(filterOptions).map((keyItem, index) => (
          <Fragment key={index}>
            <div>
              <h3 className="text-base font-bold"> {keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option, index) => (
                  <Label
                    key={index}
                    className="flex items-center gap-2 font-medium "
                  >
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem]?.indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
