import React, { useState, useEffect } from "react";
import IconButton from "../button/icon";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

type PaginationProps = {
  total: number;
  limit: number;
  page: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  onCurrentPageChange?: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  total,
  limit,
  page,
  setCurrentPage,
  onCurrentPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(Math.ceil(total / limit));
  }, [total, limit]);

  const handleNext = () => {
    if (page + 1 <= totalPages) {
      setCurrentPage(page + 1);
      onCurrentPageChange && onCurrentPageChange(page + 1);
    }
  };

  const handlePrev = () => {
    if (page - 1 >= 1) {
      setCurrentPage(page - 1);
      onCurrentPageChange && onCurrentPageChange(page - 1);
    }
  };

  return (
    <div className="flex justify-end items-center">
      <IconButton onClick={handlePrev} icon={<MdChevronLeft />} />
      <span className="mx-2">
        {page} of {totalPages}
      </span>
      <IconButton onClick={handleNext} icon={<MdChevronRight />} />
    </div>
  );
};

export default Pagination;
