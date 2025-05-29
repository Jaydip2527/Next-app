"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "@/@/redux/redux-hooks";
import { deleteLeadTask, resetLeadTask } from "@/@/redux/slices/leadTaskSlice";
import { convertTimestampToDate } from "@/@/utils/dateFormate";
import { SOURCE_TYPE } from "@/@/utils/constant";
import useDataManager from "@/@/hooks/useDataManager";
import {
  renderAssignedUsers,
  renderPriority,
  renderStatus,
} from "@/@/utils/dataGridCommonFunc";
import AddTaskPage from "./add-task/page";
import NewDataGrid from "../../new-data-grid";

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

export const LeadsTask = () => {
  const dispatch = useAppDispatch();
  const [viewMode, setViewMode] = useState("list");
  const [selectedTask, setSelectedTask] = useState(null);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [isRefresh, setIsRefresh] = useState(false);

  const { lead } = useAppSelector((state) => state.lead);

  const GET_API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/tnt-task`;
  const { dataManager, actionBegin, gridRef } = useDataManager(
    GET_API_ENDPOINT,
    {
      SourceType: SOURCE_TYPE?.LEAD,
      SourceId: lead?.lead?.lead_id,
    }
  );

  const handleCommandClick = async (args: any) => {
    if (args.commandColumn.type === "Edit") {
      setSelectedTask(args.rowData);
      setViewMode("form");
    }

    if (args.commandColumn.type === "Delete") {
      if (typeof window !== "undefined") {
        // eslint-disable-next-line no-alert
        const confirmed = window?.confirm(
          "Are you sure you want to delete this lead?"
        );
        const selectedRow = args.rowData;

        if (confirmed) {
          const params = {
            SourceId: lead?.lead?.lead_id,
            SourceType: SOURCE_TYPE?.LEAD,
          };
          try {
            const response = await dispatch(
              deleteLeadTask({ id: selectedRow?.task_id, params })
            ).unwrap();
            if (response) {
              setIsRefresh(true);
            }
          } catch (error) {
            // console.error("Delete Lead Error:", error);
            console.log("Delete Lead Error:", error);
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
    {
      // headerText: "Manage Records",
      commands: commands(),
    },
  ];

  return (
    <>
      {viewMode === "list" ? (
        <div className="common_data_grid add_data_grid_action_bar">
          <div className="data_grid_action_bar_div">
            <div className="title_box_div">
              <h4 className="common_header_data_text">Tasks</h4>
            </div>
            <div className="icon_box_flex_box justify-content-end">
              <button
                className="common_small_btn_icon"
                onClick={() => {
                  setSelectedTask(null); // reset selected task when creating new
                  setViewMode("form"); // switch to form view
                  dispatch(resetLeadTask());
                }}
              >
                <Icon icon="carbon:add-filled" width="16" height="16" />
                New Task
              </button>
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
      ) : (
        <AddTaskPage
          setIsRefresh={setIsRefresh}
          task={selectedTask} // null for new, or task object for edit
          onCancel={() => setViewMode("list")} // go back to list
        />
      )}
    </>
  );
};

export default LeadsTask;
