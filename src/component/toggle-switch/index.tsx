"use client";

import React, { useEffect } from "react";
import { SwitchComponent } from "@syncfusion/ej2-react-buttons";
import { rippleMouseHandler } from "@syncfusion/ej2-buttons";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
  useEffect(() => {
    const rippleHandler = (e: MouseEvent) => {
      const rippleSpan = document.querySelector(
        ".e-ripple-container"
      ) as HTMLElement | null;
      if (rippleSpan) {
        rippleMouseHandler(e, rippleSpan);
      }
    };

    const elemArray = document.querySelectorAll<HTMLLabelElement>(
      ".switch-control label"
    );
    elemArray.forEach((elem) => {
      elem.addEventListener("mouseup", rippleHandler);
      elem.addEventListener("mousedown", rippleHandler);
    });

    return () => {
      elemArray.forEach((elem) => {
        elem.removeEventListener("mouseup", rippleHandler);
        elem.removeEventListener("mousedown", rippleHandler);
      });
    };
  }, []);

  return (
    <div className="switch_main_div">
      <SwitchComponent
        id="checked"
        checked={checked}
        change={(e) => onChange(e.checked)}
      />
    </div>
  );
};

export default Switch;
