"use client";
import { AppBarComponent } from "@syncfusion/ej2-react-navigations";

const Footer = () => (
  <AppBarComponent
    colorMode="Primary"
    style={{ width: "100%", marginLeft: 10 }}
  >
    <span className="regular"></span>
    <span className="regular">Footer conent</span>
    <div className="e-appbar-spacer"></div>
  </AppBarComponent>
);

export default Footer;
