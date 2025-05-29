"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import useDataManager from "@/@/hooks/useDataManager";
import NewDataGrid from "../../new-data-grid";

const dummyData = [
  {
    estimate_id: "EST-20231026-001",
    subject: "Website Redesign",
    total: 5000.0,
    date: "2023-10-26",
    open_till: "2023-11-26",
    tags: ["Web Development", "Design"],
    data_created: "2023-10-26T10:00:00Z",
    status: "Pending",
  },
  {
    estimate_id: "EST-20231027-002",
    subject: "Mobile App Development",
    total: 12000.0,
    date: "2023-10-27",
    open_till: "2023-12-27",
    tags: ["Mobile", "Development", "iOS", "Android"],
    data_created: "2023-10-27T14:30:00Z",
    status: "Sent",
  },
  {
    estimate_id: "EST-20231028-003",
    subject: "Marketing Campaign",
    total: 8000.0,
    date: "2023-10-28",
    open_till: "2023-11-28",
    tags: ["Marketing", "Social Media", "Advertising"],
    data_created: "2023-10-28T09:15:00Z",
    status: "Accepted",
  },
  {
    estimate_id: "EST-20231029-004",
    subject: "Graphic Design",
    total: 2500.0,
    date: "2023-10-29",
    open_till: "2023-11-29",
    tags: ["Design", "Branding", "Logo"],
    data_created: "2023-10-29T16:45:00Z",
    status: "Rejected",
  },
  {
    estimate_id: "EST-20231030-005",
    subject: "Data Analysis",
    total: 6000.0,
    date: "2023-10-30",
    open_till: "2023-12-30",
    tags: ["Data", "Analytics", "Reports"],
    data_created: "2023-10-30T11:20:00Z",
    status: "Pending",
  },
  {
    estimate_id: "EST-20231031-006",
    subject: "Software Development",
    total: 15000.0,
    date: "2023-10-31",
    open_till: "2024-01-31",
    tags: ["Software", "Development", "API"],
    data_created: "2023-10-31T13:00:00Z",
    status: "Sent",
  },
  {
    estimate_id: "EST-20231101-007",
    subject: "Content Creation",
    total: 3000.0,
    date: "2023-11-01",
    open_till: "2023-12-01",
    tags: ["Content", "Writing", "SEO"],
    data_created: "2023-11-01T17:30:00Z",
    status: "Accepted",
  },
  {
    estimate_id: "EST-20231102-008",
    subject: "Network Setup",
    total: 4500.0,
    date: "2023-11-02",
    open_till: "2023-12-02",
    tags: ["Network", "IT", "Infrastructure"],
    data_created: "2023-11-02T08:45:00Z",
    status: "Rejected",
  },
  {
    estimate_id: "EST-20231103-009",
    subject: "E-commerce Development",
    total: 9000.0,
    date: "2023-11-03",
    open_till: "2024-01-03",
    tags: ["E-commerce", "Web Development", "Shopify"],
    data_created: "2023-11-03T12:10:00Z",
    status: "Pending",
  },
  {
    estimate_id: "EST-20231104-010",
    subject: "Video Editing",
    total: 3500.0,
    date: "2023-11-04",
    open_till: "2023-12-04",
    tags: ["Video", "Editing", "Production"],
    data_created: "2023-11-04T15:55:00Z",
    status: "Sent",
  },
  {
    estimate_id: "EST-20231105-011",
    subject: "Cloud Migration",
    total: 7500.0,
    date: "2023-11-05",
    open_till: "2024-01-05",
    tags: ["Cloud", "Migration", "AWS", "Azure"],
    data_created: "2023-11-05T10:30:00Z",
    status: "Accepted",
  },
  {
    estimate_id: "EST-20231106-012",
    subject: "UI/UX Design",
    total: 4000.0,
    date: "2023-11-06",
    open_till: "2023-12-06",
    tags: ["UI", "UX", "Design"],
    data_created: "2023-11-06T14:20:00Z",
    status: "Rejected",
  },
  {
    estimate_id: "EST-20231107-013",
    subject: "Database Optimization",
    total: 5500.0,
    date: "2023-11-07",
    open_till: "2024-01-07",
    tags: ["Database", "Optimization", "SQL"],
    data_created: "2023-11-07T09:00:00Z",
    status: "Pending",
  },
  {
    estimate_id: "EST-20231108-014",
    subject: "Security Audit",
    total: 6500.0,
    date: "2023-11-08",
    open_till: "2023-12-08",
    tags: ["Security", "Audit", "Cybersecurity"],
    data_created: "2023-11-08T16:15:00Z",
    status: "Sent",
  },
];

const LeadEstimates = () => {
  // const { organizationsList } = useAppSelector((state) => state.organization);
  // const dispatch = useAppDispatch();
  const router = useRouter();
  const GET_API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/estimation`;
  const { dataManager, actionBegin, gridRef } =
    useDataManager(GET_API_ENDPOINT);

  // useEffect(() => {
  //   dispatch(fetchOrganizations());
  // }, [dispatch]);

  //   const CustomToolbar = () => {
  //     return () => (
  //       <div className="custom-toolbar">
  //         <button className="e-btn e-primary">Add Organization</button>
  //       </div>
  //     );
  //   };

  const handleAddClick = () => {
    router.push("/organizationprofile");
  };

  const handleCommandClick = (args: any) => {
    if (args.commandColumn.type === "Edit") {
      const selectedRow = args.rowData;
      const org = selectedRow.organization_name;
      router.push(`/organizationprofile/${org}`);
    }

    // if (args.commandColumn.type === "Delete") {
    //   const selectedRow = args.rowData;
    //   const organizationId = selectedRow.id;
    //   console.log("Delete Organization:", organizationId);
    // }
  };

  // const statusTemplate = (props: any) => {
  //   const status = String(props?.Status || ""); // Ensure it's a string

  //   return (
  //     <div>
  //       {status === "Active" ? (
  //         <div id="status" className="statustemp e-activecolor">
  //           <span className="statustxt e-activecolor">{props?.Status}</span>
  //         </div>
  //       ) : (
  //         <div id="status" className="statustemp e-inactivecolor">
  //           <span className="statustxt e-inactivecolor">{props?.Status}</span>
  //         </div>
  //       )}
  //     </div>
  //   );
  // };

  const columns = [
    // {
    //   type: "checkbox",
    //   allowSorting: false,
    //   allowFiltering: false,
    //   width: "60",
    // },
    {
      field: "estimate_id",
      headerText: "#Estimate",
      width: "200",
      textAlign: "Left",
    },
    {
      field: "subject",
      headerText: "Subject",
      width: "200",
      textAlign: "Left",
    },
    {
      field: "total",
      headerText: "Total",
      width: "200",
      textAlign: "Left",
    },
    {
      field: "date",
      headerText: "Date",
      width: "200",
      textAlign: "Left",
    },
    {
      field: "open_till",
      headerText: "Open Till",
      width: "200",
      textAlign: "Left",
    },
    {
      field: "tags",
      headerText: "Tags",
      width: "200",
      textAlign: "Left",
    },
    {
      field: "data_created",
      headerText: "Data Created",
      width: "200",
      textAlign: "Left",
    },
    {
      field: "status",
      headerText: "Status",
      width: "200",
      textAlign: "Left",
    },
  ];

  return (
    <>
      <div className="common_data_grid add_data_grid_action_bar">
        <div className="data_grid_action_bar_div">
          <div className="icon_box_flex_box">
            <Link href="/lead/add-task" className="common_small_btn_icon">
              <Icon icon="carbon:add-filled" width="16" height="16" /> new
              estimates
            </Link>
          </div>
          <div className="kanban_search_sec ">
            <div className="e-input-group">
              <input
                className="e-input"
                type="text"
                placeholder="Search Estimates"
              />
              <span className="e-input-group-icon e-date-icon"></span>
            </div>
          </div>
        </div>
        <NewDataGrid
          columns={columns}
          dataSource={dummyData}
          gridRef={gridRef}
          actionBegin={actionBegin}
          handleCommandClick={handleCommandClick}
          toolbar={["Add"]}
          toolbarClick={handleAddClick}
        />
      </div>
    </>
  );
};

export default LeadEstimates;
