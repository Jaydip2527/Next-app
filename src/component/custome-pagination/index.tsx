import React from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";
import { Icon } from "@iconify/react/dist/iconify.js";

const CustomPagination = ({ currentPage, onPageChange, totalPages }: any) => {
  return (
    <div className="row mt-3">
      <div className="col-12">
        <ReactPaginate
          onPageChange={onPageChange}
          // initialPage={currentPage - 1} // Start from page 1
          forcePage={currentPage - 1}
          pageCount={totalPages}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          previousLabel={
            <Icon icon="mage:double-arrow-left" width="14" height="14" />
          }
          nextLabel={
            <Icon icon="mage:double-arrow-right" width="14" height="14" />
          }
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination justify-content-start"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default CustomPagination;
