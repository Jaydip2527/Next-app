"use client";
import * as React from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Page,
} from "@syncfusion/ej2-react-grids";
import { SwitchComponent } from "@syncfusion/ej2-react-buttons";
import { useAppDispatch, useAppSelector } from "@/@/redux/redux-hooks";
import { fetchOrganizations } from "@/@/redux/slices/organizationSlice";

function DataGridComponent() {
  let grid: GridComponent | null;
  const toggleQueryString = (args: any) => {
    (grid as GridComponent).pageSettings.enableQueryString = args.checked;
  };
  const { organizationsList } = useAppSelector((state) => state.organization);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(
      fetchOrganizations({
        page: 1,
        limit: 6,
        search: "",
        sortBy: "",
        sortOrder: "",
      })
    );
  }, []);
  console.log("organizationsList", organizationsList);
  return (
    <div>
      <label style={{ padding: "30px 17px 0 0" }}>
        Enable/Disable Query String
      </label>
      <SwitchComponent change={toggleQueryString}></SwitchComponent>
      <GridComponent
        dataSource={organizationsList?.data}
        height={265}
        ref={(g) => (grid = g)}
        allowPaging={true}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="OrderID"
            headerText="Order ID"
            width="120"
            textAlign="Right"
            isPrimaryKey={true}
          />
          <ColumnDirective
            field="organization_name"
            headerText="Customer ID"
            width="140"
          />
        </ColumnsDirective>
        <Inject services={[Page]} />
      </GridComponent>
    </div>
  );
}
export default DataGridComponent;

// // "use client";
// import { useEffect } from "react";
// import {
//   ColumnDirective,
//   ColumnsDirective,
//   GridComponent,
//   Inject,
//   Page,
//   Sort,
//   Filter,
//   Group,
// } from "@syncfusion/ej2-react-grids";
// import { useAppDispatch, useAppSelector } from "@/@/redux/redux-hooks";
// import { fetchOrganizations } from "@/@/redux/slices/organizationSlice";
// // import { data } from "./datasource";

// export default function DataGridComponent() {
//   const { organizationsList } = useAppSelector((state) => state.organization);
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     dispatch(
//       fetchOrganizations({
//         page: 1,
//         limit: 6,
//         search: "",
//         sortBy: "",
//         sortOrder: "",
//       })
//     );
//   }, [dispatch]);

//   const pageSettings = { pageSize: 5, pageSizes: [5, 10, 15] };
//   const editSettings = {
//     allowEditing: true,
//     allowAdding: true,
//     allowDeleting: true,
//     mode: "Normal",
//   };

//   return (
//     <>
//       <h2>Syncfusion React Grid Component</h2>
//       {organizationsList?.data && (
//         <GridComponent
//           dataSource={organizationsList?.data || []}
//           allowGrouping={true}
//           allowSorting={true}
//           allowFiltering={true}
//           allowPaging={true}
//           // pageSettings={{
//           //   pageSize: 5,
//           //   currentPage: 1,
//           //   // pageCount: 10,
//           //   // pageSizes: [5, 10, 15],
//           //   totalRecordsCount: organizationsList?.total_records,
//           // }}
//           // filterSettings={filterSettings}
//           height={180}
//           editSettings={editSettings}
//           // toolbar={toolbarOptions}
//           filterSettings={{ type: "Menu" }}
//           pageSettings={pageSettings}
//           // allowPaging={true}
//           showColumnChooser={true}
//           // allowFiltering={true}
//           // allowSorting={true}
//         >
//           <ColumnsDirective>
//             <ColumnDirective
//               field="organization_name"
//               width="100"
//               textAlign="Left"
//             />
//             {/* <ColumnDirective field="CustomerID" width="100" />
//           <ColumnDirective field="EmployeeID" width="100" textAlign="Right" />
//           <ColumnDirective
//             field="Freight"
//             width="100"
//             format="C2"
//             textAlign="Right"
//           />
//           <ColumnDirective field="ShipCountry" width="100" /> */}
//           </ColumnsDirective>
//           <Inject services={[Page, Sort, Filter, Group]} />
//         </GridComponent>
//       )}
//     </>
//   );
// }
