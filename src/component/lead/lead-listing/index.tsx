"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useAppDispatch } from "@/@/redux/redux-hooks";
import { getNameInitials } from "@/@/utils/common";
import { deleteLead } from "@/@/redux/slices/leadSlice";
import useDataManager from "@/@/hooks/useDataManager";
import {
  renderCompanyNameTemplate,
  renderAssignedUsers,
  renderStatus,
  renderPriority,
  renderEmail,
  renderPhone,
} from "@/@/utils/dataGridCommonFunc";
import NewDataGrid from "../../new-data-grid";
// import user_img from "../../../../public/Images/table_user_img.png";

const LeadListingNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [position] = React.useState<any>("TopCenter");

  const GET_API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/tnt-lead`;
  const { dataManager, actionBegin, gridRef } =
    useDataManager(GET_API_ENDPOINT);

  const handleCommandClick = async (args: any) => {
    if (args.commandColumn.type === "View") {
      const selectedRow = args.rowData;
      router.push(`/lead/lead-profile/${selectedRow?.lead?.lead_id}`);
    }

    if (args.commandColumn.type === "Delete") {
      if (typeof window !== "undefined") {
        const selectedRow = args.rowData;
        const leadId = selectedRow?.lead?.lead_id;
        // eslint-disable-next-line no-alert
        const confirmed = window?.confirm(
          "Are you sure you want to delete this lead?"
        );
        if (confirmed) {
          try {
            const response = await dispatch(deleteLead(leadId)).unwrap();
            if (response) {
              const grid = gridRef?.current;
              if (grid) {
                grid.refresh();
              }
            }
          } catch (error) {
            console.log("Delete Lead Error:", error);
          }
        }
      }
    }
  };

  const commands = () => [
    {
      type: "View",
      buttonOption: { cssClass: "e-info", iconCss: "e-icons e-eye" },
    },
    {
      type: "Delete",
      buttonOption: { cssClass: "e-danger", iconCss: "e-icons e-delete" },
    },
  ];

  const empTemplate = (props: { EmployeeImg: string; contacts: any }) => {
    return props?.contacts[0]?.first_name ? (
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* <Image
          src={user_img}
          alt="Profile"
          width={30}
          height={30}
          style={{ borderRadius: "50%", marginRight: 10 }}
        /> */}
        <div className="avatar-block me-3">
          <div className="e-avatar e-avatar-xsmall e-avatar-circle">
            {getNameInitials(
              `${props?.contacts[0]?.first_name} ${props?.contacts[0]?.last_name}`
            )}
          </div>
        </div>
        <div style={{ fontWeight: "bold" }}>
          {props?.contacts[0]?.first_name} {props?.contacts[0]?.last_name}
        </div>
      </div>
    ) : (
      <div>--</div>
    );
  };

  const columns = [
    // {
    //   type: "checkbox",
    //   allowSorting: false,
    //   allowFiltering: false,
    //   width: 50,
    // },
    {
      field: "sr_number",
      headerText: "Lead ID",
      isPrimaryKey: true,
      template: (data: any) => data?.lead?.sr_number,
    },
    {
      field: "lead_first_name",
      headerText: "Name",
      clipMode: "EllipsisWithTooltip",
      template: empTemplate,
    },
    {
      field: "lead_company_name",
      headerText: "Company",
      clipMode: "EllipsisWithTooltip",
      template: (data: any) =>
        renderCompanyNameTemplate(data?.contacts[0]?.company),
    },
    {
      field: "lead_email",
      headerText: "Email",
      template: (data: any) => renderEmail(data?.contacts[0]?.email?.email),
    },
    {
      field: "lead_phone_number",
      headerText: "Phone",
      template: (data: any) =>
        renderPhone(data?.contacts[0]?.phone?.phone_number),
    },
    {
      field: "budget",
      allowFiltering: false,
      allowSorting: false,
      headerText: "Budget",
      template: (data: any) => (
        <div>{data.lead.budget ? `₹ ${data.lead.budget}` : "--"}</div>
      ),
    },
    // {
    //   field: "tags",
    //   headerText: "Tags",
    //   template: (data: any) => renderTags(data.tags),
    // },
    {
      field: "priority",
      headerText: "Priority",
      template: (data: any) => renderPriority(data?.lead?.priority),
    },
    {
      field: "assigned_to",
      headerText: "Assigned",
      template: (data: any) => renderAssignedUsers(data.assigned_to),
      clipMode: "EllipsisWithTooltip",
    },
    {
      field: "lead_status",
      headerText: "Status",
      template: (data: any) => renderStatus(data.status),
    },
    {
      // headerText: "Manage Records",
      commands: commands(),
    },
  ];

  return (
    <div className="common_data_grid add_data_grid_action_bar">
      <div className="data_grid_action_bar_div">
        <div className="title_box_div">
          <h4 className="common_header_data_text">Leads</h4>
        </div>
        <div className="icon_box_flex_box justify-content-end">
          <TooltipComponent
            content="Switch To Kanban View"
            position={position}
            tabIndex={0}
          >
            <Link href="/lead/kanban-lead" className="icon_box_div">
              <Icon
                tabIndex={-1}
                icon="ic:outline-view-kanban"
                width="20"
                height="20"
              />
            </Link>
          </TooltipComponent>
          <div className="icon_box_div">
            <Icon icon="uiw:file-pdf" width="20" height="20" />
          </div>
          <Link href="/lead/add-lead" className="common_small_btn_icon">
            <Icon icon="carbon:add-filled" width="16" height="16" /> Add lead
          </Link>
        </div>
      </div>
      <NewDataGrid
        columns={columns}
        dataSource={dataManager}
        gridRef={gridRef}
        actionBegin={actionBegin}
        handleCommandClick={handleCommandClick}
        toolbar={["Search"]}
      />
    </div>
  );
};
export default LeadListingNew;
