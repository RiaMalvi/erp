import Image from "next/image";
import React from "react";

interface TableProps {
  loading?: boolean;
  pagination?: boolean;
  onPaginate: {
    nextPage: () => void;
    prevPage: () => void;
  };
  columns: {
    align?: "left" | "right" | "center";
    title: string;
    type: "text" | "number" | "date" | "status" | "action" | "image";
    key: string;
  }[];
  rows: {
    [key: string]: any;
  }[];
}

const Table = ({
  loading,
  pagination,
  onPaginate,
  rows,
  columns,
}: TableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ${
                  column.align ? `text-${column.align}` : ""
                }`}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100`}
            >
              {columns.map((column, index) => (
                <td
                  key={index}
                  className={`px-6 py-4 whitespace-no-wrap border-b border-gray-200 ${
                    column.align ? `text-${column.align}` : ""
                  }`}
                >
                  {column.type === "text" &&
                    typeof row[column.key] === "string" &&
                    row[column.key]}
                  {column.type === "number" && row[column.key]}
                  {column.type === "date" && row[column.key]}
                  {column.type === "status" && (
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${
                        row[column.key].color
                      } text-white`}
                    >
                      {row[column.key].label}
                    </span>
                  )}
                  {column.type === "action" && (
                    <div className="flex items-center gap-2">
                      <button className="text-blue-500">Edit</button>
                      <button className="text-red-500">Delete</button>
                    </div>
                  )}
                  {column.type === "image" && (
                    <Image
                      src={row[column.key] as string}
                      width={50}
                      height={50}
                      alt="image"
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && (
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={onPaginate.prevPage}
          >
            Prev
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
            onClick={onPaginate.nextPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
