"use client";
import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/@/redux/redux-hooks";
import NewDataGrid from "@/@/component/new-data-grid";
import useDataManager from "@/@/hooks/useDataManager";
import { deleteCompany } from "@/@/redux/slices/companySlice";
import {
  renderCompanyNameTemplate,
  renderWebsite,
} from "@/@/utils/dataGridCommonFunc";

const locationTemplate = (data: any) => {
  const address = data?.address || []; // Safely access the first address

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ marginRight: 5 }}>
        <Icon icon="tdesign:location" width="17" height="14" />
      </span>
      {address?.city?.city_name && address?.state?.state_name
        ? `${address.city.city_name}, ${address.state.state_name}`
        : address?.city?.city_name
          ? address.city.city_name
          : address?.state?.state_name
            ? address.state.state_name
            : "--"}
    </div>
  );
};

// const statusTemplate = (data: { invitation: any }) => {
//   const { invitation } = data;
//   return (
//     <span
//       style={{
//         display: "inline-block",
//         padding: 5,
//         borderRadius: 12,
//         background: "#E5F8E5",
//         color: "#28A745",
//         fontWeight: "bold",
//       }}
//     >
//       {invitation.status === "Active" ? "Active" : "Inactive"}
//     </span>
//   );
// };

const CompanyListing = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const GET_API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/tnt-company`;
  const { dataManager, actionBegin, gridRef } =
    useDataManager(GET_API_ENDPOINT);

  const commands = () => [
    {
      type: "Edit",
      buttonOption: { cssClass: "e-info", iconCss: "e-icons e-eye" },
    },
    {
      type: "Delete",
      buttonOption: { cssClass: "e-danger", iconCss: "e-icons e-delete" },
    },
  ];

  const columns = [
    {
      field: "company_id",
      headerText: "ID",
      isPrimaryKey: true,
      visible: false,
    },
    {
      field: "company_name",
      headerText: "Name",
      clipMode: "EllipsisWithTooltip",
      template: (data: any) => renderCompanyNameTemplate(data),
      width: 220,
    },
    {
      field: "gst_number",
      headerText: "GST No",
      template: (data: any) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {data.gst_number ? data.gst_number : "--"}
        </div>
      ),
    },
    {
      field: "website",
      headerText: "Website",
      template: (data: any) => renderWebsite(data?.website),
    },
    {
      field: "industry",
      headerText: "Industry",
      template: (data: any) => data?.industry || "--",
    },
    {
      field: "location",
      headerText: "Location",
      template: locationTemplate,
    },

    {
      // headerText: "Manage Records",
      commands: commands(),
    },
  ];

  const handleCommandClick = async (args: any) => {
    if (args.commandColumn.type === "Edit") {
      const selectedRow = args.rowData;

      router.push(`/company/edit-company/${selectedRow?.company_id}`);
    }

    if (args.commandColumn.type === "Delete") {
      if (typeof window !== "undefined") {
        const selectedRow = args.rowData;
        const companyId = selectedRow?.company_id;
        // eslint-disable-next-line no-alert
        const confirmed = window?.confirm(
          "Are you sure you want to delete this Company?"
        );
        if (confirmed) {
          try {
            const response = await dispatch(deleteCompany(companyId)).unwrap();
            if (response) {
              const grid = gridRef?.current;
              if (grid) {
                grid.refresh();
              }
            }
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log("Delete Organization Error:", error);
          }
        }
      }
    }
  };

  return (
    <>
      <div className="common_data_grid add_data_grid_action_bar">
        <div className="data_grid_action_bar_div">
          <div className="title_box_div">
            <h4 className="common_header_data_text">Companies</h4>
          </div>
          <div className="icon_box_flex_box justify-content-end">
            <div className="icon_box_div">
              <Icon icon="uiw:file-pdf" width="20" height="20" />
            </div>
            <div className="icon_box_div">
              <Icon icon="lsicon:file-xls-filled" width="20" height="20" />
            </div>
            <Link href="/company/add-company" className="common_small_btn_icon">
              <Icon icon="carbon:add-filled" width="16" height="16" /> add
              company
            </Link>
          </div>
        </div>
        <NewDataGrid
          columns={columns}
          dataSource={dataManager || []}
          gridRef={gridRef}
          actionBegin={actionBegin}
          handleCommandClick={handleCommandClick}
          toolbar={["Search"]}
        />
      </div>
    </>
  );
};

export default CompanyListing;
