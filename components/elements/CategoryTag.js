import { Category } from "@/modules/news/interface";
import React from "react";

function getCategoryStyle(slug) {
  switch (slug?.toLowerCase()) {
    case Category.NEWS?.toLowerCase():
      return "bg-red-600 text-black border-red-600"; // News: đỏ nóng
    case Category.SPORTS?.toLowerCase():
      return "bg-green-600 text-blackborder-green-600"; // Sports: xanh lá mạnh
    case Category.MOVIE?.toLowerCase():
      return "bg-purple-700 text-black border-purple-700"; // Movie: tím điện ảnh
    case Category.LIFESTYLE?.toLowerCase():
      return "bg-orange-500 text-black border-orange-500"; // Lifestyle: cam trẻ
    case Category.BUSINESS?.toLowerCase():
      return "bg-slate-600 text-black border-slate-600"; // Business: xám bạc
    case Category.ALL?.toLowerCase():
      return "bg-gray-800 text-black border-gray-800"; // All: đen than
    case Category.FASHION?.toLowerCase():
      return "bg-yellow-500 text-black border-yellow-500"; // Fashion: vàng gold
    default:
      return "bg-blue-600 text-black border-blue-600"; // Default: xanh navy
  }
}

export default function CategoryTag({ category = "" }) {
  return (
    <span
      className={`py-1 px-2 text-sm text-center text-black font-bold  border rounded transition ${getCategoryStyle(
        category
      )}`}
    >
      {category ? category.toUpperCase() : "ALL"}
    </span>
  );
}
