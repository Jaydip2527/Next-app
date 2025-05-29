"use client";

import * as React from "react";
import Link from "next/link";
import { useState } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { addClass } from "@syncfusion/ej2-base";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";
import { Icon } from "@iconify/react";
import "../../../app/kanban.scss";
import dataSource from "../../../app/dataSource.json";
import { Col, Row } from "react-bootstrap";

/**
 * Kanban Overview sample
 */
const Leadkanban = () => {
  const [position] = useState("TopCenter");

  const fields = [
    { text: "ID", key: "Title", type: "TextBox" },
    { key: "Status", type: "DropDown" },
    { key: "Assignee", type: "DropDown" },
    { key: "RankId", type: "TextBox" },
    { key: "Summary", type: "TextArea" },
  ];
  const cardRendered = (args) => {
    let val = args.data.Priority;
    addClass([args.element], val);
  };
  const columnTemplate = (props) => {
    return (
      <div className="header-template-wrap">
        <div className={"header-icon e-icons " + props.keyField}></div>
        <div className="kanban_top_headertext">{props.headerText}</div>
      </div>
    );
  };
  const cardTemplate = (props) => {
    return (
      <div className={"kanbancard_template"}>
        <div className="kanban_card_header">
          <div className="e-card-header-caption">
            <div className="kanban_card_header_title kanban_tooltip_text">
              {props.Title}
            </div>
          </div>
        </div>
        <div className="kanban_card_content kanban_tooltip_text">
          <div className="kanban_info_text">{props.Summary}</div>
        </div>
        <div className="kanbancard_card_footer">
          <div className="kanban_btn_footer_sec">
            {props.Tags.split(",").map((tag: string) => (
              <div
                className="kanban_card_tag_field kanban_tooltip_text"
                key={tag}
              >
                {tag}
              </div>
            ))}
          </div>
          <div className="kanban_card_avatar">{getString(props.Assignee)}</div>
        </div>
      </div>
    );
  };
  const getString = (assignee: string | null) => {
    if (!assignee) {
      return ""; // or handle the null case as needed
    }
    const matches = assignee.match(/\b(\w)/g);
    return matches ? matches.join("").toUpperCase() : ""; // Handle null case
  };

  return (
    <>
      <div className="kanban_main_actionbar">
        <Row>
          <div className="kanban_action_dataset">
            <Col md={3}>
              <div className="kanban_search_sec">
                <div className="e-input-group">
                  <input
                    className="e-input"
                    type="text"
                    placeholder="Search Leads"
                  />
                  <span className="e-input-group-icon e-date-icon"></span>
                </div>
              </div>
            </Col>
            <div className="icon_box_flex_box kanban_action_bar_icon">
              <TooltipComponent
                content="Switch To List View"
                position={position}
                tabIndex={0}
              >
                {/* Button element */}
                <Link href="/lead" className="icon_box_div">
                  <Icon tabIndex={-1} icon="la:list" width="20" height="20" />
                </Link>
              </TooltipComponent>
              <div className="icon_box_div">
                <Icon icon="uiw:file-pdf" width="20" height="20" />
              </div>
              <button className="common_small_btn_icon">
                <Icon icon="carbon:add-filled" width="16" height="16" /> Add
                lead <Icon icon="" width="16" height="16" />
              </button>
            </div>
          </div>
        </Row>
      </div>

      <div className="kanban_sortby_sec">
        <div className="kanban_sortby_subinfo">
          <p className="kanban_sortby_text">
            {" "}
            Sort By: <span className="kanban_sort_data"> Date Created </span>
          </p>
          <p className="kanban_sortby_line_div"> </p>
          <p className="kanban_sort_data"> Kanban Order </p>
          <p className="kanban_sortby_line_div"> </p>
          <p className="kanban_sort_data"> Last Contact </p>
        </div>
        <div className="sortby_setting_icon">
          <Link href="/lead/status" style={{ color: "#133e87" }}>
            <Icon icon="uil:setting" width="15" height="15" />
          </Link>
        </div>
      </div>

      <div className="schedule-control-section">
        <div className="control-section">
          <div className="control-wrapper kanban_column_sec_main">
            <KanbanComponent
              id="kanban"
              cssClass="kanban-overview"
              keyField="Status"
              dataSource={dataSource.cardData}
              enableTooltip={true}
              swimlaneSettings={{ keyField: "Assignee" }}
              cardSettings={{
                headerField: "Title",
                template: cardTemplate.bind(this),
                selectionType: "Multiple",
              }}
              dialogSettings={{ fields: fields }}
              cardRendered={cardRendered.bind(this)}
            >
              <ColumnsDirective>
                <ColumnDirective
                  headerText="To Do"
                  keyField="Open"
                  allowToggle={true}
                  template={columnTemplate.bind(this)}
                />
                <ColumnDirective
                  headerText="In Progress"
                  keyField="InProgress"
                  allowToggle={true}
                  template={columnTemplate.bind(this)}
                />
                <ColumnDirective
                  headerText="In Review"
                  keyField="Review"
                  allowToggle={true}
                  template={columnTemplate.bind(this)}
                />
                <ColumnDirective
                  headerText="Done"
                  keyField="Close"
                  allowToggle={true}
                  template={columnTemplate.bind(this)}
                />
              </ColumnsDirective>
            </KanbanComponent>
          </div>
        </div>
      </div>
    </>
  );
};

export default Leadkanban;
