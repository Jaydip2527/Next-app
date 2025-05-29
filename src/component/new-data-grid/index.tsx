"use client";
import {
  CommandColumn,
  GridComponent,
  Inject,
  Page,
  Sort,
  VirtualScroll,
  Selection,
  ColumnsDirective,
  ColumnDirective,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import EmptyTableNoDataFound from "../empty-table";

const NewDataGrid = ({
  dataSource,
  gridRef,
  actionBegin,
  handleCommandClick,
  columns,
  toolbar,
  toolbarClick,
  allowPaging = true,
  enableHove = false,
  allowSorting = true,
  allowEditing = true,
  allowDeleting = true,
  allowAdding = true,
}: any) => {
  return (
    <div className="common_data_grid">
      <GridComponent
        ref={gridRef}
        id="overviewgrid"
        dataSource={dataSource}
        allowPaging={allowPaging}
        enableHover={enableHove}
        loadingIndicator={{ indicatorType: "Shimmer" }}
        pageSettings={{
          pageSize: 10,
          pageSizes: [10, 20, 30, 40, 50],
        }}
        rowHeight={38}
        allowSorting={allowSorting}
        editSettings={{
          allowEditing,
          allowDeleting,
          allowAdding,
        }}
        actionBegin={actionBegin}
        commandClick={handleCommandClick}
        toolbar={toolbar}
        toolbarClick={toolbarClick}
        selectionSettings={{
          persistSelection: true,
          type: "Single",
          checkboxOnly: true,
        }}
        emptyRecordTemplate={() => <EmptyTableNoDataFound />}
      >
        <ColumnsDirective>
          {columns.map((col: any, index: number) => (
            <ColumnDirective key={index} {...col} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Page,
            Sort,
            Toolbar,
            CommandColumn,
            Selection,
            VirtualScroll,
          ]}
        />
      </GridComponent>
    </div>
  );
};

export default NewDataGrid;
