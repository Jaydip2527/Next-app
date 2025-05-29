"use client";

import React from "react";
import { SwitchComponent } from "@syncfusion/ej2-react-buttons";
import { rippleMouseHandler } from "@syncfusion/ej2-buttons";

const DataSwitch = ({ checked, onChange = () => {} }: any) => {
  const rippleHandler = (e: any) => {
    const rippleSpan = document.querySelector(".e-ripple-container");
    if (rippleSpan) {
      rippleMouseHandler(e, rippleSpan);
    }
  };
  const elemArray = document.querySelectorAll(".switch-control label");
  for (let i = 0, len = elemArray.length; i < len; i++) {
    elemArray[i].addEventListener("mouseup", rippleHandler);
    elemArray[i].addEventListener("mousedown", rippleHandler);
  }

  return (
    <>
      <div className="switch_main_div">
        <label htmlFor="checked" className="switch_text">
          {" "}
          Yes{" "}
        </label>
        <SwitchComponent
          id="checked"
          checked={checked}
          change={(e) => onChange(e.checked)}
        ></SwitchComponent>
      </div>
    </>
  );
};

export default DataSwitch;
