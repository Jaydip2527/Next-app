"use client";

import React from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Page,
  Toolbar,
  Selection,
  Filter,
  VirtualScroll,
  Sort,
  Edit,
  CommandColumn,
} from "@syncfusion/ej2-react-grids";
import "@syncfusion/ej2-react-grids/styles/material.css";
// import { closest, isNullOrUndefined } from "@syncfusion/ej2-base";

interface DataGridProps {
  data: any[];
  columns: any[];
  allowFiltering?: boolean;
  allowSorting?: boolean;
  allowPaging?: boolean;
  pageSize?: number;
  currentPage?: number;
  totalRecordsCount?: number;
  select?: any;
  editSettings?: any;
  filterType?: "Menu" | "CheckBox";
  toolbar?: any;
  toolbarClick?: (args: any) => void;
  commandClick?: (args: any) => void;
  onPageChange?: (args: any) => void;
  onSorting?: (args: any) => void;
}

const DataGrid: React.FC<DataGridProps> = ({
  data,
  columns,
  // allowFiltering = true,
  // allowSorting = true,
  // allowPaging = true,
  pageSize = 5,
  currentPage = 1,
  totalRecordsCount = 0,
  select = {
    persistSelection: true,
    type: "Multiple",
    checkboxOnly: true,
  },
  editSettings = { allowEditing: false, allowAdding: true },
  filterType = "Menu",
  toolbar,
  toolbarClick,
  commandClick,
  onPageChange,
  onSorting,
}) => {
  const gridFilter: any = { type: filterType };

  // console.log("Grid Data:", data);
  // console.log("Page Size:", pageSize);
  // console.log("Current Page:", currentPage);
  // console.log("Total Records Count:", totalRecordsCount);
  // console.log("Total Pages:", Math.ceil(totalRecordsCount / pageSize));
  // console.log(
  //   "Total 0000000000:",
  //   totalRecordsCount % pageSize > 0
  //     ? Math.round(totalRecordsCount / pageSize + 1)
  //     : Math.round(totalRecordsCount / pageSize)
  // );

  return (
    <>
      {data.length > 0 && totalRecordsCount > 0 ? (
        <GridComponent
          // key={Math.ceil(totalRecordsCount / pageSize)}
          id="overviewgrid"
          dataSource={data}
          loadingIndicator={{ indicatorType: "Shimmer" }}
          enableHover={false}
          rowHeight={38}
          allowPaging={true}
          filterSettings={gridFilter}
          allowFiltering={true}
          allowSorting={true}
          allowSelection={true}
          // enablePersistence={true}
          editSettings={editSettings}
          selectionSettings={select}
          commandClick={commandClick}
          // actionComplete={(args: any) => {
          //   if (args.requestType === "paging" && onPageChange) {
          //     // eslint-disable-next-line no-console
          //     console.log("args :>> in actionComplete paging", args);
          //     onPageChange(args);
          //   }
          //   if (args.requestType === "sorting" && onSorting) {
          //     onSorting(args);
          //   }
          // }}
          actionBegin={(args: any) => {
            if (args.requestType === "paging" && onPageChange) {
              console.log("Paging event detected:", args);
              onPageChange(args);
            }
            if (args.requestType === "sorting" && onSorting) {
              console.log("Sorting event detected:", args);
              onSorting(args);
            }
          }}
          pageSettings={{
            pageSize: pageSize || 5,
            currentPage: currentPage || 1,
            // currentPage: currentPage - 1 || 0,
            totalRecordsCount: Number(totalRecordsCount) || 0,
            // totalRecordsCount: data.length || 0,
            pageCount: Math.ceil(totalRecordsCount / pageSize) || 1,
            // pageCount:
            //   totalRecordsCount % pageSize > 0
            //     ? Math.round(totalRecordsCount / pageSize + 1)
            //     : Math.round(totalRecordsCount / pageSize),
            // pageCount: 5,
            // responsepageCount: Math.ceil(totalRecordsCount / pageSize),
            pageSizes: [1, 5, 10, 15, 20],
            // pageSizes: true,
            // enableQueryString: false,
          }}
          toolbar={toolbar}
          toolbarClick={(args) => {
            if (toolbarClick) {
              toolbarClick(args);
            }
          }}
        >
          <ColumnsDirective>
            {columns.map((col, index) => (
              <ColumnDirective key={index} {...col} />
            ))}
          </ColumnsDirective>
          <Inject
            services={[
              Filter,
              Page,
              VirtualScroll,
              Sort,
              Toolbar,
              Edit,
              Selection,
              CommandColumn,
            ]}
          />
        </GridComponent>
      ) : (
        <div className="no_data_found_sec">
          <span>No data found</span>
        </div>
      )}
    </>
  );
};

export default React.memo(DataGrid);
