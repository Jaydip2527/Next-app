"use client";
import * as React from "react";
import { useState } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteLead, fetchLeads } from "@/@/redux/slices/leadSlice";
import { useAppDispatch, useAppSelector } from "@/@/redux/redux-hooks";
import { getNameInitials } from "@/@/utils/common";
import DataGrid from "../../data-grid";

const statusTemplate = (data: any) => (
  <span
    style={{
      display: "inline-block",
      padding: "5px 10px",
      borderRadius: "12px",
      background: data.lead.status === "Active" ? "#E5F8E5" : "#F8E5E5",
      color: data.lead.status === "Active" ? "#28A745" : "#DC3545",
      fontWeight: "bold",
      fontSize: 12,
    }}
  >
    {data.lead.status}
  </span>
);
const assignToTemplate = (data: any) => (
  <div className="avatar-block me-3">
    <div className="e-avatar e-avatar-small e-avatar-circle">
      {getNameInitials(data.assignTo)}
    </div>
  </div>
);

// Tags template
const tagsTemplate = (data: any) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
    {data?.tags.map((tag: any, index: number) => (
      <span
        key={index}
        style={{
          background: tag?.color || "#f0f0f0",
          borderRadius: "8px",
          padding: "2px 8px",
          fontSize: "12px",
        }}
      >
        {tag.name ? tag.name : "Test"}
      </span>
    ))}
  </div>
);

function companyNameTemplate(props: { company: any }) {
  return (
    <div>
      <div id="status" className="statustemp e-inactivecolor">
        <span className="statustxt e-inactivecolor">
          {props.company.company_name}
        </span>
      </div>
    </div>
  );
}
function emailTemplate(props: { email: any }) {
  return (
    <div>
      <div id="status" className="statustemp e-inactivecolor">
        <span className="statustxt e-inactivecolor">{props.email.email}</span>
      </div>
    </div>
  );
}

const loc = { width: "31px", height: "24px" };
function trustTemplate(props: { phone: any }) {
  const lead_phone_number =
    props.phone.phone_number === "Sufficient"
      ? "https://ej2.syncfusion.com/react/demos/src/grid/images/Sufficient.png"
      : props.phone.phone_number === "Insufficient"
        ? "https://ej2.syncfusion.com/react/demos/src/grid/images/Insufficient.png"
        : "https://ej2.syncfusion.com/react/demos/src/grid/images/Perfect.png";
  return (
    <div>
      <img style={loc} src={lead_phone_number} alt="" />
      <span id="Trusttext">{props.phone.phone_number}</span>
    </div>
  );
}

function empTemplate(props: { EmployeeImg: string; contact: any }) {
  return (
    <div>
      {props.EmployeeImg === "usermale" ? (
        <div className="empimg">
          <span className="e-userimg sf-icon-Male" />
        </div>
      ) : (
        <div className="empimg">
          <span className="e-userimg sf-icon-FeMale" />
        </div>
      )}
      <span id="Emptext">
        {props.contact.first_name} {props.contact.last_name}
      </span>
    </div>
  );
}

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

const column = [
  {
    type: "checkbox",
    allowSorting: false,
    allowFiltering: false,
    width: 50,
  },
  {
    field: "EmployeeID",
    visible: false,
    headerText: "Employee ID",
    isPrimaryKey: true,
  },
  {
    field: "lead_first_name",
    headerText: "Name",
    clipMode: "EllipsisWithTooltip",
    template: empTemplate,
  },
  {
    field: "lead_company_name",
    headerText: "Company Name",
    clipMode: "EllipsisWithTooltip",
    template: companyNameTemplate,
  },
  {
    field: "lead_email",
    headerText: "Email",
    template: emailTemplate,
  },
  {
    field: "lead_phone_number",
    headerText: "Phone",
    template: trustTemplate,
  },
  // {
  //   field: "value",
  //   allowFiltering: false,
  //   allowSorting: false,
  //   headerText: "Value",
  // },
  {
    field: "tags",
    headerText: "Tags",
    template: tagsTemplate,
  },
  {
    field: "assigned_to",
    headerText: "Assigned",
    template: assignToTemplate,
    clipMode: "EllipsisWithTooltip",
  },
  {
    field: "lead_status",
    headerText: "Status",
    template: statusTemplate,
  },
  {
    headerText: "View Records",
    commands: commands(),
  },
];

function LeadListing() {
  const [position] = useState<any>("TopCenter");

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isRefresh, setIsRefresh] = useState(true);
  const { leadList } = useAppSelector((state) => state.lead);

  // State for pagination, search, and sorting
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(5);
  const [search, setSearch] = React.useState("");
  const [sortBy] = React.useState("");
  const [sortOrder] = React.useState("");

  React.useEffect(() => {
    if (!isRefresh) {
      return;
    }
    const params = { page, limit, search, sortBy, sortOrder };
    dispatch(fetchLeads(params)).finally(() => setIsRefresh(false));
  }, [page, limit, search, sortBy, sortOrder]);

  const handlePageChange = (args: any) => {
    console.log("page, limit", page, limit);
    console.log("args", args);
    if (args.currentPage !== page || args.pageSize !== limit) {
      setPage(args.currentPage);
      setLimit(args.pageSize);
    }
  };

  // Handle search
  const handleSearch = (searchValue: string) => {
    setIsRefresh(true);
    setSearch(searchValue);
    setPage(1); // Reset to page 1 on new search
  };

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
              setIsRefresh(true);
            }
          } catch (error) {
            console.log("Delete Lead Error:", error);
          }
        }
      }
    }
  };

  return (
    <>
      <div className="common_data_grid add_data_grid_action_bar">
        <div className="data_grid_action_bar_div">
          <div className="icon_box_flex_box justify-content-end">
            <TooltipComponent
              content="Switch To Kanban View"
              position={position}
              tabIndex={0}
            >
              {/* Button element */}
              <Link href="/lead/kanban-lead" className="icon_box_div">
                <Icon
                  tabIndex={-1}
                  icon="ic:outline-view-kanban"
                  width="20"
                  height="20"
                />
              </Link>
            </TooltipComponent>
            {/* <Link href="/lead/kanban-lead" className="icon_box_div">
              <Icon icon="ic:outline-view-kanban" width="20" height="20" />
            </Link> */}
            <div className="icon_box_div">
              <Icon icon="uiw:file-pdf" width="20" height="20" />
            </div>
            <Link href="/lead/add-lead" className="common_small_btn_icon">
              <Icon icon="carbon:add-filled" width="16" height="16" /> Add lead
            </Link>
          </div>
        </div>
        <DataGrid
          data={leadList || []}
          columns={column}
          totalRecordsCount={leadList.length || 0}
          pageSize={10}
          currentPage={1}
          toolbar={["Search"]}
          toolbarClick={(args: any) => {
            if (args.item.id === "Search") {
              handleSearch(args.event.target.value);
            }
          }}
          onPageChange={handlePageChange}
          commandClick={handleCommandClick}
        />
      </div>
    </>
  );
}
export default LeadListing;
