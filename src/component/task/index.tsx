"use client";
import React from "react";
import useDataManager from "@/@/hooks/useDataManager";
import {
  renderAssignedUsers,
  renderPriority,
  renderStatus,
} from "@/@/utils/dataGridCommonFunc";
import { convertTimestampToDate } from "@/@/utils/dateFormate";
import NewDataGrid from "../new-data-grid";

const nameTemplate = (data: any) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <div>
      <div style={{ fontWeight: "bold" }}>{data.task_title}</div>
      {/* <div style={{ color: "gray", fontSize: 12 }}>
        @{data.name.replace(/\s+/g, "").toLowerCase()}
      </div> */}
    </div>
  </div>
);

const TaskListing = () => {
  //   const router = useRouter();
  //   const dispatch = useAppDispatch();
  const GET_API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/tnt-task/task-list`;
  const { dataManager, actionBegin, gridRef } = useDataManager(
    GET_API_ENDPOINT,
    { is_with_respect_branch: 1 }
  );

  const handleCommandClick = async (args: any) => {
    console.log("args :>> ", args);
    // if (args.commandColumn.type === "Edit") {
    //   const selectedRow = args.rowData;
    //   const taskId = selectedRow?.task?.task_id;
    //   router.push(`/task/edit-task/${taskId}`);
    // }
  };

  const columns = [
    // { type: "checkbox", allowSorting: false, allowFiltering: false, width: 50 },
    { field: "task_public_id", headerText: "#" },
    { field: "task_title", headerText: "Title", template: nameTemplate },
    {
      field: "status",
      headerText: "Status",
      template: (data: any) => renderStatus(data?.status),
    },
    {
      field: "start_date",
      headerText: "Start Date",
      clipMode: "EllipsisWithTooltip",
      template: (data: any) => convertTimestampToDate(data.start_date),
    },
    {
      field: "due_date",
      headerText: "Due Date",
      clipMode: "EllipsisWithTooltip",
      template: (data: any) => convertTimestampToDate(data.due_date),
    },
    {
      field: "assigned_to",
      headerText: "Assign To",
      template: (data: any) => renderAssignedUsers(data?.assigned_to),
    },
    // {
    //   field: "tags",
    //   headerText: "Tags",
    //   template: (data: any) => renderTags(data?.tags),
    //   width: 180,
    // },
    {
      field: "priority",
      headerText: "Priority",
      template: (data: any) => renderPriority(data?.priority),
    },
    // {
    //   // headerText: "Manage Records",
    //   commands: commands(),
    // },
  ];

  return (
    <div className="common_data_grid add_data_grid_action_bar">
      <div className="data_grid_action_bar_div">
        <div className="title_box_div">
          <h4 className="common_header_data_text">Tasks</h4>
        </div>
      </div>
      <NewDataGrid
        columns={columns || []}
        dataSource={dataManager}
        gridRef={gridRef}
        actionBegin={actionBegin}
        handleCommandClick={handleCommandClick}
        toolbar={["Search"]}
      />
    </div>
  );
};

export default TaskListing;
