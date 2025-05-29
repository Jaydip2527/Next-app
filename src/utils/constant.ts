import { generateLeadId } from "./common";

export const ORGANIZATION_PAGE_TITLE = {
  ORGANIZATION: "Organizations",
  ADD: "Add Organization",
  ORGANIZATION_BRANCH: "Organization Branch",
  ORGANIZATION_PROFILE: "Organization Profile",
};

export const LEAD_TITLE = {
  LEAD: "Lead",
  LEAD_PROFILE: "Lead Profile",
  LEAD_STATUS: "Lead Status",
  LEAD_KANBAN: "Lead Kanban",
  LEAD_TASK: "Lead Task",
  LEAD_ESTIMATE: "Lead Estimate",
  LEAD_FOLLOW_UP: "Lead Follow Up",
  LEAD_ATTACHMENT: "Lead Attachment",
  LEAD_ACTIVITY: "Lead Activity",
  LEAD_ADD: "Add Lead",
  LEAD_EDIT: "Edit Lead",
};

export const SOURCE_TYPE = {
  LEAD: "lead",
  CONTACT: "contact",
  TASK: "task",
};

export const leadDefaultValues = {
  is_individual_lead: true,
  first_name: null,
  last_name: null,
  email: null,
  phone_number: null,
  budget: null,
  gst_number: null,
  position: null,
  company_name: null,
  website: null,
  // industry_id: "",
  // industry: "",
  lead_source: null,
  sr_number: generateLeadId() || "",
  is_converted: true,
  status_id: null,
  priority: null,
  create_date: new Date().toISOString(),
  lead_receive_date: "",
  last_contact_date: "",
  follow_up_date: null,
  details: "",
  address_line_1: null,
  // address_line_2: "",
  landmark: null,
  state_id: null,
  city_id: null,
  pincode: null,
  country_id: null,
  address_type: "Billing",
  tag_ids: [],
  company_id: null,
  address_id: null,
  contact_id: null,
  assigned_to: [],
  is_for_user: true,
};

export const LEAD_REMINDER = {
  LEAD_SOURCE_TYPE: "lead",
  LEAD_MODULE: "Lead",
};

export const ReminderMode = {
  EMAIL: "email",
  SMS: "sms",
  CALL: "call",
  TASK: "task",
};

export const Frequency = {
  DAY: "day",
  WEEK: "week",
  MONTH: "month",
  YEAR: "year",
};

export const leadSources = [
  { label: "Facebook", value: "facebook" },
  { label: "Instagram", value: "instagram" },
  { label: "Twitter (X)", value: "twitter" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "YouTube", value: "youtube" },
];

export const assigneeList = [
  { value: "b60e8400-e29b-41d4-a716-446655440005", text: "John Doe" },
  { value: "b60e8400-e29b-41d4-a716-446655440006", text: "Jane Smith" },
  { value: "b60e8400-e29b-41d4-a716-446655440007", text: "Bob Johnson" },
  { value: "b60e8400-e29b-41d4-a716-446655440008", text: "Alice Brown" },
  { value: "b60e8400-e29b-41d4-a716-446655440009", text: "Emily Davis" },
];

export const priorityOptions: any = [
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

export const departmentOptions = [
  { label: "Marketing", value: "marketing" },
  { label: "Sales", value: "sales" },
  { label: "Human Resources", value: "hr" },
  { label: "Development", value: "development" },
  { label: "Customer Support", value: "support" },
];

export const categoryOptions = [
  { label: "Feature", value: "feature" },
  { label: "Bug", value: "bug" },
  { label: "Improvement", value: "improvement" },
  { label: "Research", value: "research" },
  { label: "Testing", value: "testing" },
];

export const statusOptions = [
  { label: "Open", value: "open" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "On Hold", value: "on_hold" },
  { label: "Cancelled", value: "cancelled" },
];

export const ORDER_BY: any = {
  descending: "DESC",
  ascending: "ASC",
};

export const designationOptions = [
  { label: "Manager", value: "Manager" },
  { label: "Team Lead", value: "Team Lead" },
  {
    label: "Software Engineer",
    value: "Software Engineer",
  },
  { label: "QA Engineer", value: "QA Engineer" },
  { label: "Product Owner", value: "Product Owner" },
];

export const ENUMS = {
  BILLING: "Billing",
};

export const cookiesOptions = {
  path: "/",
  secure: false, // Only send over HTTPS
  sameSite: "Strict",
  expires: 1, // 1 day expiry
};

// export const cookiesOptions = {
//   path: "/",
//   secure: window.location.protocol === "https:", // Secure only on HTTPS
//   sameSite: "None", // Allow cross-origin cookies
//   expires: 1, // 1-day expiry
// };
