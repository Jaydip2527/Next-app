import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  getNameInitials,
  getRandomColor,
  getTransparentLightBackground,
  priorityColors,
} from "./common";

export const renderPhone = (phone: any) => {
  if (!phone) {
    return <div>--</div>;
  }

  return (
    <div>
      {phone ? (
        <a
          href={`tel:${phone}`}
          style={{ color: "#007bff", textDecoration: "none" }}
        >
          {phone}
        </a>
      ) : (
        "--"
      )}
    </div>
  );
};

export const renderEmail = (email: any) => {
  if (!email) {
    return <div>--</div>;
  }

  return (
    <div>
      {email ? (
        <a
          href={`mailto:${email}`}
          style={{ color: "#007bff", textDecoration: "none" }}
        >
          {email}
        </a>
      ) : (
        "--"
      )}
    </div>
  );
};

export const renderWebsite = (website: any) => {
  if (!website) {
    return <div>--</div>;
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {website ? (
        <a
          href={website.startsWith("http") ? website : `https://${website}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#007bff", textDecoration: "none" }}
        >
          {website}
        </a>
      ) : (
        "--"
      )}
    </div>
  );
};

export const renderStatus = (status: any | undefined) => {
  if (!status?.name) {
    return <div>--</div>;
  }

  return (
    <span
      style={{
        display: "inline-block",
        padding: "5px 10px",
        borderRadius: "12px",
        // background: "#e0e0e0", // Light background from status color
        color: "#fff",
        fontWeight: "bold",
        fontSize: 12,
        border: "1px solid #0000001f",
      }}
    >
      {status?.icon ? status?.icon : ""}{" "}
      <span style={{ color: status?.color || "#fff" }}>{status?.name}</span>
    </span>
  );
};

export const renderAssignedUsers = (assignedTo: any[] | undefined) => {
  if (!assignedTo || assignedTo.length === 0) {
    return <div>--</div>;
  }

  return assignedTo.map((item, index) => {
    const fullName = `${item.first_name} ${item.last_name}`;
    return (
      <TooltipComponent content={fullName} key={index}>
        <div className="avatar-block me-3">
          <div
            className="e-avatar e-avatar-small e-avatar-circle"
            style={{ backgroundColor: getRandomColor(), color: "#fff" }}
          >
            {getNameInitials(fullName)}
          </div>
        </div>
      </TooltipComponent>
    );
  });
};

export const renderTags = (tags: any[] | undefined) => {
  if (!tags || tags.length === 0) {
    return <div>--</div>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
      {tags?.map((tag, index) => (
        <span
          key={index}
          style={{
            background: tag?.color || "#f0f0f0",
            color: "#fff",
            borderRadius: "8px",
            padding: "2px 8px",
            fontSize: "12px",
          }}
        >
          {tag?.name || "Test"}
        </span>
      ))}
    </div>
  );
};

export const renderCompanyNameTemplate = (company: any) => {
  if (!company?.company_name) {
    return <div>--</div>;
  }

  return (
    <span
      style={{
        display: "inline-block",
        padding: "5px 10px",
        borderRadius: "12px",
        background: getTransparentLightBackground("#133e87"),
        color: "#133e87",
        fontWeight: "bold",
      }}
    >
      {company?.company_name}
    </span>
  );
};

export const renderPriority = (priority: string | undefined) => {
  if (!priority) {
    return <div>--</div>;
  }

  const selectedPriority = priorityColors.find((p) => p.value === priority);
  if (!selectedPriority) {
    return <div>--</div>;
  }

  return (
    <span
      style={{
        display: "inline-block",
        padding: "5px 10px",
        borderRadius: "12px",
        // background: selectedPriority?.color || "#ccc", // Use priority color, fallback to grey
        color: "#fff",
        fontWeight: "bold",
        fontSize: 12,
        border: "1px solid #0000001f",
      }}
    >
      <Icon
        icon={selectedPriority?.icon || "--"}
        width="16"
        height="16"
        color={selectedPriority?.color}
        className="me-2"
      />
      <span style={{ color: selectedPriority?.color }}>
        {selectedPriority?.label || "--"}
      </span>
    </span>
  );
};

export const statusItemTemplate = (data: any) => {
  return (
    <span>
      {data?.icon ? data?.icon : ""} {data?.name}
    </span>
  );
};

export const statusValueTemplate = (data: any) => {
  return (
    <span>
      {data?.icon ? data?.icon : ""} {data?.name || ""}
    </span>
  );
};

export const priorityItemTemplate = (data: any) => {
  return (
    <span>
      <Icon
        icon={data?.icon}
        width="16"
        height="16"
        color={data?.color}
        className="me-2"
      />
      {data?.label}
    </span>
  );
};

export const priorityValueTemplate = (data: any) => {
  return (
    <span>
      <Icon
        icon={data?.icon}
        width="16"
        height="16"
        color={data?.color}
        className="me-2"
      />
      {data?.label}
    </span>
  );
};
