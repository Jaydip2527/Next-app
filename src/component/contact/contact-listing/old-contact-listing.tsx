"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import DataGrid from "../../data-grid";
import user_img from "../../../../public/Images/table_user_img.png";

const contacts = [
  {
    id: 1,
    name: "Benedetto",
    username: "brossiter15",
    phone: "+91 9876543210",
    email: "stracke.jesus@example.net",
    tags: "Urgent, Design",
    location: "Mumbai, India",
    owner: "Hendry Milner",
    contact_methods: [
      "email",
      "call",
      "video",
      "whatsapp",
      "linkedin",
      "facebook",
    ],
    status: "Active",
  },
  {
    id: 2,
    name: "Benedetto",
    username: "brossiter15",
    phone: "+1 123-456-7890",
    email: "stracke.jesus@example.net",
    tags: "Urgent, Design",
    location: "New York, USA",
    owner: "Hendry Milner",
    contact_methods: [
      "email",
      "call",
      "video",
      "whatsapp",
      "linkedin",
      "facebook",
    ],
    status: "Inactive",
  },
  {
    id: 3,
    name: "Benedetto",
    username: "brossiter15",
    phone: "+44 20 7946 0958",
    email: "stracke.jesus@example.net",
    tags: "Urgent, Design",
    location: "London, UK",
    owner: "Hendry Milner",
    contact_methods: [
      "email",
      "call",
      "video",
      "whatsapp",
      "linkedin",
      "facebook",
    ],
    status: "Inactive",
  },
  {
    id: 4,
    name: "Benedetto",
    username: "@brossiter15",
    phone: "+91 9876567891",
    email: "stracke.jesus@example.net",
    tags: "Urgent, Design",
    location: "Delhi, India",
    owner: "Hendry Milner",
    contact_methods: [
      "email",
      "call",
      "video",
      "whatsapp",
      "linkedin",
      "facebook",
    ],
    status: "Active",
  },
  {
    id: 5,
    name: "Benedetto",
    username: "brossiter15",
    phone: "+61 400 123 456",
    email: "stracke.jesus@example.net",
    tags: "Urgent, Design",
    location: "Sydney, Australia",
    owner: "Hendry Milner",
    contact_methods: [
      "email",
      "call",
      "video",
      "whatsapp",
      "linkedin",
      "facebook",
    ],
    status: "Active",
  },
  {
    id: 6,
    name: "Benedetto",
    username: "brossiter15",
    phone: "+91 9876543210",
    email: "stracke.jesus@example.net",
    tags: "Urgent, Design",
    location: "Mumbai, India",
    owner: "Hendry Milner",
    contact_methods: [
      "email",
      "call",
      "video",
      "whatsapp",
      "linkedin",
      "facebook",
    ],
    status: "Active",
  },
  {
    id: 7,
    name: "Benedetto",
    username: "brossiter15",
    phone: "+91 9876543210",
    email: "stracke.jesus@example.net",
    tags: "Urgent, Design",
    location: "Surat, India",
    owner: "Hendry Milner",
    contact_methods: [
      "email",
      "call",
      "video",
      "whatsapp",
      "linkedin",
      "facebook",
    ],
    status: "Inactive",
  },
];

const nameTemplate = (data: {
  profileImage: any;
  name: any;
  username: any;
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Image
        src={user_img}
        alt="Profile"
        style={{ width: 30, height: 30, borderRadius: 50, marginRight: 10 }}
      />
      <div>
        <div style={{ fontWeight: "bold" }}>{data.name}</div>
        <div style={{ color: "gray" }}>@{data.username}</div>
      </div>
    </div>
  );
};

const phoneTemplate = (data: { flagIcon: any; phone: any }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      {/* <Image
        src={data.flagIcon || ""}
        alt="Flag"
        style={{ width: 20, height: 15, marginRight: 5 }}
      /> */}
      <Icon icon="emojione:flag-for-india" width="14" height="14" />
      {data.phone}
    </div>
  );
};

const locationTemplate = (data: { location: any }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ marginRight: 5 }}>
        <Icon icon="tdesign:location" width="17" height="14" />
      </span>{" "}
      {data.location}
    </div>
  );
};

const contactIconsTemplate = () => {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <span style={{ cursor: "pointer" }}>
        <Icon icon="material-symbols:mail-rounded" width="17" height="14" />
      </span>
      <span style={{ cursor: "pointer" }}>
        <Icon icon="tabler:phone-check" width="17" height="14" />
      </span>
      <span style={{ cursor: "pointer" }}>
        <Icon icon="fluent:chat-empty-48-regular" width="17" height="14" />
      </span>
      <span style={{ cursor: "pointer" }}>
        <Icon icon="la:skype" width="17" height="14" />
      </span>
      <span style={{ cursor: "pointer" }}>
        <Icon icon="iconoir:facebook" width="17" height="14" />
      </span>
    </div>
  );
};

const statusTemplate = (data: { status: any }) => {
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
      {data.status}
    </span>
  );
};

const ContactListing = () => {
  const router = useRouter();
  const [isRefresh, setIsRefresh] = useState(true);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(5);
  const [search, setSearch] = React.useState("");
  // const query = new Query().addParams("dataCount", "10");

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
    { type: "checkbox", allowSorting: false, allowFiltering: false, width: 50 },
    { field: "name", headerText: "Name", width: 200, template: nameTemplate },
    {
      field: "phone",
      headerText: "Phone",
      template: phoneTemplate,
    },
    { field: "email", headerText: "Email" },
    { field: "tags", headerText: "Tags" },
    {
      field: "location",
      headerText: "Location",
      template: locationTemplate,
    },
    { field: "owner", headerText: "Owner" },
    {
      field: "contact",
      headerText: "Contact",
      template: contactIconsTemplate,
    },
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

  useEffect(() => {
    if (!isRefresh) {
      return;
    }
    const params = { page, limit, search };
    console.log("params :>> ", params);
  }, [isRefresh, page, limit, search]);

  const handlePageChange = (args: any) => {
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
    if (args.commandColumn.type === "Edit") {
      // const selectedRow = args.rowData;
      // const org = selectedRow.organization_id;
      router.push(`/contact/add-contact`);
    }

    if (args.commandColumn.type === "Delete") {
      if (typeof window !== "undefined") {
        // const selectedRow = args.rowData;
        // const leadId = selectedRow?.lead_lead_id;
        // eslint-disable-next-line no-alert
        const confirmed = window?.confirm(
          "Are you sure you want to delete this lead?"
        );
        if (confirmed) {
          console.log("Delete command clicked");
        }
      }
    }
  };

  return (
    <>
      <div className="common_data_grid add_data_grid_action_bar">
        <div className="data_grid_action_bar_div">
          <div className="contect_tb_header">
            <div className="dropdown_common m-0 sortby_dropdown">
              <DropDownListComponent
                placeholder="Sort"
                popupHeight="220px"
                className="dropdown_filed"
                cssClass="e-outline"
              />
            </div>
            <div className="date_picker_div m-0">
              <div className="datetimepicker-control-section">
                <DatePickerComponent
                  placeholder="Date"
                  cssClass="e-outline"
                  min={new Date()}
                ></DatePickerComponent>
              </div>
            </div>
          </div>
          <div className="icon_box_flex_box justify-content-end">
            <div className="icon_box_div">
              <Icon icon="uiw:file-pdf" width="20" height="20" />
            </div>
            <div className="icon_box_div">
              <Icon icon="lsicon:file-xls-filled" width="20" height="20" />
            </div>
            <Link href="/contact/add-contact" className="common_small_btn_icon">
              <Icon icon="carbon:add-filled" width="16" height="16" /> Add
              contact
            </Link>
          </div>
        </div>
        <DataGrid
          data={contacts || []}
          columns={columns}
          totalRecordsCount={contacts.length || 0}
          pageSize={10}
          currentPage={1}
          toolbar={["Search"]}
          toolbarClick={(args: any) => {
            if (args.item.id === "Search") {
              handleSearch(args.event.target.value);
            }
          }}
          onPageChange={handlePageChange}
          // query={query}
          // height="400"
          commandClick={handleCommandClick}
        />
      </div>
    </>
  );
};

export default ContactListing;
