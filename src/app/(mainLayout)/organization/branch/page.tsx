"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "@/@/redux/redux-hooks";
import {
  deleteOrganizationBranch,
  fetchOrganizationBranches,
} from "@/@/redux/slices/organizationBranchSlice";
import OffCanvasWrapper from "@/@/component/off-canvas-wrapper";
import AddEditBranchForm from "@/@/component/organization-branch/add-edit-branch";
import { ORGANIZATION_PAGE_TITLE } from "@/@/utils/constant";
import { renderPhone } from "@/@/utils/dataGridCommonFunc";
import CustomPagination from "@/@/component/custome-pagination";
import style from "./branch.module.scss";
import branch_img from "../../../../../public/Images/organization_branch_img.png";

function OrganizationBranch() {
  const dispatch = useAppDispatch();
  const [isRefresh, setIsRefresh] = useState(true);

  const { allbranchesList } = useAppSelector(
    (state) => state.organizationBranch
  );
  const { organization } = useAppSelector((state) => state.organization);

  const [branchId, setBranchId] = useState<number | null>(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [page, setPage] = useState(1);
  const limit = 5;
  const [totalPages, setTotalPages] = useState(0);

  console.log("totalPages :>> ", totalPages);

  useEffect(() => {
    if (allbranchesList?.total_records) {
      setTotalPages(Math.ceil(allbranchesList.total_records / limit));
    }
  }, [allbranchesList]);

  const handlePageChange = (selectedItem: any) => {
    setPage(selectedItem.selected + 1); // Add 1 to the index to start from 1
    setIsRefresh(true);
  };

  useEffect(() => {
    if (!isRefresh) {
      return;
    }
    const params = {
      page,
      limit,
    };
    dispatch(fetchOrganizationBranches(params))
      .then((res: any) => {
        // setPage(1);
        setTotalPages(Math.ceil(res?.payload?.data?.total_records / limit));
        setIsRefresh(false);
      })
      .catch((error) => {
        console.log("error :>> ", error);
        setIsRefresh(false);
      });
  }, [isRefresh, page]);

  useEffect(() => {
    if (!isRefresh) {
      const params = {
        page,
        limit,
      };
      dispatch(fetchOrganizationBranches(params)).then(() => {
        setIsRefresh(false);
      });
    }
  }, [organization]);

  const handleEdit = (branch: any) => {
    setBranchId(branch?.branch_id);
    setShow(true);
  };

  const handleDelete = (branch: any) => {
    dispatch(deleteOrganizationBranch(branch?.branch_id))
      .then(() => {
        toast.success("Branch deleted successfully");
        setIsRefresh(true);
      })
      .catch((error) => {
        console.log("error :>> ", error);
        setIsRefresh(false);
      });
  };

  return (
    <div className={style.sec_main_div}>
      <div className="common_header_main_div">
        <h4 className="common_header_data_text">
          {ORGANIZATION_PAGE_TITLE.ORGANIZATION_BRANCH}
        </h4>
        <button
          className="common_small_btn_icon"
          onClick={() => {
            handleShow();
            setBranchId(null);
          }}
        >
          <Icon icon="carbon:add-filled" width="16" height="16" /> Add branch
        </button>

        <OffCanvasWrapper
          show={show}
          handleClose={handleClose}
          title={branchId ? "Edit Branch" : "Add Branch"}
          className={style.branch_modal}
          placement="end"
        >
          <AddEditBranchForm
            handleClose={handleClose}
            setIsRefresh={setIsRefresh}
            branchId={branchId}
          />
        </OffCanvasWrapper>
      </div>

      <div className={style.organization_branch_main_div}>
        {allbranchesList?.data?.length > 0 ? (
          allbranchesList.data.map((branch: any, index: number) => (
            <div className={style.organization_branch_card} key={index}>
              <div className={style.card_img_sec}>
                <Image
                  className="img-fluid"
                  src={branch_img}
                  alt="Branch Image"
                />
                <div className={style.branch_info_sec}>
                  <div className={style.branch_title}>{branch.branch_name}</div>
                  <span className={style.branch_info_data}>
                    Organization ID: None
                  </span>
                </div>
              </div>
              <div className={style.branch_currency_sec}>
                <div className={style.branch_title}>Currency</div>
                <div className={style.branch_info_data}>
                  {branch.currency_code || "--"}
                </div>
              </div>
              <div className={style.branch_address_sec}>
                <div className={style.branch_title}>Address</div>
                <div className={style.address_info_data}>
                  {branch?.address_details?.addresses?.[0]?.address_line_1 ||
                    "--"}
                </div>
              </div>
              <div className={style.branch_contact_sec}>
                <div className={style.branch_title}>Phone</div>
                <div className={style.contact_info_data}>
                  {renderPhone(branch.phone_number)}
                </div>
              </div>
              <div className={style.branch_btn_sec}>
                <button
                  className="common_edit_btn"
                  onClick={() => handleEdit(branch)}
                >
                  <Icon
                    className="edit_icon"
                    icon="lucide:edit"
                    width="14"
                    height="14"
                  />
                </button>
                <button
                  className="common_trash_btn"
                  onClick={() => handleDelete(branch)}
                >
                  <Icon
                    className="trash_icon"
                    icon="fa-solid:trash"
                    width="14"
                    height="14"
                  />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No branches found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <CustomPagination
          currentPage={page}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}

export default OrganizationBranch;
