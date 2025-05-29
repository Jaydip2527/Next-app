"use client";
import * as React from "react";
import { useRef, useState, useEffect } from "react";
import "../../app/app.css";
import Image from "next/image";

import {
  SidebarComponent,
  TreeViewComponent,
  ToolbarComponent,
  ItemsDirective,
  ItemDirective,
} from "@syncfusion/ej2-react-navigations";

import { usePathname, useRouter } from "next/navigation";
import { handleClearStorage } from "@/@/libs/axios";
import { persistor } from "@/@/redux/store";
import { resetOrganization } from "@/@/redux/slices/organizationSlice";
import { useAppDispatch } from "@/@/redux/redux-hooks";
import { logoutUser } from "@/@/redux/slices/authSlice";
import {
  saveCompanyDetails,
  saveOrganizationSetup,
  saveTaxationDetails,
} from "@/@/redux/slices/organizationProfileSlice";
import Header from "../header";
import HeaderLogo from "../../../public/Images/header-logo.png";
import FavIcon from "../../../public/Images/fav-icon.png";
import CommonProgressButton from "../common-progress-button";

const DashboardStructure = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const sidebarobj = useRef<SidebarComponent | null>(null);

  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

  // Function to find node and track its parents for n-level nesting
  const findNodeAndParents = (
    nodes: any[],
    segments: string[],
    index = 0,
    parents = []
  ): any => {
    if (index >= segments.length)
      return { selectedNode: null, parentNodes: parents };

    const currentSegment = segments[index];
    const matchingNode = nodes.find((node) => node.key === currentSegment);

    if (!matchingNode) return { selectedNode: null, parentNodes: parents };

    const newParents: any = [...parents, matchingNode.nodeId];

    if (matchingNode.nodeChild?.length > 0) {
      return findNodeAndParents(
        matchingNode.nodeChild,
        segments,
        index + 1,
        newParents
      );
    }

    return { selectedNode: matchingNode.nodeId, parentNodes: newParents };
  };

  useEffect(() => {
    const segments = pathname.split("/").filter((seg) => seg);

    if (segments.length > 0) {
      const { selectedNode, parentNodes } = findNodeAndParents(data, segments);
      setExpandedNodes(parentNodes);
      if (selectedNode) {
        setSelectedNodes([selectedNode]);
      } else {
        setSelectedNodes([parentNodes[parentNodes.length - 1]]);
      }
    }
  }, [pathname]);

  const handleSignOut = async () => {
    const response = await dispatch(logoutUser()).unwrap();
    if (response.data) {
      handleClearStorage();
      dispatch(resetOrganization());
      persistor.purge();
      router.push("/signin");
    }
  };

  const routeMap: Record<string, string> = {
    CRM: "/dashboard",
    Customers: "/customers",
    Contacts: "/contact",
    Leads: "/lead",
    Estimates: "/sales/estimates",
    "Request estimates": "/sales/request-estimates",
    "Perform Invoice": "/sales/perform-invoice",
    Tasks: "/task",
    "Project Listing": "/project-management/listing",
    "Project Tracking": "/project-management/tracking",
    "View Organizations": "/organization/listing",
    Branches: "/organization/branch",
    "Add Organization": "/organization/organizationprofile-add-edit",
    Users: "/organization/user",
    Companies: "/company",
    Ticket: "/support/ticket",
    Report: "/report",
    "Sign Out": "/signin",
  };

  const onNodeClick = (args: any) => {
    if (!args.node) {
      return;
    }

    const nodeText = args.node.innerText;

    if (nodeText === "Sign Out") {
      handleSignOut();
    } else if (routeMap[nodeText]) {
      if (nodeText === "Add Organization") {
        dispatch(saveOrganizationSetup(null));
        dispatch(saveCompanyDetails(null));
        dispatch(saveTaxationDetails(null));
      }
      router.push(routeMap[nodeText]);
    }
  };

  const data = [
    {
      nodeId: "01",
      nodeText: "CRM",
      iconCss: "e-icons e-home",
      cssClass: pathname === "/dashboard" ? "e-active" : "",
      key: "dashboard",
    },
    // {
    //   nodeId: "02",
    //   nodeText: "Customers",
    //   iconCss: "e-icons e-people",
    //   nodeChild: [],
    // },
    {
      nodeId: "03",
      nodeText: "Leads",
      // iconCss: "e-icons e-user",
      iconCss: "e-icons e-people",
      key: "lead",
      // nodeChild: [
      //   {
      //     nodeId: "03-01",
      //     nodeText: "View Leads",
      //     key: "lead",
      //     // iconCss: "e-icons e-eye"
      //   },
      // ],
    },
    // {
    //   nodeId: "04",
    //   nodeText: "Sales",
    //   iconCss: "e-icons e-people",
    //   nodeChild: [
    //     { nodeId: "04-01", nodeText: "Estimates" },
    //     {
    //       nodeId: "04-02",
    //       nodeText: "Request estimates",
    //     },
    //     {
    //       nodeId: "04-03",
    //       nodeText: "Performa Invoice",
    //     },
    //   ],
    // },
    {
      nodeId: "05",
      nodeText: "Tasks",
      iconCss: "e-icons e-print-layout",
      nodeChild: [],
      key: "task",
    },
    // {
    //   nodeId: "06",
    //   nodeText: "Project Management",
    //   iconCss: "e-icons e-folder-open",
    //   nodeChild: [
    //     {
    //       nodeId: "06-01",
    //       nodeText: "Project Listing",
    //     },
    //     {
    //       nodeId: "06-02",
    //       nodeText: "Project Tracking",
    //     },
    //   ],
    // },
    {
      nodeId: "07",
      nodeText: "Organizations",
      iconCss: "e-icons e-change-chart-type",
      key: "organization",
      nodeChild: [
        {
          nodeId: "07-01",
          nodeText: "View Organizations",
          key: "listing",
          // iconCss: "e-icons e-eye"
        },
        {
          nodeId: "07-02",
          nodeText: "Add Organization",
          key: "organizationprofile-add-edit",
          // iconCss: "e-icons sf-icon-form",
        },
        {
          nodeId: "07-03",
          nodeText: "Branches",
          key: "branch",
          // iconCss: "e-icons e-home"
        },
        {
          nodeId: "07-04",
          nodeText: "Users",
          key: "user",
          // iconCss: "e-icons e-people",
        },
      ],
    },
    {
      nodeId: "08",
      nodeText: "Contacts",
      iconCss: "e-icons e-user",
      key: "contact",
    },
    {
      nodeId: "09",
      nodeText: "Companies",
      iconCss: "e-icons e-grip-vertical",
      nodeChild: [],
      key: "company",
    },
    // {
    //   nodeId: "10",
    //   nodeText: "Support",
    //   iconCss: "e-icons e-people",
    //   nodeChild: [{ nodeId: "10-01", nodeText: "Ticket" }],
    // },
    // {
    //   nodeId: "11",
    //   nodeText: "Report",
    //   iconCss: "e-icons e-page-setup",
    //   nodeChild: [],
    // },
    {
      nodeId: "12",
      nodeText: "Sign Out",
      iconCss: "e-icons e-import",
      nodeChild: [],
      key: "sign-out",
    },
  ];

  const width = "250px";
  const target = ".main-sidebar-content";
  const mediaQuery = "(min-width: 600px)";
  // const pathname = usePathname(); // Get current route
  // console.log("pathname :>> ", pathname);

  const fields = {
    dataSource: data,
    id: "nodeId",
    text: "nodeText",
    child: "nodeChild",
    iconCss: "iconCss",
    cssClass: "cssClass", // Pass the active class
  };

  const toolbarClicked = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents bubbling to other elements
    if (sidebarobj.current) {
      sidebarobj.current.toggle();
    } else {
      console.warn("Sidebar component is not yet mounted.");
    }
  };

  return (
    <div className="control-section" id="responsive-wrapper">
      <div id="reswrapper">
        {/* Header Section */}
        <div className="nav_flex_div">
          <div className="nav_logo_div">
            <Image
              className="header_logo img-fluid"
              src={HeaderLogo}
              alt="Logo"
            />
            <ToolbarComponent
              id="resToolbar"
              className="toggle_icon_div"
              onClick={(event) => toolbarClicked(event)}
            >
              <ItemsDirective>
                <ItemDirective prefixIcon="e-icons e-menu" tooltipText="Menu" />
              </ItemsDirective>
            </ToolbarComponent>
          </div>
          <Header />
        </div>

        {/* Sidebar */}
        <SidebarComponent
          id="sideTree"
          className="sidebar-treeview"
          ref={sidebarobj}
          width={width}
          target={target}
          mediaQuery={mediaQuery}
          isOpen={false} // Ensure it's controlled manually
          enableGestures={false} // Disable swipe gestures
        >
          <div className="res-main-menu">
            <div className="sidebar_main_div">
              <TreeViewComponent
                id="mainTree"
                cssClass="main-treeview"
                fields={fields as any}
                expandOn="Click"
                nodeClicked={onNodeClick}
                selectedNodes={selectedNodes}
                expandedNodes={expandedNodes}
              />
            </div>
            <div className="standard_pro_main_div">
              <div className="standard_pro_bg">
                <Image className="img-fluid" src={FavIcon} alt="Icon" />
                <h6>Standard Pro</h6>
                <p>Get access to all features on tetumbas</p>

                <CommonProgressButton content="Get Pro" />
              </div>
            </div>
          </div>
        </SidebarComponent>

        {/* Main Content */}
        <div className="main-sidebar-content" id="main-text">
          <div className="sidebar-content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStructure;
