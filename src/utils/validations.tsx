import * as yup from "yup";

export const emailRgx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z0-9\-]+\.)+[a-z]{2,}))$/;
export const emailvalidMessage = "Please enter the valid email";

export const websiteRgx =
  /^(https?:\/\/|ftp:\/\/|www\.)[a-zA-Z0-9-._~:/?#\[\]@!$&'()*+,;=%]+$/;

export const gstRgx =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

export const signupSchema = yup.object().shape({
  first_name: yup
    .string()
    .required("First Name is required")
    .min(2, "First Name must be at least 2 characters long")
    .max(50, "First Name cannot be more than 50 characters")
    .matches(/^[A-Za-z\s]+$/, "First Name can only contain letters"),

  last_name: yup
    .string()
    .required("Last Name is required")
    .min(2, "Last Name must be at least 2 characters long")
    .max(50, "Last Name cannot be more than 50 characters")
    .matches(/^[A-Za-z\s]+$/, "Last Name can only contain letters"),
  email: yup
    .string()
    .required("Email Address is required")
    .matches(emailRgx, emailvalidMessage)
    .max(64)
    .trim(),
  contact_no: yup
    .string()
    .required("Phone Number is required")
    .matches(/^[0-9]+$/, "Phone must be a number")
    .matches(/^\d{10}$/, "Phone Number must be 10 digits"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,
      "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character."
    ),

  confirm_password: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the Terms and Privacy Policy"),
});

export const loginSchema = yup.object().shape({
  loginId: yup
    .string()
    .required("Email / Phone Number is required")
    .test("loginId", "Invalid email or phone number", (value) => {
      if (!value) {
        return false;
      }
      const isPhone = /^[0-9]{10}$/.test(value);
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      return isPhone || isEmail;
    }),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,
      "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character."
    ),
  rememberMe: yup.boolean(),
});

export const forgotPasswordSchema = yup.object().shape({
  loginId: yup
    .string()
    .required("Email address or phone number is required")
    .test("loginId", "Invalid email address or phone number", (value) => {
      if (!value) {
        return false;
      }
      const isPhone = /^[0-9]{10}$/.test(value);
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      return isPhone || isEmail;
    }),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,
      "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character."
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const otpValidationSchema = yup.object().shape({
  mobileOtp: yup
    .string()
    .required("Mobile OTP is required")
    .length(6, "OTP must be exactly 6 digits")
    .matches(/^\d{6}$/, "OTP must be numeric"),
  emailOtp: yup
    .string()
    .required("Email OTP is required")
    .length(6, "OTP must be exactly 6 digits")
    .matches(/^[a-zA-Z0-9]+$/, "OTP must be alphanumeric"),
});

export const organizationValidationSchema = yup.object().shape({
  organizationType: yup.string().required("Organization Type is required"),
  industryType: yup.string().required("Industry is required"),
  country: yup.string().required("Country is required"),
  language: yup.string().required("Language is required"),
});

export const taxationValidationSchema = yup.object().shape({
  panNumber: yup
    .string()
    .required("PAN Number is required")
    .matches(
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      "Invalid PAN format (e.g., ABCDE1234F)"
    ),
  organizationType: yup.string().required("Organization type is required"),
  corpRegisterNumber: yup
    .string()
    .required("Corporate Registration Number is required")
    .matches(
      /^[A-Z0-9]{8,15}$/,
      "Invalid Corporate Registration Number format"
    ),
  tanNumber: yup
    .string()
    .required("TAN Number is required")
    .matches(
      /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/,
      "Invalid TAN format (e.g., ABCD12345E)"
    ),
  // .matches(/^[A-Z]{4}[0-9]{5}[A-Z]{1}$/, "Invalid TAN number"),
  cinNumber: yup
    .string()
    .required("CIN Number is required")
    .matches(/^[A-Z0-9]{21}$/, "Invalid CIN format (21 characters required)"),
  iecCode: yup
    .string()
    .nullable()
    .notRequired()
    // .required("IEC Code is required")
    .matches(/^\d{10}$/, "IEC Code must be exactly 10 digits")
    .transform((value) => (value === "" ? null : value)),
  isGSTRegistered: yup.boolean(),
  msmeNumber: yup.string().when("isGSTRegistered", {
    is: true,
    then: (schema) =>
      schema
        .required("MSME number is required")
        .matches(
          /^UANIN[0-9]{12}$/,
          "Invalid MSME Number format (e.g., UANIN123456789012)"
        ),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const companyDetailsValidationSchema = yup.object().shape({
  isGSTRegistered: yup.boolean(),
  gstId: yup.string().when("isGSTRegistered", {
    is: true,
    then: (schema) =>
      schema
        .required("GST ID is required")
        .matches(
          /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
          "Invalid GST ID format"
        )
        .length(15, "GST ID must be exactly 15 characters"),
    otherwise: (schema) => schema.nullable(),
  }),
  gstType: yup.string().when("isGSTRegistered", {
    is: true,
    then: (schema) => schema.required("GST Type is required"),
  }),
  organizationName: yup
    .string()
    .required("Organization name is required")
    .matches(
      /^[a-zA-Z0-9\s/.@$-_&*\\]+$/,
      "Only alphanumeric, spaces, and /.@$-_&*\\ characters are allowed"
    )
    .min(3, "Organization name must be at least 3 characters")
    .max(50, "Organization name must be at most 50 characters"),
  // alias: yup.string().required("Alias is required"),
  currency: yup.string().required("Currency is required"),
  contactPerson: yup
    .string()
    .required("Contact Person is required")
    .matches(/^[a-zA-Z\s]+$/, "Contact Person can only contain letters"),
  phoneNumber: yup
    // .string()
    // .matches(/^\d{10}$/, "Phone number must be 10 digits")
    // .required("Phone Number is required"),
    .string()
    .required("Phone Number is required")
    .matches(/^[0-9]+$/, "Phone must be a number")
    .matches(/^\d{10}$/, "Phone Number must be 10 digits"),
  houseNo: yup.string().required("House No / Flat / Building Name is required"),
  area: yup.string().required("Area / Sector / Locality is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  pincode: yup
    .string()
    .required("Pincode is required")
    .matches(/^\d+$/, "Pincode must be numbers")
    .matches(/^\d{5,7}$/, "Pincode must be 5-7 digits"),
  email: yup
    .string()
    .required("Email address is required")
    .matches(emailRgx, emailvalidMessage)
    .max(64)
    .trim(),
  website: yup
    .string()
    .required("Website is required")
    .matches(websiteRgx, "Enter a valid URL"),
});

export const bankDetailsSchema = yup.object().shape({
  accountName: yup
    .string()
    .required("Account Name is required")
    .matches(/^[a-zA-Z ]+$/, "Account Name must be alphabetic"),

  accountNumber: yup
    .string()
    .required("Account Number is required")
    .matches(/^\d{9,18}$/, "Account Number must be 9-18 digits"),

  bankName: yup
    .string()
    .required("Bank Name is required")
    .matches(/^[a-zA-Z ]+$/, "Bank Name must be alphabetic"),

  ifscCode: yup
    .string()
    .required("IFSC Code is required")
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code (e.g., HDFC0123456)"),

  swiftCode: yup
    .string()
    .required("SWIFT Code is required")
    .matches(
      /^[A-Z]{4}[A-Z0-9]{2,3}[A-Z0-9]{0,3}$/,
      "Invalid SWIFT Code (e.g., HDFCINBBXXX)"
    ),

  micrCode: yup
    .string()
    .required("MICR Code is required")
    .matches(/^\d{9}$/, "MICR Code must be exactly 9 digits"),

  branch: yup
    .string()
    .required("Branch is required")
    .matches(/^[a-zA-Z ]+$/, "Branch must be alphabetic"),
});

export const organizationBranchSchema = yup.object().shape({
  branch_name: yup
    .string()
    .required("Branch Name is required")
    .min(3, "Branch Name must be at least 3 characters")
    .max(100, "Branch Name can't exceed 100 characters"),

  email: yup
    .string()
    .required("Email address is required")
    .matches(emailRgx, emailvalidMessage)
    .max(64)
    .trim(),

  phone_number: yup
    .string()
    .required("Phone Number is required")
    .matches(/^[0-9]+$/, "Phone must be a number")
    .matches(/^\d{10}$/, "Phone Number must be 10 digits"),

  whatsapp: yup
    .string()
    .nullable()
    .notRequired()
    .matches(/^[0-9]+$/, "WhatsApp must be a number")
    .matches(/^\d{10}$/, "WhatsApp Number must be 10 digits")
    .transform((value) => (value === "" ? null : value)),

  website: yup
    .string()
    .required("Website is required")
    .matches(websiteRgx, "Enter a valid URL"),

  pan_number: yup
    .string()
    .nullable()
    .notRequired()
    .matches(
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      "Invalid PAN format (e.g., ABCDE1234F)"
    )
    .transform((value) => (value === "" ? null : value)),

  msme_number: yup
    .string()
    .nullable()
    .notRequired()
    .matches(
      /^UANIN[0-9]{12}$/,
      "Invalid MSME Number format (e.g., UANIN123456789012)"
    )
    .transform((value) => (value === "" ? null : value)),

  // gst_registration_type: yup
  //   .string()
  //   .required("GST Registration Type is required"),

  gst_id: yup
    .string()
    .nullable()
    .notRequired()
    .required("GST ID is required")
    .matches(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      "Invalid GST ID format"
    )
    .length(15, "GST ID must be exactly 15 characters")
    .transform((value) => (value === "" ? null : value)),

  // country_id: yup.string().required("Country is required"),

  language_id: yup.string().required("Language is required"),

  currency_code_id: yup.string().required("Currency is required"),

  address_details: yup.object().shape({
    addresses: yup
      .array()
      .of(
        yup.object().shape({
          address_line_1: yup
            .string()
            .required("Address Line 1 is required")
            .min(5, "Address Line 1 must be at least 5 characters"),

          landmark: yup
            .string()
            .required("Area / Sector/ Locality is required")
            .min(5, "Area / Sector/ Locality must be at least 5 characters"),

          city: yup.string().required("City is required"),

          state: yup.string().required("State is required"),

          pincode: yup
            .string()
            .required("Pincode is required")
            .matches(/^\d+$/, "Pincode must be numbers")
            .matches(/^\d{5,7}$/, "Pincode must be 5-7 digits"),

          country: yup.string().required("Country is required"),
        })
      )
      .min(1, "At least one address is required")
      .required("Address details are required"),
  }),
});

export const leadValidationSchema = yup.object().shape({
  first_name: yup
    .string()
    .required("First Name is required")
    .min(2, "First Name must be at least 2 characters long")
    .max(50, "First Name cannot be more than 50 characters")
    .matches(/^[A-Za-z\s]+$/, "First Name can only contain letters"),
  // last_name:  last_name: yup
  // .string()
  // .required("Last Name is required")
  // .min(2, "Last Name must be at least 2 characters long")
  // .max(50, "Last Name cannot be more than 50 characters")
  // .matches(/^[A-Za-z\s]+$/, "Last Name can only contain letters"),
  company_name: yup.string().when("is_individual_lead", {
    is: false,
    then: (schema) =>
      schema
        .required("Company name is required")
        .matches(
          /^[a-zA-Z0-9\s/.@$-_&*\\]+$/,
          "Only alphanumeric, spaces, and /.@$-_&*\\ characters are allowed"
        )
        .min(3, "Company name must be at least 3 characters")
        .max(50, "Company name must be at most 50 characters"),
    otherwise: (schema) => schema.notRequired(),
  }),

  gst_number: yup
    .string()
    .nullable()
    .notRequired()
    .matches(gstRgx, "Invalid GST Number format")
    .length(15, "GST Number must be exactly 15 characters")
    .transform((value) => (value === "" ? null : value)),
  website: yup
    .string()
    .nullable()
    .notRequired()
    .matches(websiteRgx, "Enter a valid URL")
    .transform((value) => (value === "" ? null : value)),
  email: yup
    .string()
    .required("Email address is required")
    .matches(emailRgx, emailvalidMessage)
    .max(64)
    .trim(),
  phone_number: yup
    .string()
    .required("Phone Number is required")
    .matches(/^[0-9]+$/, "Phone must be a number")
    .matches(/^\d{10}$/, "Phone Number must be 10 digits"),
  country_id: yup
    .string()
    // .uuid("Invalid country ID format")
    .required("Country is required"),
  state_id: yup
    .string()
    // .uuid("Invalid state ID format")
    .required("State is required"),
  city_id: yup
    .string()
    // .uuid("Invalid city ID format")
    .required("City is required"),
  budget: yup
    .string()
    .nullable()
    .notRequired()
    .matches(/^\d+$/, "Only whole numbers are allowed")
    .transform((value) => (value === "" ? null : value)), // Allows only digits (no decimals)
  // address_name: yup
  //   .string()
  //   .required("Address Name is required")
  //   .min(3, "Address Name must be at least 3 characters"),

  // address_line_1: yup
  //   .string()
  //   .required("Address Line is required")
  //   .min(5, "Address Line must be at least 5 characters"),
});

export const leadReminderValidationSchema = yup.object().shape({
  subject: yup.string().required("Subject is required"),

  reminder_mode: yup
    .array()
    .of(yup.string())
    .required("Reminder Mode is required")
    .min(1, "Reminder Mode is required"),
  start_date: yup
    .date()
    .required("Start Date is required")
    .min(new Date(), "Start Date cannot be in the past"),

  time: yup.string().required("Time is required"),

  frequency: yup.string().when("recurring_reminder", {
    is: true,
    then: (schema) => schema.required("Frequency is required"),
  }),

  end_date: yup.date().when("recurring_reminder", {
    is: true,
    then: (schema) =>
      schema
        .required("End Date is required")
        .min(yup.ref("start_date"), "End Date must be after Start Date"),
  }),

  // reminder_description: yup.string().required("Description is required"),
});

const cleanHTML = (value: string) => {
  // Remove empty tags and whitespace
  const strippedValue = value.replace(/<[^>]+>/g, "").trim();
  return strippedValue.length > 0;
};

export const leadFollowUpValidationSchema = yup.object().shape({
  note_description: yup
    .string()
    .test("note-required", "Note Description is required", (value) =>
      cleanHTML(value || "")
    ),
});

export const leadStatusSchema = yup.object({
  name: yup.string().required("Status Name is required"),
  // icon: yup.string().required("Icon is required"),
  sequence: yup
    .string()
    .required("Order is required")
    .matches(/^\d+$/, "Order must be a valid number"),
  color: yup.string(),
});

export const contactValidationSchema = yup.object().shape({
  first_name: yup
    .string()
    .required("First Name is required")
    .min(2, "First Name must be at least 2 characters long")
    .max(50, "First Name cannot be more than 50 characters")
    .matches(/^[A-Za-z\s]+$/, "First Name can only contain letters"),
  last_name: yup
    .string()
    .required("Last Name is required")
    .trim()
    .min(2, "Last Name must be at least 2 characters long")
    .max(50, "Last Name cannot be more than 50 characters")
    .matches(/^[A-Za-z\s]+$/, "Last Name can only contain letters"),
  company_name: yup
    .string()
    .nullable()
    .trim()
    .notRequired()
    .matches(
      /^[a-zA-Z0-9\s/.@$-_&*\\]+$/,
      "Only alphanumeric, spaces, and /.@$-_&*\\ characters are allowed"
    )
    .min(3, "Company name must be at least 3 characters")
    .max(50, "Company name cannot be more than 50 characters")
    .transform((value) => (value === "" ? null : value)),
  // dob: yup.string().trim().nullable(),
  // dob: yup
  //   .mixed()
  //   .transform((value) =>
  //     value === "" || value === "Invalid Date" ? null : value
  //   ) // Convert empty string to null
  //   .nullable()
  //   .notRequired()
  //   .test("isValidDate", "Date of birth cannot be in the future", (value) => {
  //     if (!value) {
  //       return true;
  //     } // Allow null values (not required)
  //     return new Date(value as string) <= new Date(); // Ensure the date is not in the future
  //   }),
  // .required("Date of birth is required")
  // position: yup.string().trim().nullable(),
  // description: yup.string().nullable(),
  // visibility: yup
  //   .string()
  //   .oneOf(["public", "private"])
  //   .required("Visibility is required"),
  // source: yup.string().trim().nullable(),
  // image: yup.string().url("Invalid image URL").nullable(),
  // currency: yup.string().trim().nullable(),
  // status: yup
  //   .string()
  //   .oneOf(["Active", "Inactive"])
  //   .required("Status is required"),

  email: yup
    .array()
    .of(
      yup.object().shape({
        email: yup
          .string()
          .required("Email address is required")
          .matches(emailRgx, emailvalidMessage)
          .max(64)
          .trim(),
        email_label: yup
          .string()
          .oneOf(["work", "personal", "other"])
          .required(),
        // is_primary_email: yup.boolean().required(),
      })
    )
    .min(1, "At least one email is required"),

  phone_number: yup
    .array()
    .of(
      yup.object().shape({
        phone_number: yup
          .string()
          .required("Phone Number is required")
          .matches(/^[0-9]+$/, "Phone must be a number")
          .matches(/^\d{10}$/, "Phone Number must be 10 digits"),
        phone_label: yup.string().oneOf(["work", "home", "mobile"]).required(),
        // is_primary_phone: yup.boolean().required(),
      })
    )
    .min(1, "At least one phone number is required"),

  // company_id: yup.string().nullable(),
  // company_name: yup.string().nullable(),

  // gst_number: yup
  //   .string()
  //   .nullable()
  //   .notRequired()
  //   .matches(
  //     /^[0-3][0-9][A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/,
  //     "Invalid GST Number format"
  //   )
  //   .length(15, "GST Number must be exactly 15 characters"),

  // address_id: yup.string().nullable(),
  // address_type: yup
  //   .string()
  //   .oneOf(["Billing", "Shipping"])
  //   .required("Address type is required"),
  // address_line_1: yup.string().trim().required("Address line 1 is required"),
  // landmark: yup.string().trim().nullable(),
  // state_id: yup.string().trim().required("State is required"),
  // city_id: yup.string().trim().required("City is required"),
  // country_id: yup.string().trim().required("Country is required"),
  // pincode: yup
  //   .string()
  //   .required("Pincode is required")
  //   .matches(/^\d+$/, "Pincode must be numbers")
  //   .matches(/^\d{5,7}$/, "Pincode must be 5-7 digits"),

  // industry: yup.string().trim().nullable(),
  // facebook: yup.string().url("Invalid URL").nullable(),
  // instagram: yup.string().url("Invalid URL").nullable(),
  // linkedin: yup.string().url("Invalid URL").nullable(),
  // skype: yup.string().trim().nullable(),
  // twitter: yup.string().url("Invalid URL").nullable(),
  // whatsapp: yup.string().trim().nullable(),

  // tag_ids: yup.array().of(yup.string()).nullable(),
});

export const leadTaskSchema = yup.object().shape({
  // project_lead: yup.string().required("Project/Lead is required"),
  // project_name_lead_name: yup
  //   .string()
  //   .required("Project Name/Lead Name is required"),
  task_public_id: yup.string().required("Task ID is required"),
  task_title: yup.string().required("Subject is required"),
  start_date: yup.date().nullable().required("Start Date is required"),
  due_date: yup
    .date()
    .nullable()
    .required("End Date is required")
    .min(yup.ref("start_date"), "End Date cannot be before Start Date"),
  department: yup.string().required("Department is required"),
  category: yup.string().required("Category is required"),
  status_id: yup.string().required("Status is required"),
  priority: yup.string().required("Priority is required"),
  // assigned_to: yup.string().required("Assigned To is required"),
});

export const userValidationSchema = yup.object().shape({
  organization_id: yup.string().required("Organization is required"),
  branch_id: yup.string().required("Branch is required"),
  employees: yup.array().of(
    yup.object().shape({
      first_name: yup
        .string()
        .required("First Name is required")
        .min(2, "First Name must be at least 2 characters long")
        .max(50, "First Name cannot be more than 50 characters")
        .matches(/^[A-Za-z\s]+$/, "First Name can only contain letters"),
      last_name: yup
        .string()
        .required("Last Name is required")
        .min(2, "Last Name must be at least 2 characters long")
        .max(50, "Last Name cannot be more than 50 characters")
        .matches(/^[A-Za-z\s]+$/, "Last Name can only contain letters"),
      email: yup
        .string()
        .required("Email address is required")
        .matches(emailRgx, emailvalidMessage)
        .max(64)
        .trim(),
      contact_number: yup
        .string()
        .required("Phone Number is required")
        .matches(/^[0-9]+$/, "Phone must be a number")
        .matches(/^\d{10}$/, "Phone Number must be 10 digits"),
      // position: yup.string().required("Position is required"),
      designation: yup.string().required("Position is required"),
      department: yup.string().required("Department is required"),
      role_id: yup.string().required("Role is required"),
    })
  ),
});

export const companyValidationSchema = yup.object().shape({
  company_name: yup
    .string()
    .required("Company name is required")
    .matches(
      /^[a-zA-Z0-9\s/.@$-_&*\\]+$/,
      "Only alphanumeric, spaces, and /.@$-_&*\\ characters are allowed"
    )
    .min(3, "Company name must be at least 3 characters")
    .max(50, "Company name must be at most 50 characters"),
  website: yup
    .string()
    .required("Website is required")
    .matches(websiteRgx, "Enter a valid URL"),
  gst_number: yup
    .string()
    .nullable()
    .notRequired()
    .matches(gstRgx, "Invalid GST Number format")
    .length(15, "GST Number must be exactly 15 characters"),
  address_line_1: yup
    .string()
    .required("House No / Flat / Building Name is required"),
  landmark: yup.string().required("Area / Sector/ Locality is required"),
  country_id: yup.string().required("Country is required"),
  state_id: yup.string().required("State is required"),
  city_id: yup.string().required("City is required"),
  pincode: yup
    .string()
    .required("Pincode is required")
    .matches(/^\d+$/, "Pincode must be numbers")
    .matches(/^\d{5,7}$/, "Pincode must be 5-7 digits"),
  contacts: yup.array().of(
    yup.object().shape({
      first_name: yup
        .string()
        .required("First Name is required")
        .min(2, "First Name must be at least 2 characters long")
        .max(50, "First Name cannot be more than 50 characters")
        .matches(/^[A-Za-z\s]+$/, "First Name can only contain letters"),
      last_name: yup
        .string()
        .required("Last Name is required")
        .min(2, "Last Name must be at least 2 characters long")
        .max(50, "Last Name cannot be more than 50 characters")
        .matches(/^[A-Za-z\s]+$/, "Last Name can only contain letters"),
      email: yup
        .string()
        .required("Email address is required")
        .matches(emailRgx, emailvalidMessage)
        .max(64)
        .trim(),
      phone_number: yup
        .string()
        .required("Phone Number is required")
        .matches(/^[0-9]+$/, "Phone must be a number")
        .matches(/^\d{10}$/, "Phone Number must be 10 digits"),
      position: yup.string().required("Position is required"),
    })
  ),
});

export const contactsValidationSchema = yup.object().shape({
  first_name: yup
    .string()
    .required("First Name is required")
    .min(2, "First Name must be at least 2 characters long")
    .max(50, "First Name cannot be more than 50 characters")
    .matches(/^[A-Za-z\s]+$/, "First Name can only contain letters"),
  last_name: yup
    .string()
    .required("Last Name is required")
    .min(2, "Last Name must be at least 2 characters long")
    .max(50, "Last Name cannot be more than 50 characters")
    .matches(/^[A-Za-z\s]+$/, "Last Name can only contain letters"),
  email: yup
    .string()
    .required("Email address is required")
    .matches(emailRgx, emailvalidMessage)
    .max(64)
    .trim(),
  phone_number: yup
    .string()
    .required("Phone Number is required")
    .matches(/^[0-9]+$/, "Phone must be a number")
    .matches(/^\d{10}$/, "Phone Number must be 10 digits"),
  position: yup.string().required("Position is required"),
});

// TypeScript Interface for Form Data
export interface SignupFormData {
  first_name: string;
  last_name: string;
  email: string;
  contact_no: string;
  password: string;
  confirm_password: string;
  terms: boolean;
}
