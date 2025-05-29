"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
// import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
// import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { useAppDispatch } from "@/@/redux/redux-hooks";
import useDataManager from "@/@/hooks/useDataManager";
import { deleteContact } from "@/@/redux/slices/contactSlice";
import { renderEmail, renderPhone } from "@/@/utils/dataGridCommonFunc";
import { getNameInitials } from "@/@/utils/common";
// import user_img from "../../../../public/Images/table_user_img.png";
import NewDataGrid from "../../new-data-grid";

// const contacts = [
//   {
//     id: 1,
//     name: "Benedetto",
//     username: "brossiter15",
//     phone: "+91 9876543210",
//     email: "stracke.jesus@example.net",
//     tags: "Urgent, Design",
//     location: "Mumbai, India",
//     owner: "Hendry Milner",
//     contact_methods: [
//       "email",
//       "call",
//       "video",
//       "whatsapp",
//       "linkedin",
//       "facebook",
//     ],
//     status: "Active",
//   },
//   {
//     id: 2,
//     name: "Benedetto",
//     username: "brossiter15",
//     phone: "+1 123-456-7890",
//     email: "stracke.jesus@example.net",
//     tags: "Urgent, Design",
//     location: "New York, USA",
//     owner: "Hendry Milner",
//     contact_methods: [
//       "email",
//       "call",
//       "video",
//       "whatsapp",
//       "linkedin",
//       "facebook",
//     ],
//     status: "Inactive",
//   },
//   {
//     id: 3,
//     name: "Benedetto",
//     username: "brossiter15",
//     phone: "+44 20 7946 0958",
//     email: "stracke.jesus@example.net",
//     tags: "Urgent, Design",
//     location: "London, UK",
//     owner: "Hendry Milner",
//     contact_methods: [
//       "email",
//       "call",
//       "video",
//       "whatsapp",
//       "linkedin",
//       "facebook",
//     ],
//     status: "Inactive",
//   },
//   {
//     id: 4,
//     name: "Benedetto",
//     username: "@brossiter15",
//     phone: "+91 9876567891",
//     email: "stracke.jesus@example.net",
//     tags: "Urgent, Design",
//     location: "Delhi, India",
//     owner: "Hendry Milner",
//     contact_methods: [
//       "email",
//       "call",
//       "video",
//       "whatsapp",
//       "linkedin",
//       "facebook",
//     ],
//     status: "Active",
//   },
//   {
//     id: 5,
//     name: "Benedetto",
//     username: "brossiter15",
//     phone: "+61 400 123 456",
//     email: "stracke.jesus@example.net",
//     tags: "Urgent, Design",
//     location: "Sydney, Australia",
//     owner: "Hendry Milner",
//     contact_methods: [
//       "email",
//       "call",
//       "video",
//       "whatsapp",
//       "linkedin",
//       "facebook",
//     ],
//     status: "Active",
//   },
//   {
//     id: 6,
//     name: "Benedetto",
//     username: "brossiter15",
//     phone: "+91 9876543210",
//     email: "stracke.jesus@example.net",
//     tags: "Urgent, Design",
//     location: "Mumbai, India",
//     owner: "Hendry Milner",
//     contact_methods: [
//       "email",
//       "call",
//       "video",
//       "whatsapp",
//       "linkedin",
//       "facebook",
//     ],
//     status: "Active",
//   },
//   {
//     id: 7,
//     name: "Benedetto",
//     username: "brossiter15",
//     phone: "+91 9876543210",
//     email: "stracke.jesus@example.net",
//     tags: "Urgent, Design",
//     location: "Surat, India",
//     owner: "Hendry Milner",
//     contact_methods: [
//       "email",
//       "call",
//       "video",
//       "whatsapp",
//       "linkedin",
//       "facebook",
//     ],
//     status: "Inactive",
//   },
// ];

const ContactListing = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const GET_API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/tnt-contact`;
  const { dataManager, actionBegin, gridRef } =
    useDataManager(GET_API_ENDPOINT);

  const handleCommandClick = async (args: any) => {
    if (args.commandColumn.type === "Edit") {
      const selectedRow = args.rowData;
      const contactId = selectedRow?.contact?.contact_id;
      router.push(`/contact/edit-contact/${contactId}`);
    }

    if (args.commandColumn.type === "Delete") {
      if (typeof window !== "undefined") {
        const selectedRow = args.rowData;
        const contactId = selectedRow?.contact?.contact_id;
        // eslint-disable-next-line no-alert
        const confirmed = window?.confirm(
          "Are you sure you want to delete this contact?"
        );

        if (confirmed) {
          try {
            const response = await dispatch(deleteContact(contactId)).unwrap();
            if (response) {
              const grid = gridRef?.current;
              if (grid) {
                grid.refresh();
              }
            }
          } catch (error) {
            console.log("Delete Contact Error:", error);
          }
        }
      }
    }
  };

  const nameTemplate = (data: any) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* <Image
          src={user_img}
          alt="Profile"
          style={{ width: 30, height: 30, borderRadius: 50, marginRight: 10 }}
        /> */}
        <div className="avatar-block me-3">
          <div className="e-avatar e-avatar-xsmall e-avatar-circle">
            {getNameInitials(
              `${data.contact.first_name} ${data.contact.last_name}`
            )}
          </div>
        </div>
        <div>
          <div style={{ fontWeight: "bold" }}>
            {data.contact.first_name} {data.contact.last_name}
          </div>
          {/* <div style={{ color: "gray" }}>@{data.contact.username}</div> */}
        </div>
      </div>
    );
  };

  const locationTemplate = (data: any) => {
    const address = data?.addresses?.[0]; // Safely access the first address

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

  // const contactIconsTemplate = () => {
  //   return (
  //     <div style={{ display: "flex", gap: 8 }}>
  //       <span style={{ cursor: "pointer" }}>
  //         <Icon icon="material-symbols:mail-rounded" width="17" height="14" />
  //       </span>
  //       <span style={{ cursor: "pointer" }}>
  //         <Icon icon="tabler:phone-check" width="17" height="14" />
  //       </span>
  //       <span style={{ cursor: "pointer" }}>
  //         <Icon icon="fluent:chat-empty-48-regular" width="17" height="14" />
  //       </span>
  //       <span style={{ cursor: "pointer" }}>
  //         <Icon icon="la:skype" width="17" height="14" />
  //       </span>
  //       <span style={{ cursor: "pointer" }}>
  //         <Icon icon="iconoir:facebook" width="17" height="14" />
  //       </span>
  //     </div>
  //   );
  // };

  const statusTemplate = (data: any) => {
    return (
      <span
        style={{
          display: "inline-block",
          padding: 5,
          borderRadius: 12,
          background: data.contact.status === "Active" ? "#E5F8E5" : "#F8E5E5",
          color: data.contact.status === "Active" ? "#28A745" : "#DC3545",
          fontWeight: "bold",
        }}
      >
        {data.contact.status.replace(/_/g, " ")}
      </span>
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
    // { type: "checkbox", allowSorting: false, allowFiltering: false, width: 50 },
    { field: "name", headerText: "Name", width: 200, template: nameTemplate },
    {
      field: "phone",
      headerText: "Phone",
      template: (data: any) => renderPhone(data.phones[0]?.phone_number),
    },
    {
      field: "email",
      headerText: "Email",
      template: (data: any) => renderEmail(data.emails[0]?.email),
    },
    // { field: "tags", headerText: "Tags" },
    {
      field: "location",
      headerText: "Location",
      template: locationTemplate,
    },
    // { field: "owner", headerText: "Owner" },
    // {
    //   field: "contact",
    //   headerText: "Contact",
    //   template: contactIconsTemplate,
    // },
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

  return (
    <div className="common_data_grid add_data_grid_action_bar">
      <div className="data_grid_action_bar_div">
        {/* <div className="contect_tb_header">
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
                min={new Date()}  
                cssClass="e-outline"
              ></DatePickerComponent>
            </div>
          </div>
        </div> */}
        <div className="title_box_div">
          <h4 className="common_header_data_text">{`Contacts`}</h4>
        </div>
        <div className="icon_box_flex_box justify-content-end">
          <div className="icon_box_div">
            <Icon icon="uiw:file-pdf" width="20" height="20" />
          </div>
          <div className="icon_box_div">
            <Icon icon="lsicon:file-xls-filled" width="20" height="20" />
          </div>
          <Link href="/contact/add-contact" className="common_small_btn_icon">
            <Icon icon="carbon:add-filled" width="16" height="16" /> Add contact
          </Link>
        </div>
      </div>
      <NewDataGrid
        columns={columns}
        dataSource={dataManager}
        // dataSource={contacts}
        gridRef={gridRef}
        actionBegin={actionBegin}
        handleCommandClick={handleCommandClick}
        toolbar={["Search"]}
      />
    </div>
  );
};
export default ContactListing;
