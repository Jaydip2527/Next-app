"use client";

import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import NewDataGrid from "../../new-data-grid";
import useDataManager from "@/@/hooks/useDataManager";
// import { MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";
// import Switch from "../../toggle-switch";

const EstimatesListing = () => {
  // const sportsData = ["bug", "follow up", "important"];

  const toolbarOptions: any = ["Add", "Edit", "Search"];

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
          <div className="icon_box_flex_box justify-content-end">
            <Link
              href="/estimates/add-estimates"
              className="common_small_btn_icon"
            >
              <Icon icon="carbon:add-filled" width="16" height="16" /> New
              Estimates
            </Link>
          </div>
        </div>
        <NewDataGrid
          columns={columns}
          dataSource={dataManager}
          gridRef={gridRef}
          actionBegin={actionBegin}
          // toolbar={["Add", "Edit"]}
          // allowPaging={true}
        />
      </div>
    </>
  );
};

export default EstimatesListing;
