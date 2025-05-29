import React from "react";
import TimeLine from "../../timeline";
import Switch from "../../toggle-switch";

const ActivityLog = ({ sortOrder }: { sortOrder: "ASC" | "DESC" }) => {
  console.log("sortOrder :>> ", sortOrder);
  return (
    <div>
      <div className="show_history_sec">
        <p className="show_history_text"> Show All History </p>
        <Switch
          checked={false}
          onChange={function (_checked: boolean): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>

      <div className="common_card_main_div">
        <TimeLine />
      </div>
    </div>
  );
};

export default ActivityLog;
