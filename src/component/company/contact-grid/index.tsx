import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
// import Link from "next/link";
import useDataManager from "@/@/hooks/useDataManager";
import { useAppDispatch } from "@/@/redux/redux-hooks";
import { deleteCompanyContact } from "@/@/redux/slices/companySlice";
import NewDataGrid from "../../new-data-grid";
import OffCanvasWrapper from "../../off-canvas-wrapper";
import AddNewContactDrawerForm from "../../add-new-contact-drawer";

const ContactGrid = () => {
  const { id: company_id } = useParams();
  const dispatch = useAppDispatch();
  const GET_API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/tnt-contact`;
  const { dataManager, actionBegin, gridRef } = useDataManager(
    GET_API_ENDPOINT,
    { company_id }
  );
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const emailTemplate = (props: any) => {
    return <span>{props?.emails?.[0]?.email || "--"}</span>;
  };

  const phoneTemplate = (props: any) => {
    return <span>{props?.phones?.[0]?.phone_number || "--"}</span>;
  };

  const positionTemplate = (props: any) => {
    return <span>{props?.companies?.[0]?.position || "--"}</span>;
  };

  const commands = () => [
    {
      type: "Delete",
      buttonOption: { cssClass: "e-danger", iconCss: "e-icons e-delete" },
    },
  ];

  const columns = [
    {
      field: "contact.contact_id",
      headerText: "ID",
      isPrimaryKey: true,
      visible: false,
    },
    {
      field: "contact.first_name",
      headerText: "First Name",
    },
    {
      field: "contact.last_name",
      headerText: "Last Name",
    },
    {
      field: "email",
      headerText: "Email",
      template: emailTemplate,
    },
    {
      field: "phone_number",
      headerText: "Phone Number",
      template: phoneTemplate,
    },
    {
      field: "position",
      headerText: "Position",
      template: positionTemplate,
    },
    {
      // headerText: "Manage Records",
      commands: commands(),
    },
  ];

  const handleCommandClick = async (args: any) => {
    if (args.commandColumn.type === "Delete") {
      if (typeof window !== "undefined") {
        const selectedRow = args.rowData;
        // console.log("selectedRow ::", selectedRow);
        const companyContactId = selectedRow?.contact?.contact_id;
        // eslint-disable-next-line no-alert
        const confirmed = window?.confirm(
          "Are you sure you want to delete this Company Contact?"
        );
        if (confirmed) {
          try {
            const response = await dispatch(
              deleteCompanyContact({
                id: companyContactId,
                companyId: company_id as string,
              })
            ).unwrap();
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
      <div className="common_data_grid add_data_grid_action_bar mt-4">
        <div className="data_grid_action_bar_div">
          <div className="contect_tb_header"></div>
          <div className="icon_box_flex_box justify-content-end">
            {/* <Link href="/company/add-contact" className="common_small_btn_icon"> */}
            <button className="common_small_btn_icon" onClick={handleShow}>
              <Icon icon="carbon:add-filled" width="16" height="16" /> add
              contact
            </button>
            {/* </Link> */}
          </div>
        </div>
        <NewDataGrid
          columns={columns}
          dataSource={dataManager || []}
          gridRef={gridRef}
          actionBegin={actionBegin}
          handleCommandClick={handleCommandClick}
        />
      </div>
      <OffCanvasWrapper
        show={show}
        handleClose={handleClose}
        title="Add New Contact"
        placement="end"
      >
        <AddNewContactDrawerForm handleClose={handleClose} />
      </OffCanvasWrapper>
    </>
  );
};

export default React.memo(ContactGrid);
