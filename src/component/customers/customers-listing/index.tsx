"use client";

import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import NewDataGrid from "../../new-data-grid";
import useDataManager from "@/@/hooks/useDataManager";

const OrganizationList = () => {
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
      field: "customer_name",
      headerText: "Name",
      width: "200",
      textAlign: "Left",
    },
    {
      field: "customer_type",
      headerText: "Customer Type",
      width: "200",
      textAlign: "Left",
    },
    {
      field: "company_name",
      headerText: "Company Name",
      width: "200",
      textAlign: "Left",
    },
    {
      field: "gst_treatment",
      headerText: "GST Treatment",
      width: "200",
      textAlign: "Left",
    },
    {
      field: "receivables_payables",
      headerText: "Receivables/Payables",
      width: "200",
      textAlign: "Left",
    },
    {
      field: "unused_credits",
      headerText: "Unused Credits",
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
              href="/customers/add-customers"
              className="common_small_btn_icon"
            >
              <Icon icon="carbon:add-filled" width="16" height="16" /> Add
              Customer
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
export default OrganizationList;
