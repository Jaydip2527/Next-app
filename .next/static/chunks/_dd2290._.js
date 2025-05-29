(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_dd2290._.js", {

"[project]/src/utils/validations.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "bankDetailsSchema": (()=>bankDetailsSchema),
    "companyDetailsValidationSchema": (()=>companyDetailsValidationSchema),
    "companyValidationSchema": (()=>companyValidationSchema),
    "contactValidationSchema": (()=>contactValidationSchema),
    "contactsValidationSchema": (()=>contactsValidationSchema),
    "emailRgx": (()=>emailRgx),
    "emailvalidMessage": (()=>emailvalidMessage),
    "forgotPasswordSchema": (()=>forgotPasswordSchema),
    "gstRgx": (()=>gstRgx),
    "leadFollowUpValidationSchema": (()=>leadFollowUpValidationSchema),
    "leadReminderValidationSchema": (()=>leadReminderValidationSchema),
    "leadStatusSchema": (()=>leadStatusSchema),
    "leadTaskSchema": (()=>leadTaskSchema),
    "leadValidationSchema": (()=>leadValidationSchema),
    "loginSchema": (()=>loginSchema),
    "organizationBranchSchema": (()=>organizationBranchSchema),
    "organizationValidationSchema": (()=>organizationValidationSchema),
    "otpValidationSchema": (()=>otpValidationSchema),
    "resetPasswordSchema": (()=>resetPasswordSchema),
    "signupSchema": (()=>signupSchema),
    "taxationValidationSchema": (()=>taxationValidationSchema),
    "userValidationSchema": (()=>userValidationSchema),
    "websiteRgx": (()=>websiteRgx)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/yup/index.esm.js [app-client] (ecmascript)");
;
const emailRgx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z0-9\-]+\.)+[a-z]{2,}))$/;
const emailvalidMessage = "Please enter the valid email";
const websiteRgx = /^(https?:\/\/|ftp:\/\/|www\.)[a-zA-Z0-9-._~:/?#\[\]@!$&'()*+,;=%]+$/;
const gstRgx = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const signupSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.object().shape({
    first_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("First Name is required").min(2, "First Name must be at least 2 characters long").max(50, "First Name cannot be more than 50 characters").matches(/^[A-Za-z\s]+$/, "First Name can only contain letters"),
    last_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Last Name is required").min(2, "Last Name must be at least 2 characters long").max(50, "Last Name cannot be more than 50 characters").matches(/^[A-Za-z\s]+$/, "Last Name can only contain letters"),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Email Address is required").matches(emailRgx, emailvalidMessage).max(64).trim(),
    contact_no: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Phone Number is required").matches(/^[0-9]+$/, "Phone must be a number").matches(/^\d{10}$/, "Phone Number must be 10 digits"),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Password is required").min(8, "Password must be at least 8 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/, "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character."),
    confirm_password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Confirm Password is required").oneOf([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.ref("password")
    ], "Passwords must match"),
    terms: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.boolean().oneOf([
        true
    ], "You must accept the Terms and Privacy Policy")
});
const loginSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.object().shape({
    loginId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Email / Phone Number is required").test("loginId", "Invalid email or phone number", (value)=>{
        if (!value) {
            return false;
        }
        const isPhone = /^[0-9]{10}$/.test(value);
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        return isPhone || isEmail;
    }),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Password is required").min(8, "Password must be at least 8 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/, "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character."),
    rememberMe: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.boolean()
});
const forgotPasswordSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.object().shape({
    loginId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Email address or phone number is required").test("loginId", "Invalid email address or phone number", (value)=>{
        if (!value) {
            return false;
        }
        const isPhone = /^[0-9]{10}$/.test(value);
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        return isPhone || isEmail;
    })
});
const resetPasswordSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.object().shape({
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Password is required").min(8, "Password must be at least 8 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/, "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character."),
    confirm_password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().oneOf([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.ref("password")
    ], "Passwords must match").required("Confirm Password is required")
});
const otpValidationSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.object().shape({
    mobileOtp: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Mobile OTP is required").length(6, "OTP must be exactly 6 digits").matches(/^\d{6}$/, "OTP must be numeric"),
    emailOtp: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Email OTP is required").length(6, "OTP must be exactly 6 digits").matches(/^[a-zA-Z0-9]+$/, "OTP must be alphanumeric")
});
const organizationValidationSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.object().shape({
    organizationType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Organization Type is required"),
    industryType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Industry is required"),
    country: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Country is required"),
    language: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Language is required")
});
const taxationValidationSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.object().shape({
    panNumber: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("PAN Number is required").matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format (e.g., ABCDE1234F)"),
    organizationType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Organization type is required"),
    corpRegisterNumber: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Corporate Registration Number is required").matches(/^[A-Z0-9]{8,15}$/, "Invalid Corporate Registration Number format"),
    tanNumber: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("TAN Number is required").matches(/^[A-Z]{4}[0-9]{5}[A-Z]{1}$/, "Invalid TAN format (e.g., ABCD12345E)"),
    // .matches(/^[A-Z]{4}[0-9]{5}[A-Z]{1}$/, "Invalid TAN number"),
    cinNumber: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("CIN Number is required").matches(/^[A-Z0-9]{21}$/, "Invalid CIN format (21 characters required)"),
    iecCode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().nullable().notRequired()// .required("IEC Code is required")
    .matches(/^\d{10}$/, "IEC Code must be exactly 10 digits").transform((value)=>value === "" ? null : value),
    isGSTRegistered: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.boolean(),
    msmeNumber: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().when("isGSTRegistered", {
        is: true,
        then: (schema)=>schema.required("MSME number is required").matches(/^UANIN[0-9]{12}$/, "Invalid MSME Number format (e.g., UANIN123456789012)"),
        otherwise: (schema)=>schema.notRequired()
    })
});
const companyDetailsValidationSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.object().shape({
    isGSTRegistered: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.boolean(),
    gstId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().when("isGSTRegistered", {
        is: true,
        then: (schema)=>schema.required("GST ID is required").matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GST ID format").length(15, "GST ID must be exactly 15 characters"),
        otherwise: (schema)=>schema.nullable()
    }),
    gstType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().when("isGSTRegistered", {
        is: true,
        then: (schema)=>schema.required("GST Type is required")
    }),
    organizationName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Organization name is required").matches(/^[a-zA-Z0-9\s/.@$-_&*\\]+$/, "Only alphanumeric, spaces, and /.@$-_&*\\ characters are allowed").min(3, "Organization name must be at least 3 characters").max(50, "Organization name must be at most 50 characters"),
    // alias: yup.string().required("Alias is required"),
    currency: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Currency is required"),
    contactPerson: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Contact Person is required").matches(/^[a-zA-Z\s]+$/, "Contact Person can only contain letters"),
    phoneNumber: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__// .string()
    // .matches(/^\d{10}$/, "Phone number must be 10 digits")
    // .required("Phone Number is required"),
    .string().required("Phone Number is required").matches(/^[0-9]+$/, "Phone must be a number").matches(/^\d{10}$/, "Phone Number must be 10 digits"),
    houseNo: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("House No / Flat / Building Name is required"),
    area: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Area / Sector / Locality is required"),
    state: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("State is required"),
    city: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("City is required"),
    pincode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Pincode is required").matches(/^\d+$/, "Pincode must be numbers").matches(/^\d{5,7}$/, "Pincode must be 5-7 digits"),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Email address is required").matches(emailRgx, emailvalidMessage).max(64).trim(),
    website: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Website is required").matches(websiteRgx, "Enter a valid URL")
});
const bankDetailsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.object().shape({
    accountName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Account Name is required").matches(/^[a-zA-Z ]+$/, "Account Name must be alphabetic"),
    accountNumber: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Account Number is required").matches(/^\d{9,18}$/, "Account Number must be 9-18 digits"),
    bankName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Bank Name is required").matches(/^[a-zA-Z ]+$/, "Bank Name must be alphabetic"),
    ifscCode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("IFSC Code is required").matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code (e.g., HDFC0123456)"),
    swiftCode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("SWIFT Code is required").matches(/^[A-Z]{4}[A-Z0-9]{2,3}[A-Z0-9]{0,3}$/, "Invalid SWIFT Code (e.g., HDFCINBBXXX)"),
    micrCode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("MICR Code is required").matches(/^\d{9}$/, "MICR Code must be exactly 9 digits"),
    branch: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Branch is required").matches(/^[a-zA-Z ]+$/, "Branch must be alphabetic")
});
const organizationBranchSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.object().shape({
    branch_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Branch Name is required").min(3, "Branch Name must be at least 3 characters").max(100, "Branch Name can't exceed 100 characters"),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Email address is required").matches(emailRgx, emailvalidMessage).max(64).trim(),
    phone_number: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Phone Number is required").matches(/^[0-9]+$/, "Phone must be a number").matches(/^\d{10}$/, "Phone Number must be 10 digits"),
    whatsapp: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().nullable().notRequired().matches(/^[0-9]+$/, "WhatsApp must be a number").matches(/^\d{10}$/, "WhatsApp Number must be 10 digits").transform((value)=>value === "" ? null : value),
    website: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Website is required").matches(websiteRgx, "Enter a valid URL"),
    pan_number: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().nullable().notRequired().matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format (e.g., ABCDE1234F)").transform((value)=>value === "" ? null : value),
    msme_number: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().nullable().notRequired().matches(/^UANIN[0-9]{12}$/, "Invalid MSME Number format (e.g., UANIN123456789012)").transform((value)=>value === "" ? null : value),
    // gst_registration_type: yup
    //   .string()
    //   .required("GST Registration Type is required"),
    gst_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().nullable().notRequired().required("GST ID is required").matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GST ID format").length(15, "GST ID must be exactly 15 characters").transform((value)=>value === "" ? null : value),
    // country_id: yup.string().required("Country is required"),
    language_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Language is required"),
    currency_code_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Currency is required"),
    address_details: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.object().shape({
        addresses: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.array().of(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.object().shape({
            address_line_1: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Address Line 1 is required").min(5, "Address Line 1 must be at least 5 characters"),
            landmark: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Area / Sector/ Locality is required").min(5, "Area / Sector/ Locality must be at least 5 characters"),
            city: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("City is required"),
            state: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("State is required"),
            pincode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Pincode is required").matches(/^\d+$/, "Pincode must be numbers").matches(/^\d{5,7}$/, "Pincode must be 5-7 digits"),
            country: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Country is required")
        })).min(1, "At least one address is required").required("Address details are required")
    })
});
const leadValidationSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.object().shape({
    first_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("First Name is required").min(2, "First Name must be at least 2 characters long").max(50, "First Name cannot be more than 50 characters").matches(/^[A-Za-z\s]+$/, "First Name can only contain letters"),
    // last_name:  last_name: yup
    // .string()
    // .required("Last Name is required")
    // .min(2, "Last Name must be at least 2 characters long")
    // .max(50, "Last Name cannot be more than 50 characters")
    // .matches(/^[A-Za-z\s]+$/, "Last Name can only contain letters"),
    company_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().when("is_individual_lead", {
        is: false,
        then: (schema)=>schema.required("Company name is required").matches(/^[a-zA-Z0-9\s/.@$-_&*\\]+$/, "Only alphanumeric, spaces, and /.@$-_&*\\ characters are allowed").min(3, "Company name must be at least 3 characters").max(50, "Company name must be at most 50 characters"),
        otherwise: (schema)=>schema.notRequired()
    }),
    gst_number: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().nullable().notRequired().matches(gstRgx, "Invalid GST Number format").length(15, "GST Number must be exactly 15 characters").transform((value)=>value === "" ? null : value),
    website: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().nullable().notRequired().matches(websiteRgx, "Enter a valid URL").transform((value)=>value === "" ? null : value),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Email address is required").matches(emailRgx, emailvalidMessage).max(64).trim(),
    phone_number: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Phone Number is required").matches(/^[0-9]+$/, "Phone must be a number").matches(/^\d{10}$/, "Phone Number must be 10 digits"),
    country_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string()// .uuid("Invalid country ID format")
    .required("Country is required"),
    state_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string()// .uuid("Invalid state ID format")
    .required("State is required"),
    city_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string()// .uuid("Invalid city ID format")
    .required("City is required"),
    budget: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().nullable().notRequired().matches(/^\d+$/, "Only whole numbers are allowed").transform((value)=>value === "" ? null : value)
});
const leadReminderValidationSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.object().shape({
    subject: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Subject is required"),
    reminder_mode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.array().of(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string()).required("Reminder Mode is required").min(1, "Reminder Mode is required"),
    start_date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.date().required("Start Date is required").min(new Date(), "Start Date cannot be in the past"),
    time: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Time is required"),
    frequency: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().when("recurring_reminder", {
        is: true,
        then: (schema)=>schema.required("Frequency is required")
    }),
    end_date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.date().when("recurring_reminder", {
        is: true,
        then: (schema)=>schema.required("End Date is required").min(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.ref("start_date"), "End Date must be after Start Date")
    })
});
const cleanHTML = (value)=>{
    // Remove empty tags and whitespace
    const strippedValue = value.replace(/<[^>]+>/g, "").trim();
    return strippedValue.length > 0;
};
const leadFollowUpValidationSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.object().shape({
    note_description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().test("note-required", "Note Description is required", (value)=>cleanHTML(value || ""))
});
const leadStatusSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Status Name is required"),
    // icon: yup.string().required("Icon is required"),
    sequence: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Order is required").matches(/^\d+$/, "Order must be a valid number"),
    color: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string()
});
const contactValidationSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.object().shape({
    first_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("First Name is required").min(2, "First Name must be at least 2 characters long").max(50, "First Name cannot be more than 50 characters").matches(/^[A-Za-z\s]+$/, "First Name can only contain letters"),
    last_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Last Name is required").trim().min(2, "Last Name must be at least 2 characters long").max(50, "Last Name cannot be more than 50 characters").matches(/^[A-Za-z\s]+$/, "Last Name can only contain letters"),
    company_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().nullable().trim().notRequired().matches(/^[a-zA-Z0-9\s/.@$-_&*\\]+$/, "Only alphanumeric, spaces, and /.@$-_&*\\ characters are allowed").min(3, "Company name must be at least 3 characters").max(50, "Company name cannot be more than 50 characters").transform((value)=>value === "" ? null : value),
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
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.array().of(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.object().shape({
        email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Email address is required").matches(emailRgx, emailvalidMessage).max(64).trim(),
        email_label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().oneOf([
            "work",
            "personal",
            "other"
        ]).required()
    })).min(1, "At least one email is required"),
    phone_number: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.array().of(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.object().shape({
        phone_number: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Phone Number is required").matches(/^[0-9]+$/, "Phone must be a number").matches(/^\d{10}$/, "Phone Number must be 10 digits"),
        phone_label: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().oneOf([
            "work",
            "home",
            "mobile"
        ]).required()
    })).min(1, "At least one phone number is required")
});
const leadTaskSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.object().shape({
    // project_lead: yup.string().required("Project/Lead is required"),
    // project_name_lead_name: yup
    //   .string()
    //   .required("Project Name/Lead Name is required"),
    task_public_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Task ID is required"),
    task_title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Subject is required"),
    start_date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.date().nullable().required("Start Date is required"),
    due_date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.date().nullable().required("End Date is required").min(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.ref("start_date"), "End Date cannot be before Start Date"),
    department: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Department is required"),
    category: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Category is required"),
    status_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Status is required"),
    priority: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Priority is required")
});
const userValidationSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.object().shape({
    organization_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Organization is required"),
    branch_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Branch is required"),
    employees: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.array().of(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.object().shape({
        first_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("First Name is required").min(2, "First Name must be at least 2 characters long").max(50, "First Name cannot be more than 50 characters").matches(/^[A-Za-z\s]+$/, "First Name can only contain letters"),
        last_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Last Name is required").min(2, "Last Name must be at least 2 characters long").max(50, "Last Name cannot be more than 50 characters").matches(/^[A-Za-z\s]+$/, "Last Name can only contain letters"),
        email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Email address is required").matches(emailRgx, emailvalidMessage).max(64).trim(),
        contact_number: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Phone Number is required").matches(/^[0-9]+$/, "Phone must be a number").matches(/^\d{10}$/, "Phone Number must be 10 digits"),
        // position: yup.string().required("Position is required"),
        designation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Position is required"),
        department: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Department is required"),
        role_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Role is required")
    }))
});
const companyValidationSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.object().shape({
    company_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Company name is required").matches(/^[a-zA-Z0-9\s/.@$-_&*\\]+$/, "Only alphanumeric, spaces, and /.@$-_&*\\ characters are allowed").min(3, "Company name must be at least 3 characters").max(50, "Company name must be at most 50 characters"),
    website: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Website is required").matches(websiteRgx, "Enter a valid URL"),
    gst_number: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().nullable().notRequired().matches(gstRgx, "Invalid GST Number format").length(15, "GST Number must be exactly 15 characters"),
    address_line_1: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("House No / Flat / Building Name is required"),
    landmark: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Area / Sector/ Locality is required"),
    country_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Country is required"),
    state_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("State is required"),
    city_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("City is required"),
    pincode: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Pincode is required").matches(/^\d+$/, "Pincode must be numbers").matches(/^\d{5,7}$/, "Pincode must be 5-7 digits"),
    contacts: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.array().of(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.object().shape({
        first_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("First Name is required").min(2, "First Name must be at least 2 characters long").max(50, "First Name cannot be more than 50 characters").matches(/^[A-Za-z\s]+$/, "First Name can only contain letters"),
        last_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Last Name is required").min(2, "Last Name must be at least 2 characters long").max(50, "Last Name cannot be more than 50 characters").matches(/^[A-Za-z\s]+$/, "Last Name can only contain letters"),
        email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Email address is required").matches(emailRgx, emailvalidMessage).max(64).trim(),
        phone_number: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Phone Number is required").matches(/^[0-9]+$/, "Phone must be a number").matches(/^\d{10}$/, "Phone Number must be 10 digits"),
        position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Position is required")
    }))
});
const contactsValidationSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.object().shape({
    first_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("First Name is required").min(2, "First Name must be at least 2 characters long").max(50, "First Name cannot be more than 50 characters").matches(/^[A-Za-z\s]+$/, "First Name can only contain letters"),
    last_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Last Name is required").min(2, "Last Name must be at least 2 characters long").max(50, "Last Name cannot be more than 50 characters").matches(/^[A-Za-z\s]+$/, "Last Name can only contain letters"),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Email address is required").matches(emailRgx, emailvalidMessage).max(64).trim(),
    phone_number: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Phone Number is required").matches(/^[0-9]+$/, "Phone must be a number").matches(/^\d{10}$/, "Phone Number must be 10 digits"),
    position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.string().required("Position is required")
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/redux/redux-hooks.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/* eslint-disable import/named */ __turbopack_esm__({
    "useAppDispatch": (()=>useAppDispatch),
    "useAppSelector": (()=>useAppSelector)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var _s = __turbopack_refresh__.signature();
;
const useAppDispatch = ()=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"])();
};
_s(useAppDispatch, "jI3HA1r1Cumjdbu14H7G+TUj798=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"]
    ];
});
const useAppSelector = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"].withTypes();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/component/common-progress-button/index.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$syncfusion$2f$ej2$2d$react$2d$splitbuttons$2f$src$2f$progress$2d$button$2f$progressbutton$2e$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@syncfusion/ej2-react-splitbuttons/src/progress-button/progressbutton.component.js [app-client] (ecmascript)");
;
;
const CommonProgressButton = ({ content = "Submit", className = "common_btn", onClick = ()=>{}, loading = false, disabled = false, type = "submit", style = {}, ref })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$syncfusion$2f$ej2$2d$react$2d$splitbuttons$2f$src$2f$progress$2d$button$2f$progressbutton$2e$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProgressButtonComponent"], {
        cssClass: `${loading ? "common_btn_diabled" : className} e-hide-spinner`,
        ref: ref,
        type: type,
        enableProgress: loading,
        disabled: disabled || loading,
        onClick: onClick,
        style: style,
        children: loading ? "Loading..." : content
    }, void 0, false, {
        fileName: "[project]/src/component/common-progress-button/index.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
};
_c = CommonProgressButton;
const __TURBOPACK__default__export__ = CommonProgressButton;
var _c;
__turbopack_refresh__.register(_c, "CommonProgressButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/component/toggle-switch/index.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$syncfusion$2f$ej2$2d$buttons$2f$src$2f$common$2f$common$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@syncfusion/ej2-buttons/src/common/common.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$syncfusion$2f$ej2$2d$react$2d$buttons$2f$src$2f$switch$2f$switch$2e$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@syncfusion/ej2-react-buttons/src/switch/switch.component.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
const Switch = ({ checked, onChange })=>{
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Switch.useEffect": ()=>{
            const rippleHandler = {
                "Switch.useEffect.rippleHandler": (e)=>{
                    const rippleSpan = document.querySelector(".e-ripple-container");
                    if (rippleSpan) {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$syncfusion$2f$ej2$2d$buttons$2f$src$2f$common$2f$common$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rippleMouseHandler"])(e, rippleSpan);
                    }
                }
            }["Switch.useEffect.rippleHandler"];
            const elemArray = document.querySelectorAll(".switch-control label");
            elemArray.forEach({
                "Switch.useEffect": (elem)=>{
                    elem.addEventListener("mouseup", rippleHandler);
                    elem.addEventListener("mousedown", rippleHandler);
                }
            }["Switch.useEffect"]);
            return ({
                "Switch.useEffect": ()=>{
                    elemArray.forEach({
                        "Switch.useEffect": (elem)=>{
                            elem.removeEventListener("mouseup", rippleHandler);
                            elem.removeEventListener("mousedown", rippleHandler);
                        }
                    }["Switch.useEffect"]);
                }
            })["Switch.useEffect"];
        }
    }["Switch.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "switch_main_div",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$syncfusion$2f$ej2$2d$react$2d$buttons$2f$src$2f$switch$2f$switch$2e$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchComponent"], {
            id: "checked",
            checked: checked,
            change: (e)=>onChange(e.checked)
        }, void 0, false, {
            fileName: "[project]/src/component/toggle-switch/index.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/component/toggle-switch/index.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
};
_s(Switch, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = Switch;
const __TURBOPACK__default__export__ = Switch;
var _c;
__turbopack_refresh__.register(_c, "Switch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/public/Images/logo.png [app-client] (static)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__("/_next/static/media/logo.391eb05c.png");}}),
"[project]/public/Images/logo.png.mjs { IMAGE => \"[project]/public/Images/logo.png [app-client] (static)\" } [app-client] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$Images$2f$logo$2e$png__$5b$app$2d$client$5d$__$28$static$29$__ = __turbopack_import__("[project]/public/Images/logo.png [app-client] (static)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$Images$2f$logo$2e$png__$5b$app$2d$client$5d$__$28$static$29$__["default"],
    width: 98,
    height: 32,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADCAYAAACuyE5IAAAAbklEQVR42gFjAJz/AAQOHisEDRwmBhUtQQURJTEEDh8pBA8gJxgvVm1gaHaHAAkcPV8LJVBuCyVPdAwpWYAMJ1V3CBs7UhgvVGxIUmF9AAIGDhYCBg0SAgcQFQUSJzICCBEYAwsYIgkcO1gLDQ8TI1APY4dSUG4AAAAASUVORK5CYII=",
    blurWidth: 8,
    blurHeight: 3
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/public/Images/google.png [app-client] (static)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__("/_next/static/media/google.06f908e6.png");}}),
"[project]/public/Images/google.png.mjs { IMAGE => \"[project]/public/Images/google.png [app-client] (static)\" } [app-client] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$Images$2f$google$2e$png__$5b$app$2d$client$5d$__$28$static$29$__ = __turbopack_import__("[project]/public/Images/google.png [app-client] (static)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$Images$2f$google$2e$png__$5b$app$2d$client$5d$__$28$static$29$__["default"],
    width: 20,
    height: 20,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABE0lEQVR42gEIAff+AAUCAQNkHBdC6EA1wPFDNvTxQzby0zovuFUXEy4CAQAAAFwcE0LcPTHT6kE05dY7MK7UOy+szDgtpFMWESMCAQAAANiAELvsVyrleiMaTiAJCAogDQ8QHQ0PFAcHCwkDBgoJAPu6AfTdmAauIRQCCQcNFxE2X6aVPmy8tj5svLY+bLyzAPq7APTLpQauGhgCCgkQHRJEd9OiT4rzzVGO+PRRjvjyALmyE8BWsDTmFlsiUAcbEAsXNEEXOGipXlGO+OpGfNm7AB5MGUIlpUDTJ69E5SOfPq4knkCuNaKB5UWGzdMfNl5CAAEEAgMPRRpCI509uyi0RvIotEb0J6xFwBVGMkICAwUDnjpdU6Rk6JYAAAAASUVORK5CYII=",
    blurWidth: 8,
    blurHeight: 8
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/public/Images/iphone.png [app-client] (static)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__("/_next/static/media/iphone.8dd97df8.png");}}),
"[project]/public/Images/iphone.png.mjs { IMAGE => \"[project]/public/Images/iphone.png [app-client] (static)\" } [app-client] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$Images$2f$iphone$2e$png__$5b$app$2d$client$5d$__$28$static$29$__ = __turbopack_import__("[project]/public/Images/iphone.png [app-client] (static)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$Images$2f$iphone$2e$png__$5b$app$2d$client$5d$__$28$static$29$__["default"],
    width: 20,
    height: 20,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAgUlEQVR42m3OoQqDUBSA4TsYLIzBFteWBusr4iMIvofFYBbfQ7PBZ7EoGAwWiyBmDRb1P3KDige+cs4fjlL7uSGAp04OH/wQwcITFzne4aNCigw1QrwkMNFi3hjh4iqBjeEQ9Hq/zh/NIZiQ4C3BA7FebqMCX6U/NVDqR3N0cOSHBfzCIV27jHL0AAAAAElFTkSuQmCC",
    blurWidth: 8,
    blurHeight: 8
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/signin/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>SignIn)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$iconify$2f$react$2f$dist$2f$iconify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@iconify/react/dist/iconify.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$yup$2f$dist$2f$yup$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@hookform/resolvers/yup/dist/yup.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/js-cookie/dist/js.cookie.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$validations$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/utils/validations.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/redux/slices/authSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$redux$2d$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/redux/redux-hooks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$slices$2f$organizationSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/redux/slices/organizationSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$common$2d$progress$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/component/common-progress-button/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constant$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/utils/constant.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$toggle$2d$switch$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/component/toggle-switch/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$Images$2f$logo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$Images$2f$logo$2e$png__$5b$app$2d$client$5d$__$28$static$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_import__('[project]/public/Images/logo.png.mjs { IMAGE => "[project]/public/Images/logo.png [app-client] (static)" } [app-client] (structured image object, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$Images$2f$google$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$Images$2f$google$2e$png__$5b$app$2d$client$5d$__$28$static$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_import__('[project]/public/Images/google.png.mjs { IMAGE => "[project]/public/Images/google.png [app-client] (static)" } [app-client] (structured image object, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$Images$2f$iphone$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$Images$2f$iphone$2e$png__$5b$app$2d$client$5d$__$28$static$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__ = __turbopack_import__('[project]/public/Images/iphone.png.mjs { IMAGE => "[project]/public/Images/iphone.png [app-client] (static)" } [app-client] (structured image object, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Row$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-bootstrap/esm/Row.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Col$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-bootstrap/esm/Col.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$syncfusion$2f$ej2$2d$react$2d$inputs$2f$src$2f$textbox$2f$textbox$2e$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@syncfusion/ej2-react-inputs/src/textbox/textbox.component.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function SignIn() {
    _s();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$redux$2d$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$redux$2d$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "SignIn.useAppSelector": (state)=>state.auth
    }["SignIn.useAppSelector"]);
    const { control, handleSubmit, setValue } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"])({
        resolver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$yup$2f$dist$2f$yup$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["yupResolver"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$validations$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginSchema"]),
        mode: "onChange",
        defaultValues: {
            loginId: "",
            password: "",
            rememberMe: false
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SignIn.useEffect": ()=>{
            const savedloginId = localStorage.getItem("loginId");
            const savedPassword = localStorage.getItem("password");
            const savedRememberMe = localStorage.getItem("rememberMe") === "true";
            if (savedRememberMe && savedloginId && savedPassword) {
                setValue("loginId", savedloginId);
                setValue("password", savedPassword);
                setValue("rememberMe", savedRememberMe);
            }
        }
    }["SignIn.useEffect"], [
        setValue
    ]);
    const onSubmit = async (data)=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginUser"])({
            loginId: data.loginId,
            password: data.password
        })).unwrap().then((response)=>{
            if (response?.status === 201 || response?.status === 200) {
                const { access_token, refresh_token, x_cur_add, organizationData, email, first_name, last_name, user_id, contact_no_verified, contact_no } = response.data.data;
                // ✅ Store login details only if "Remember Me" is checked
                if (data.rememberMe) {
                    localStorage.setItem("token", access_token);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set("token", access_token, {
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constant$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cookiesOptions"],
                        sameSite: "Strict"
                    });
                    localStorage.setItem("refreshToken", refresh_token);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set("refreshToken", refresh_token, {
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constant$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cookiesOptions"],
                        sameSite: "Strict"
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set("contact_no_verified", contact_no_verified, {
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constant$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cookiesOptions"],
                        sameSite: "Strict"
                    });
                    // localStorage.setItem("curAddress", x_cur_add);
                    localStorage.setItem("rememberMe", "true");
                    localStorage.setItem("user", JSON.stringify({
                        email,
                        first_name,
                        last_name,
                        user_id,
                        contact_no
                    }));
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set("user", JSON.stringify({
                        email,
                        first_name,
                        last_name,
                        user_id,
                        contact_no
                    }), {
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constant$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cookiesOptions"],
                        sameSite: "Strict"
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set("organizations", organizationData?.data?.length, {
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constant$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cookiesOptions"],
                        sameSite: "Strict"
                    });
                } else {
                    sessionStorage.setItem("token", access_token);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set("token", access_token, {
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constant$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cookiesOptions"],
                        sameSite: "Strict"
                    });
                    sessionStorage.setItem("refreshToken", refresh_token);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set("refreshToken", refresh_token, {
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constant$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cookiesOptions"],
                        sameSite: "Strict"
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set("contact_no_verified", contact_no_verified, {
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constant$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cookiesOptions"],
                        sameSite: "Strict"
                    });
                    // sessionStorage.setItem("curAddress", x_cur_add);
                    localStorage.setItem("user", JSON.stringify({
                        email,
                        first_name,
                        last_name,
                        user_id,
                        contact_no
                    }));
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set("user", JSON.stringify({
                        email,
                        first_name,
                        last_name,
                        user_id
                    }), {
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constant$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cookiesOptions"],
                        sameSite: "Strict"
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set("organizations", organizationData?.data?.length, {
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constant$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cookiesOptions"],
                        sameSite: "Strict"
                    });
                }
                // ✅ Redirect based on organizationData
                if (organizationData?.data?.length === 0) {
                    router.push("/organizationprofile");
                } else {
                    if (organizationData?.data?.length === 1 && organizationData?.data?.length !== 0) {
                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$slices$2f$organizationSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setOrganizations"])(organizationData?.data[0]));
                        router.push("/dashboard");
                        if (data.rememberMe) {
                            localStorage.setItem("curAddress", x_cur_add);
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set("curAddress", x_cur_add, {
                                ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constant$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cookiesOptions"],
                                sameSite: "Strict"
                            });
                        } else {
                            sessionStorage.setItem("curAddress", x_cur_add);
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set("curAddress", x_cur_add, {
                                ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$constant$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cookiesOptions"],
                                sameSite: "Strict"
                            });
                        }
                    } else {
                        router.push("/select-organization-profile");
                    }
                }
            }
        }).catch((error)=>{
            // console.error("Error:", error);
            console.log("Error:", error);
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "login_main_div",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "login_partition_data",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "auth_left_data"
                    }, void 0, false, {
                        fileName: "[project]/src/app/signin/page.tsx",
                        lineNumber: 199,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "auth_right_data d-flex justify-content-center align-items-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "data_size",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "signin_title_main_div",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "signin_title_text",
                                                children: " Welcome To "
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/signin/page.tsx",
                                                lineNumber: 204,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "logo_img_div",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    className: "login_logo_img img-fluid",
                                                    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$Images$2f$logo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$Images$2f$logo$2e$png__$5b$app$2d$client$5d$__$28$static$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                                                    alt: "Logo"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/signin/page.tsx",
                                                    lineNumber: 206,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/signin/page.tsx",
                                                lineNumber: 205,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/signin/page.tsx",
                                        lineNumber: 203,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        onSubmit: handleSubmit(onSubmit),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Row$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Col$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        lg: 12,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text_filed text_filed_dropdown",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controller"], {
                                                                name: "loginId",
                                                                control: control,
                                                                render: ({ field, fieldState: { error } })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$syncfusion$2f$ej2$2d$react$2d$inputs$2f$src$2f$textbox$2f$textbox$2e$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextBoxComponent"], {
                                                                                placeholder: "Email / Phone Number *",
                                                                                cssClass: "e-outline",
                                                                                floatLabelType: "Auto",
                                                                                value: field.value,
                                                                                onChange: (e)=>setValue("loginId", e.value, {
                                                                                        shouldValidate: true
                                                                                    })
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/signin/page.tsx",
                                                                                lineNumber: 223,
                                                                                columnNumber: 31
                                                                            }, void 0),
                                                                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "error-text",
                                                                                children: error?.message
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/signin/page.tsx",
                                                                                lineNumber: 235,
                                                                                columnNumber: 33
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/signin/page.tsx",
                                                                lineNumber: 218,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/signin/page.tsx",
                                                            lineNumber: 217,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/signin/page.tsx",
                                                        lineNumber: 216,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$bootstrap$2f$esm$2f$Col$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        lg: 12,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text_filed text_filed_dropdown position-relative",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controller"], {
                                                                name: "password",
                                                                control: control,
                                                                render: ({ field, fieldState: { error } })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$syncfusion$2f$ej2$2d$react$2d$inputs$2f$src$2f$textbox$2f$textbox$2e$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextBoxComponent"], {
                                                                                type: showPassword ? "text" : "password",
                                                                                placeholder: "Password *",
                                                                                cssClass: "e-outline",
                                                                                floatLabelType: "Auto",
                                                                                value: field.value,
                                                                                onChange: (e)=>setValue("password", e.value, {
                                                                                        shouldValidate: true
                                                                                    })
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/signin/page.tsx",
                                                                                lineNumber: 249,
                                                                                columnNumber: 31
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$iconify$2f$react$2f$dist$2f$iconify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                                                                                icon: showPassword ? "mdi:eye-off" : "mdi:eye",
                                                                                className: "password-toggle-icon toggle_password_margin",
                                                                                onClick: ()=>setShowPassword(!showPassword)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/signin/page.tsx",
                                                                                lineNumber: 261,
                                                                                columnNumber: 31
                                                                            }, void 0),
                                                                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "error-text",
                                                                                children: error?.message
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/signin/page.tsx",
                                                                                lineNumber: 267,
                                                                                columnNumber: 33
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/signin/page.tsx",
                                                                lineNumber: 244,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/signin/page.tsx",
                                                            lineNumber: 243,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/signin/page.tsx",
                                                        lineNumber: 242,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/signin/page.tsx",
                                                lineNumber: 215,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "description_signin_main",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "signin_switch_sec",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controller"], {
                                                                name: "rememberMe",
                                                                control: control,
                                                                render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$toggle$2d$switch$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        checked: field?.value ?? false,
                                                                        onChange: (checked)=>field.onChange(checked)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/signin/page.tsx",
                                                                        lineNumber: 283,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/signin/page.tsx",
                                                                lineNumber: 279,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "description_login_page",
                                                                children: " Remember Me "
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/signin/page.tsx",
                                                                lineNumber: 289,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/signin/page.tsx",
                                                        lineNumber: 278,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/forgotpassword",
                                                        className: "signin_redirection_link",
                                                        children: [
                                                            " ",
                                                            "Forgot Password?",
                                                            " "
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/signin/page.tsx",
                                                        lineNumber: 291,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/signin/page.tsx",
                                                lineNumber: 277,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "signup_btn_div",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$common$2d$progress$2d$button$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    content: "Sign In",
                                                    loading: loading
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/signin/page.tsx",
                                                    lineNumber: 300,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/signin/page.tsx",
                                                lineNumber: 299,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/signin/page.tsx",
                                        lineNumber: 214,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "signup_option_title",
                                        children: " OR "
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/signin/page.tsx",
                                        lineNumber: 304,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "signup_option",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "signup_option_data",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "#",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        className: "option_img img-fluid",
                                                        src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$Images$2f$google$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$Images$2f$google$2e$png__$5b$app$2d$client$5d$__$28$static$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                                                        alt: "GoogleIcon"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/signin/page.tsx",
                                                        lineNumber: 309,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/signin/page.tsx",
                                                    lineNumber: 308,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/signin/page.tsx",
                                                lineNumber: 307,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "signup_option_data",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "#",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        className: "option_img img-fluid",
                                                        src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$Images$2f$iphone$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$Images$2f$iphone$2e$png__$5b$app$2d$client$5d$__$28$static$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object$2c$__ecmascript$29$__["default"],
                                                        alt: "IphoneIcon"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/signin/page.tsx",
                                                        lineNumber: 318,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/signin/page.tsx",
                                                    lineNumber: 317,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/signin/page.tsx",
                                                lineNumber: 316,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/signin/page.tsx",
                                        lineNumber: 306,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "signup_account_info",
                                        children: [
                                            "New on our platform?",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "link_text",
                                                href: "/",
                                                children: "Sign Up"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/signin/page.tsx",
                                                lineNumber: 329,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/signin/page.tsx",
                                        lineNumber: 327,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/signin/page.tsx",
                                lineNumber: 202,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/signin/page.tsx",
                            lineNumber: 201,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/signin/page.tsx",
                        lineNumber: 200,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/signin/page.tsx",
                lineNumber: 198,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/signin/page.tsx",
            lineNumber: 197,
            columnNumber: 7
        }, this)
    }, void 0, false);
}
_s(SignIn, "YP+4c1CJ2Jocn/86KR9IJjrZRoU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$redux$2d$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$redux$2d$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"]
    ];
});
_c = SignIn;
var _c;
__turbopack_refresh__.register(_c, "SignIn");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/signin/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=_dd2290._.js.map