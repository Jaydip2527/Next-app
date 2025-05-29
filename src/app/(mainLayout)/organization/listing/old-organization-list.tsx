"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./listing.module.scss";
import { useAppDispatch, useAppSelector } from "@/@/redux/redux-hooks";
import {
  deleteOrganization,
  fetchOrganizations,
} from "@/@/redux/slices/organizationSlice";
import { ORGANIZATION_PAGE_TITLE } from "@/@/utils/constant";
import DataGrid from "@/@/component/data-grid";
import { renderPhone } from "@/@/utils/dataGridCommonFunc";

const OrganizationList = () => {
  const { organizationsList } = useAppSelector((state) => state.organization);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // State for pagination, search, and sorting
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(5);
  const [search, setSearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState("");
  // const [list, setList] = React.useState({
  //   data: [],
  //   total_records: 0,
  //   index: 0,
  // });

  useEffect(() => {
    if (page && limit) {
      dispatch(fetchOrganizations({ page, limit, search, sortBy, sortOrder }));
    }
  }, [page, limit, search, sortBy, sortOrder]);

  // useEffect(() => {
  //   console.log("innnnnnnnnnnn", organizationsList);
  //   if (organizationsList.data.length > 0 && list.index === 0) {
  //     setList({
  //       data: organizationsList.data,
  //       total_records: organizationsList.total_records,
  //       index: 1,
  //     });
  //   }
  // }, [organizationsList]);
  // console.log("outerrrrrr", organizationsList, list);
  const handlePageChange = (args: any) => {
    // eslint-disable-next-line no-console
    console.log("page, limit", page, limit);
    // eslint-disable-next-line no-console
    console.log("args handlePageChange:", args);
    if (args.currentPage !== page || args.pageSize !== limit) {
      setPage(args.currentPage);
      setLimit(args.pageSize);
      // if (false) {
      //   setLimit(args.pageSize);
      // }
      // dispatch(
      //   fetchOrganizations({
      //     page: args.currentPage,
      //     limit: args.pageSize,
      //     search,
      //     sortBy,
      //     sortOrder,
      //   })
      // );
    }
  };

  // Handle search
  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
    setPage(1); // Reset to page 1 on new search
  };

  // const debouncedSearch = React.useCallback(
  //   (value : string) => {
  //     const handleSearch = (searchValue: string) => {
  //       setSearch(searchValue);
  //       setPage(1); // Reset to page 1 on new search
  //     };
  //     return _.debounce(handleSearch, 300)(value);
  //   },
  //   []
  // );

  // Handle sorting
  const handleSorting = (args: any) => {
    if (args.requestType === "sorting") {
      const { field, direction } = args;
      setSortBy(field);
      setSortOrder(direction);
    }
  };

  const handleAddClick = () => {
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
              dispatch(
                fetchOrganizations({ page, limit, search, sortBy, sortOrder })
              );
              dispatch(
                fetchOrganizations({ page, limit, search, sortBy, sortOrder })
              );
            }
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log("Delete Organization Error:", error);
          }
        }
      }
    }
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

  const addressTemplate = (props: any) => {
    const addresses = props?.address_details?.addresses || [];
    if (addresses.length > 0) {
      const address = addresses[0]; // Assuming you need only the first address
      return (
        <div>
          <span>{address?.address_name}</span>
        </div>
      );
    }
    return <span>No Address</span>;
  };

  const contactPersonTemplate = (props: any) => {
    const contactName = props?.contact_persons?.name || "--";
    return (
      <div>
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

  const columns = [
    {
      type: "checkbox",
      allowSorting: false,
      allowFiltering: false,
      width: "60",
    },
    {
      field: "organization_id",
      headerText: "ID",
      isPrimaryKey: true,
      visible: false,
    },
    {
      field: "organization_name",
      headerText: "Organization",
      width: "200",
      textAlign: "Left",
    },
    {
      field: "address_details",
      headerText: "Location",
      width: "200",
      textAlign: "Left",
      template: addressTemplate,
    },
    {
      field: "industry",
      headerText: "Industry",
      width: "150",
      textAlign: "Left",
    },
    {
      field: "contact_persons",
      headerText: "Contact Person",
      width: "150",
      textAlign: "Left",
      template: contactPersonTemplate,
    },
    {
      field: "phone_number",
      headerText: "Phone",
      width: "150",
      textAlign: "Left",
      template: (data: any) => renderPhone(data?.phone_number),
    },
    {
      field: "gst_registration_type",
      headerText: "GST Type",
      width: "200",
      textAlign: "Left",
    },
    {
      field: "status",
      headerText: "Status",
      template: statusTemplate,
      width: "130",
      textAlign: "Center",
    },
    {
      // headerText: "Manage Records",
      width: "160",
      commands: commands(),
    },
  ];

  return (
    <div className="common_data_grid">
      {organizationsList?.data && organizationsList?.data.length > 0 ? (
        <DataGrid
          // key={organizationsList?.total_records}
          data={organizationsList?.data || []}
          columns={columns}
          totalRecordsCount={organizationsList?.total_records || 0}
          pageSize={limit}
          currentPage={page}
          select={{
            persistSelection: true,
            type: "Multiple",
            checkboxOnly: true,
          }}
          toolbar={[
            "Search",
            {
              text: ORGANIZATION_PAGE_TITLE.ADD,
              id: "addOrg",
              prefixIcon: "e-icons e-add",
            },
          ]}
          toolbarClick={(args: any) => {
            if (args.item.id === "addOrg") {
              handleAddClick();
            }
            if (args.item.id === "Search") {
              handleSearch(args.event.target.value);
            }
          }}
          commandClick={handleCommandClick}
          onPageChange={handlePageChange}
          onSorting={handleSorting}
        />
      ) : (
        <div className="no-records">
          No organizations found. Try searching or adding a new one.
        </div>
      )}
    </div>
  );
};

export default React.memo(OrganizationList);
