import React from "react";
import { Rate } from "antd";

interface ProductCardProps {
  imageSrc: string;
  altText: string;
  title: string;
  currentPrice: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  isOnSale: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  altText,
  title,
  currentPrice,
  originalPrice,
  rating,
  reviewCount,
  isOnSale,
}) => {
  return (
    <div className="w-[17.5rem] p-4 rounded-lg hover:cursor-pointer bg-white">
      <div className="relative group">
        {isOnSale && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
            SALE
          </div>
        )}
        <img
          src={imageSrc}
          alt={altText}
          className="h-40 mx-auto object-contain mb-4 transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        <div className="absolute left-8 flex bottom-0 justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button className="bg-blue-600 inset-0 w-48 text-white font-bold px-4 py-2 rounded">
            Add to Cart
          </button>
        </div>
      </div>
      <p className="text-sm font-semibold text-gray-800 leading-tight break-words">
        {title}
      </p>
      <div className="mt-2">
        <span className="text-lg font-bold text-gray-900">
          ${currentPrice.toFixed(2)}
        </span>
        {originalPrice && (
          <>
            <br />
            <span className="text-sm line-through text-gray-500">
              ${originalPrice.toFixed(2)}
            </span>
          </>
        )}
      </div>
      <div className="flex items-center mt-2">
        <Rate disabled defaultValue={rating} className="text-sm" />
        <span className="text-sm text-gray-600 ml-2">({reviewCount})</span>
      </div>
    </div>
  );
};

export default ProductCard;
