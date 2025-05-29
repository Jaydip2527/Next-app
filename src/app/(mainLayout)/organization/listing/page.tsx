"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";

import { ORGANIZATION_PAGE_TITLE } from "@/@/utils/constant";
import { deleteOrganization } from "@/@/redux/slices/organizationSlice";
import { useAppDispatch } from "@/@/redux/redux-hooks";
import useDataManager from "@/@/hooks/useDataManager";
import NewDataGrid from "@/@/component/new-data-grid";
import {
  saveCompanyDetails,
  saveOrganizationSetup,
  saveTaxationDetails,
} from "@/@/redux/slices/organizationProfileSlice";
import { renderPhone } from "@/@/utils/dataGridCommonFunc";
import { getNameInitials } from "@/@/utils/common";
// import user_img from "../../../../../public/Images/table_user_img.png";

// New Way of Data Grid View

const OrganizationList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const GET_API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/organization`;
  const { dataManager, actionBegin, gridRef } =
    useDataManager(GET_API_ENDPOINT);

  const handleAddClick = () => {
    dispatch(saveOrganizationSetup(null));
    dispatch(saveCompanyDetails(null));
    dispatch(saveTaxationDetails(null));
    router.push("/organization/organizationprofile-add-edit");
  };

  const handleCommandClick = async (args: any) => {
    if (args.commandColumn.type === "Edit") {
      const selectedRow = args.rowData;
      const org = selectedRow.organization_id;
      router.push(`/organization/organizationprofile-add-edit/${org}`);
    }

    if (args.commandColumn.type === "Delete") {
      if (typeof window !== "undefined") {
        const selectedRow = args.rowData;
        const organizationId = selectedRow.organization_id;
        // eslint-disable-next-line no-alert
        const confirmed = window?.confirm(
          "Are you sure you want to delete this organization?"
        );

        if (confirmed) {
          try {
            const response = await dispatch(
              deleteOrganization(organizationId)
            ).unwrap();
            if (response) {
              const grid = gridRef?.current;
              if (grid) {
                grid.refresh();
              }
            }
          } catch (error) {
            console.log("Delete Organization Error:", error);
          }
        }
      }
    }
  };

  const addressTemplate = (props: any) => {
    const addresses = props?.address_details?.addresses || [];
    if (addresses.length > 0) {
      const address = addresses[0]; // Assuming you need only the first address
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: 5 }}>
            <Icon icon="tdesign:location" width="17" height="14" />
          </span>
          <span>{address?.address_name}</span>
        </div>
      );
    }
    return <span>No Address</span>;
  };

  const contactPersonTemplate = (props: any) => {
    const contactName = props?.contact_persons?.name || "--";
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* <Image
          src={user_img}
          alt="Profile"
          style={{ width: 30, height: 30, borderRadius: 50, marginRight: 10 }}
        /> */}
        <div className="avatar-block me-3">
          <div className="e-avatar e-avatar-xsmall e-avatar-circle">
            {getNameInitials(`${contactName}`)}
          </div>
        </div>
        <span>{contactName}</span>
      </div>
    );
  };

  const statusTemplate = (props: any) => {
    const status = String(props?.status || ""); // Ensure it's a string

    return (
      <div>
        {status === "Active" ? (
          <div id="status" className="statustemp e-activecolor">
            <span className="statustxt e-activecolor">{status}</span>
          </div>
        ) : (
          <div id="status" className="statustemp e-inactivecolor">
            <span className="statustxt e-inactivecolor">{status}</span>
          </div>
        )}
      </div>
    );
  };

  const commands = () => [
    {
      type: "Edit",
      buttonOption: { cssClass: "e-info", iconCss: "e-icons e-edit" },
    },
    {
      type: "Delete",
      buttonOption: { cssClass: "e-danger", iconCss: "e-icons e-delete" },
    },
  ];

  const columns = [
    // {
    //   type: "checkbox",
    //   allowSorting: false,
    //   width: "60",
    // },
    {
      field: "organization_id",
      headerText: "ID",
      isPrimaryKey: true,
      visible: false,
      allowSorting: true,
    },
    {
      field: "organization_name",
      headerText: "Organization",
      width: "200",
      textAlign: "Left",
      allowSorting: true,
    },
    {
      field: "address_details",
      headerText: "Location",
      allowSorting: false,
      width: "200",
      textAlign: "Left",
      template: addressTemplate,
    },
    {
      field: "industry",
      headerText: "Industry",
      allowSorting: false,
      width: "150",
      textAlign: "Left",
    },
    {
      field: "contact_persons",
      headerText: "Contact Person",
      width: "150",
      allowSorting: false,
      textAlign: "Left",
      template: contactPersonTemplate,
    },
    {
      field: "phone_number",
      headerText: "Phone",
      width: "150",
      allowSorting: true,
      textAlign: "Left",
      template: (data: any) => renderPhone(data?.phone_number),
    },
    {
      field: "gst_registration_type",
      headerText: "GST Type",
      width: "200",
      allowSorting: false,
      textAlign: "Left",
    },
    {
      field: "status",
      headerText: "Status",
      template: statusTemplate,
      width: "130",
      allowSorting: false,
      textAlign: "Center",
    },
    {
      // headerText: "Manage Records",
      width: "160",
      commands: commands(),
    },
  ];

  return (
    <div className="common_data_grid add_data_grid_action_bar">
      <div className="data_grid_action_bar_div">
        <div className="title_box_div">
          <h4 className="common_header_data_text">
            {ORGANIZATION_PAGE_TITLE?.ORGANIZATION}
          </h4>
        </div>
        <div className="icon_box_flex_box justify-content-end">
          <button className="common_small_btn_icon" onClick={handleAddClick}>
            <Icon icon="carbon:add-filled" width="16" height="16" />{" "}
            {ORGANIZATION_PAGE_TITLE?.ADD}
          </button>
        </div>
      </div>
      <NewDataGrid
        columns={columns}
        dataSource={dataManager}
        gridRef={gridRef}
        actionBegin={actionBegin}
        handleCommandClick={handleCommandClick}
      />
    </div>
  );
};
export default OrganizationList;
