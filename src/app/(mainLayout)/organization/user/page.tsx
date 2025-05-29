"use client";
import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
// import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/@/redux/redux-hooks";
import { deleteUser } from "@/@/redux/slices/userSlice";
import NewDataGrid from "@/@/component/new-data-grid";
import useDataManager from "@/@/hooks/useDataManager";
import { renderEmail } from "@/@/utils/dataGridCommonFunc";
import { getNameInitials } from "@/@/utils/common";
// import user_img from "../../../../../public/Images/table_user_img.png";

const nameTemplate = (data: { invitation: any }) => {
  const { invitation } = data;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {/* <Image
        src={user_img}
        alt="Profile"
        style={{ width: 30, height: 30, borderRadius: 50, marginRight: 10 }}
      /> */}
      <div className="avatar-block me-3">
        <div className="e-avatar e-avatar-xsmall e-avatar-circle">
          {getNameInitials(`${invitation.first_name} ${invitation.last_name}`)}
        </div>
      </div>
      <div>
        <div style={{ fontWeight: "bold" }}>
          {invitation.first_name} {invitation.last_name}
        </div>
      </div>
    </div>
  );
};

const departmentTemplate = (data: { invitation: any }) => {
  const { invitation } = data;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {invitation.department}
    </div>
  );
};

const designationTemplate = (data: { invitation: any }) => {
  const { invitation } = data;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {invitation.designation}
    </div>
  );
};

const statusTemplate = (data: { invitation: any }) => {
  const { invitation } = data;
  return (
    <span
      style={{
        display: "inline-block",
        padding: 5,
        borderRadius: 12,
        background: "#E5F8E5",
        color: "#28A745",
        fontWeight: "bold",
      }}
    >
      {invitation.status === "Active" ? "Active" : "Inactive"}
    </span>
  );
};

const UserListing = () => {
  // const router = useRouter();
  const dispatch = useAppDispatch();
  const GET_API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/user-invitation`;
  const { dataManager, actionBegin, gridRef } =
    useDataManager(GET_API_ENDPOINT);

  const commands = () => [
    // {
    //   type: "Edit",
    //   buttonOption: { cssClass: "e-info", iconCss: "e-icons e-edit" },
    // },
    {
      type: "Delete",
      buttonOption: { cssClass: "e-danger", iconCss: "e-icons e-delete" },
    },
  ];

  const columns = [
    // { type: "checkbox", allowSorting: false, allowFiltering: false, width: 50 },
    {
      field: "user_invitation_id",
      headerText: "ID",
      isPrimaryKey: true,
      visible: false,
    },
    { field: "name", headerText: "Name", width: 200, template: nameTemplate },
    {
      field: "email",
      headerText: "Email",
      template: (data: any) => renderEmail(data?.invitation.email),
    },
    {
      field: "department",
      headerText: "Department",
      template: departmentTemplate,
    },
    {
      field: "designation",
      headerText: "Designation",
      template: designationTemplate,
    },
    // { field: "role_id", headerText: "Role", template: roleTemplate },

    {
      field: "status",
      headerText: "Status",
      template: statusTemplate,
    },
    {
      // headerText: "Manage Records",
      commands: commands(),
    },
  ];

  const handleCommandClick = async (args: any) => {
    // if (args.commandColumn.type === "Edit") {
    //   const selectedRow = args.rowData;
    //   // eslint-disable-next-line no-console
    //   console.log("selectedRow ::", selectedRow);
    //   dispatch(fetchSingleUser(selectedRow?.invitation?.user_invitation_id));
    //   router.push(`/organization/user/invite-user?id=${selectedRow?.invitation?.user_invitation_id}`);
    // }

    if (args.commandColumn.type === "Delete") {
      if (typeof window !== "undefined") {
        const selectedRow = args.rowData;
        const userId = selectedRow?.invitation?.user_invitation_id;
        // eslint-disable-next-line no-alert
        const confirmed = window?.confirm(
          "Are you sure you want to delete this User?"
        );
        if (confirmed) {
          try {
            const response = await dispatch(deleteUser(userId)).unwrap();
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
            <h4 className="common_header_data_text">Users</h4>
          </div>
          <div className="icon_box_flex_box justify-content-end">
            <div className="icon_box_div">
              <Icon icon="uiw:file-pdf" width="20" height="20" />
            </div>
            <div className="icon_box_div">
              <Icon icon="lsicon:file-xls-filled" width="20" height="20" />
            </div>
            <Link
              href="/organization/user/invite-user"
              className="common_small_btn_icon"
            >
              <Icon icon="carbon:add-filled" width="16" height="16" /> invite
              user
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

export default UserListing;
