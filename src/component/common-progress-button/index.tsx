import React from "react";
import { ProgressButtonComponent } from "@syncfusion/ej2-react-splitbuttons";
import type {
  SpinSettingsModel,
  AnimationSettingsModel,
} from "@syncfusion/ej2-splitbuttons";

interface ProgressButtonProps {
  content?: string;
  enableProgress?: boolean;
  duration?: number;
  spinSettings?: SpinSettingsModel;
  animationSettings?: AnimationSettingsModel;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
  ref?: React.RefObject<ProgressButtonComponent>;
}

const CommonProgressButton: React.FC<ProgressButtonProps> = ({
  content = "Submit",
  className = "common_btn",
  onClick = () => {},
  loading = false,
  disabled = false,
  type = "submit",
  style = {},
  ref,
}) => {
  return (
    <ProgressButtonComponent
      cssClass={`${loading ? "common_btn_diabled" : className} e-hide-spinner`}
      ref={ref}
      type={type}
      enableProgress={loading}
      disabled={disabled || loading}
      onClick={onClick}
      style={style}
    >
      {loading ? "Loading..." : content}
    </ProgressButtonComponent>
  );
};

export default CommonProgressButton;
