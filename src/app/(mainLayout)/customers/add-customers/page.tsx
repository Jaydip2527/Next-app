"use client";

import React from "react";
import "../../../Tab.scss";
// import { Col, Row } from "react-bootstrap";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import CustomerDetail from "@/@/component/customers/customer-detail";

const AddCustomersPage = () => {
  // const [overflow] = useState("Scrollable");
  // const [headerPlacement] = useState("Left");

  const tabRender = (tabs: string) => {
    if (tabs === "Profile") {
      return <CustomerDetail />;
    } else if (tabs === "Estimates") {
      return <CustomerDetail />;
    } else if (tabs === "Projects") {
      return <CustomerDetail />;
    } else if (tabs === "Tickets") {
      return <CustomerDetail />;
    } else if (tabs === "Files") {
      return <CustomerDetail />;
    } else if (tabs === "Reminders") {
      return <CustomerDetail />;
    }
  };

  const headertext = [
    { text: "Profile", iconCss: "e-icons e-paste" },
    { text: "Estimates", iconCss: "e-icons e-paste" },
    { text: "Projects", iconCss: "e-icons e-paste" },
    { text: "Tickets", iconCss: "e-icons e-paste" },
    { text: "Files", iconCss: "e-icons e-paste" },
    { text: "Reminders", iconCss: "e-icons e-paste" },
  ];

  return (
    <>
      <div className="common_header_main_div">
        <h4 className="common_header_data_text"> Add Customer </h4>
        <div className="breadcrumb_main_div">
          <label className="breadcrumb_link_text">Dashboard </label>
          <label className="dots_icon"></label>
          <label className="breadcrumb_page_text">Customers </label>
        </div>
      </div>

      {/* <div className="customer_side_menu_main">
        </div> */}
      <div className="customer_side_menu_main">
        <div className="vertical_tab_menu_main">
          <TabComponent
            cssClass="responsive-mode"
            heightAdjustMode="None"
            // overflowMode={overflow}
            // headerPlacement={headerPlacement}
          >
            <TabItemsDirective>
              <TabItemDirective
                header={headertext[0]}
                content={() => tabRender("Profile")}
              />
              <TabItemDirective
                header={headertext[1]}
                content={() => tabRender("Estimates")}
              />
              <TabItemDirective
                header={headertext[2]}
                content={() => tabRender("Projects")}
              />
              <TabItemDirective
                header={headertext[3]}
                content={() => tabRender("Tickets")}
              />
              <TabItemDirective
                header={headertext[4]}
                content={() => tabRender("Files")}
              />
              <TabItemDirective
                header={headertext[5]}
                content={() => tabRender("Reminders")}
              />
            </TabItemsDirective>
          </TabComponent>
        </div>
      </div>
    </>
  );
};

export default AddCustomersPage;
