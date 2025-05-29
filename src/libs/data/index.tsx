interface Node {
  nodeId: string;
  nodeText: string;
  iconCss: string;
  nodeChild?: Node[];
}

export const leftSideData: Node[] = [
  {
    nodeId: "01",
    nodeText: "Dashboard",
    iconCss: "icon-thumbs-up-alt icon",
  },
  {
    nodeId: "02",
    nodeText: "SyncFusion components",
    iconCss: "icon-microchip icon",
    nodeChild: [
      {
        nodeId: "05-01",
        nodeText: "Calendar",
        iconCss: "icon-circle-thin icon",
      },
      {
        nodeId: "05-02",
        nodeText: "DatePicker",
        iconCss: "icon-circle-thin icon",
      },
      {
        nodeId: "05-03",
        nodeText: "DateTimePicker",
        iconCss: "icon-circle-thin icon",
      },
      {
        nodeId: "05-04",
        nodeText: "DateRangePicker",
        iconCss: "icon-circle-thin icon",
      },
      {
        nodeId: "05-05",
        nodeText: "TimePicker",
        iconCss: "icon-circle-thin icon",
      },
      {
        nodeId: "05-06",
        nodeText: "SideBar",
        iconCss: "icon-circle-thin icon",
      },
    ],
  },
  {
    nodeId: "03",
    nodeText: "Ledger Account",
    iconCss: "icon-docs icon",
    nodeChild: [
      {
        nodeId: "03-01",
        nodeText: "Customer",
        iconCss: "icon-circle-thin icon",
      },
      {
        nodeId: "03-02",
        nodeText: "Vendors",
        iconCss: "icon-circle-thin icon",
      },
      {
        nodeId: "03-03",
        nodeText: "Other",
        iconCss: "icon-circle-thin icon",
      },
    ],
  },
  {
    nodeId: "04",
    nodeText: "Banking",
    iconCss: "icon-th icon",
  },
  {
    nodeId: "05",
    nodeText: "Sales",
    iconCss: "icon-code icon",
    nodeChild: [
      {
        nodeId: "05-01",
        nodeText: "Lead",
        iconCss: "icon-circle-thin icon",
      },
      {
        nodeId: "05-02",
        nodeText: "Estimates",
        iconCss: "icon-circle-thin icon",
      },
      {
        nodeId: "05-03",
        nodeText: "Sales Order",
        iconCss: "icon-circle-thin icon",
      },
      {
        nodeId: "05-04",
        nodeText: "Delivery Challans",
        iconCss: "icon-circle-thin icon",
      },
      {
        nodeId: "05-05",
        nodeText: "Performa Invoice",
        iconCss: "icon-circle-thin icon",
      },
      {
        nodeId: "05-06",
        nodeText: "Invoice",
        iconCss: "icon-circle-thin icon",
      },
      {
        nodeId: "05-07",
        nodeText: "Recurring Invoice",
        iconCss: "icon-circle-thin icon",
      },
      {
        nodeId: "05-08",
        nodeText: "Credit Note",
        iconCss: "icon-circle-thin icon",
      },
      {
        nodeId: "05-09",
        nodeText: "Debit Note",
        iconCss: "icon-circle-thin icon",
      },
    ],
  },
  {
    nodeId: "06",
    nodeText: "Purchases",
    iconCss: "icon-chrome icon",
    nodeChild: [
      {
        nodeId: "06-01",
        nodeText: "Purchase Orders",
        iconCss: "icon-circle-thin icon",
      },
      {
        nodeId: "06-02",
        nodeText: "Purchase Orders",
        iconCss: "icon-circle-thin icon",
      },
      {
        nodeId: "06-03",
        nodeText: "Bills",
        iconCss: "icon-circle-thin icon",
      },
      {
        nodeId: "06-04",
        nodeText: "Expenses",
        iconCss: "icon-circle-thin icon",
      },
      {
        nodeId: "06-05",
        nodeText: "Recurring Expenses",
        iconCss: "icon-circle-thin icon",
      },
      {
        nodeId: "06-06",
        nodeText: "Credit Note",
        iconCss: "icon-circle-thin icon",
      },
      {
        nodeId: "06-07",
        nodeText: "Debit note",
        iconCss: "icon-circle-thin icon",
      },
      {
        nodeId: "06-08",
        nodeText: "Logout",
        iconCss: "icon-circle-thin icon",
      },
    ],
  },
];

