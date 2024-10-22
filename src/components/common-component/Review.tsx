import { Rate } from "antd";

interface ReviewItemProps {
  name: string;
  date: string;
  rating: number;
  content: string;
}

const Review: React.FC<ReviewItemProps> = ({ name, date, rating, content }) => {
  return (
    <div className="w-[23rem] h-60 border rounded-lg p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <Rate disabled defaultValue={rating} className="text-yellow-400" />
      </div>
      <p className="text-xs text-gray-500 mb-3">{date}</p>
      <p className="text-sm text-gray-700">{content}</p>
    </div>
  );
};

export default Review;
