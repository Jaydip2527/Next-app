"use client";

import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import NewDataGrid from "../../new-data-grid";
import useDataManager from "@/@/hooks/useDataManager";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

const CustomerAdmins = () => {
  const toolbarOptions: any = ["Add", "Edit", "Search"];
  const [position] = React.useState<any>("TopCenter");

  let dReady = false;
  let dtTime = false;
  let isDataChanged = true;
  let intervalFun;
  let clrIntervalFun;
  let gridInstance;
  let stTime;

  function onDataBound() {
    clearTimeout(clrIntervalFun);
    clearInterval(intervalFun);
    dtTime = true;
  }
  function onComplete(args) {
    if (args.requestType === "filterchoicerequest") {
      if (
        args.filterModel.options.field === "Trustworthiness" ||
        args.filterModel.options.field === "Rating" ||
        args.filterModel.options.field === "Status"
      ) {
        var span =
          args.filterModel.dialogObj.element.querySelectorAll(
            ".e-selectall"
          )[0];
        if (!isNullOrUndefined(span)) {
          closest(span, ".e-ftrchk").classList.add("e-hide");
        }
      }
    }
  }
  const hostUrl = "https://services.syncfusion.com/react/production/";
  const GET_API_ENDPOINT = `${hostUrl}UrlDataSource`;
  const { dataManager, actionBegin, gridRef } =
    useDataManager(GET_API_ENDPOINT);

  const check = {
    type: "CheckBox",
  };
  const select = {
    persistSelection: true,
    type: "Multiple",
    checkboxOnly: true,
  };

  function onLoad(args) {
    document
      .getElementById("overviewgrid")
      .ej2_instances[0].on("data-ready", () => {
        dReady = true;
        stTime = performance.now();
      });
    var observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        if (dReady && stTime && isDataChanged) {
          let msgEle = document.getElementById("msg");
          let val = (performance.now() - stTime).toFixed(0);
          stTime = null;
          dReady = false;
          dtTime = false;
          isDataChanged = false;
          msgEle.innerHTML = "Load Time: " + "<b>" + val + "</b>" + "<b>ms</b>";
          msgEle.classList.remove("e-hide");
        }
      });
    });
    observer.observe(document.getElementById("overviewgrid"), {
      attributes: true,
      childList: true,
      subtree: true,
    });
  }
  const gridFilter = {
    type: "Menu",
  };

  const columns = [
    {
      type: "checkbox",
      allowSorting: false,
      allowFiltering: false,
      width: "60",
    },
    {
      field: "staff_member",
      headerText: "Staff Member",
      width: "200",
      textAlign: "Left",
    },
    {
      field: "date_assigned",
      headerText: "Date Assigned",
      width: "200",
      textAlign: "Left",
    },
    {
      field: "action",
      headerText: "Action",
      width: "200",
      textAlign: "Left",
    },
  ];

  return (
    <>
      <div className="common_data_grid add_data_grid_action_bar mb-3">
        <div className="data_grid_action_bar_div">
          <div className="icon_box_flex_box justify-content-end">
            <TooltipComponent
              content="Export to Excel"
              position={position}
              tabIndex={0}
            >
              <div className="icon_box_div">
                <Icon icon="lsicon:file-xls-filled" width="20" height="20" />
              </div>
            </TooltipComponent>

            <Link href="/lead/add-lead" className="common_small_btn_icon">
              <Icon icon="carbon:add-filled" width="16" height="16" /> Add lead
            </Link>
          </div>
        </div>
        <NewDataGrid
          columns={columns}
          dataSource={dataManager}
          gridRef={gridRef}
          actionBegin={actionBegin}
          toolbar={["Add", "Edit", "Search"]}
          allowPaging={true}
        />
      </div>

      <div className="company_form_btn_sec m-0">
        <div className="company_btn_sec">
          <button type="button" className="common_secondary_btn">
            Skip
          </button>
          <button type="button" className="common_secondary_btn">
            Back
          </button>
          <button type="submit" className="common_btn">
            Save
          </button>
        </div>
      </div>
    </>
  );
};
export default CustomerAdmins;
