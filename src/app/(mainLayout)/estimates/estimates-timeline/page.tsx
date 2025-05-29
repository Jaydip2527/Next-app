import React from "react";
import Timeline from "@/@/component/timeline";
import Switch from "@/@/component/toggle-switch";

const EstimatesTimeline = () => {
  return (
    <>
      <div className="estimates_timeline_sec">
        <p className="estimates_timeline_history_text"> show all history </p>
        <Switch />
      </div>

      <div className="common_card_main_div">
        <Timeline />
      </div>
    </>
  );
};

export default EstimatesTimeline;
