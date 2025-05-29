"use client";

import React, { useState } from "react";
import {
  TimelineComponent,
  ItemDirective,
  ItemsDirective,
} from "@syncfusion/ej2-react-layouts";

const timelineData = [
  {
    icon: "J",
    titleheader: "Lead Created",
    date: "Feb 01 at 3:20pm",
    title: "Lead John Doe added to the CRM.",
    description:
      "Initial inquiry received via website form. Needs follow-up within 24 hours.",
  },
  {
    icon: "P",
    titleheader: "First Contact Attempted",
    date: "Feb 03 at 2:28pm",
    title: "Priya attempted to call John but got no response.",
    description: "Left a voicemail and sent an introductory email.",
  },
  {
    icon: "J",
    titleheader: "Email Opened",
    date: "Feb 03 at 4:00pm",
    title: "John opened the introductory email.",
    description: "Tracking shows email opened. No reply yet.",
  },
  {
    icon: "P",
    titleheader: "Call Connected & Discovery Call Scheduled",
    date: "Feb 07 at 5:28pm",
    title: "Priya successfully connected with John.",
    description:
      "John is interested but needs more details. Discovery call scheduled for 2025-02-06 at 3:00 PM.",
  },
  {
    icon: "P",
    titleheader: "Follow-Up Email Sent",
    date: "Feb 10 at 1:30pm",
    title: "Priya sent a follow-up email with pricing and case studies.",
    description: "John asked for a proposal. Preparing a quote.",
  },
  {
    icon: "P",
    titleheader: " Proposal Sent",
    date: "Feb 12 at 2:28pm",
    title: "Priya sent a proposal with detailed pricing and features.",
    description: "John reviewing the proposal. Follow-up in 2 days.",
  },
  {
    icon: "J",
    titleheader: "Follow-Up Call & Negotiation",
    date: "Feb 13 at 3:30pm",
    title: "John responded to the proposal, requested a discount.",
    description: "John asked for a proposal. Preparing a quote.",
  },
  {
    icon: "J",
    titleheader: "Deal Closed (Won)",
    date: "Feb 15 at 5:30pm",
    title: "John accepted the proposal and signed the contract.",
    description: "Lead converted to a customer. Handover to onboarding team.",
  },
];

const Timeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(
    timelineData.length - 1
  ); // Default active is the latest event

  return (
    <div className="timeline-container">
      <TimelineComponent>
        <ItemsDirective>
          {timelineData.map((item, index) => (
            <ItemDirective
              key={index}
              dotCss="state-progress"
              cssClass="intermediate"
              content={() => (
                <div
                  className={`timeline-item ${index === activeIndex ? "active" : ""}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="timeline_card_header">
                    <div className="timeline_card_info">
                      <div
                        className={`timeline-icon ${index === activeIndex ? "active-icon" : ""}`}
                      >
                        {item.icon}
                      </div>
                      <div className="timeline_top_title">
                        {" "}
                        {item.titleheader}{" "}
                      </div>
                    </div>
                    <div>
                      <span className="timeline-date">{item.date}</span>
                    </div>
                  </div>
                  <div className="w-100">
                    <div className="timeline-content">
                      <div>
                        <h4 className="timeline_first_description">
                          {item.title}
                        </h4>
                        <p className="timeline_last_description">
                          Follow-up Notes:
                          <span> {item.description} </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            />
          ))}
        </ItemsDirective>
      </TimelineComponent>
    </div>
  );
};

export default Timeline;
