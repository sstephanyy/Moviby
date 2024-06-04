import React from "react";

export const MovieCard = ({ title, tags }) => {
  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg  m-4"
      draggable="true"
    >
      <div className="w-full text-center text-white p-2 bg-indigo-500 rounded-md">
        <div className="font-bold text-xl">{title}</div>
        <p className="text-gray-700 text-base">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{tag}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};
