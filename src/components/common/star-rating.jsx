import { Star as StarIcon } from "lucide-react"; //  التعديل السحري هنا🌟
import { Button } from "../ui/button";

const StarRatingComponent = ({ rating, handleRatingChange }) => {
  return [1, 2, 3, 4, 5, 6].map((star, index) => (
    <Button
      key={index}
      variant="ghost"
      size="icon"
      className="hover:bg-transparent transition-all duration-200 group cursor-pointer  "
      onClick={() => handleRatingChange && handleRatingChange(star)}
    >
      <StarIcon
        className={`w-8 h-8 transition-all duration-300 transform scale-150  ${
          index + 1 <= rating
            ? "text-yellow-500 fill-yellow-500 drop-shadow-sm"
            : "text-gray-300 fill-transparent group-hover:scale-185 group-hover:text-yellow-400"
        }`}
      />
    </Button>
  ));
};

export default StarRatingComponent;
