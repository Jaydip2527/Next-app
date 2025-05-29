(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root of the server]__d50270._.js", {

"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[externals]/node:buffer [external] (node:buffer, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[project]/src/middleware.ts [middleware] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "config": (()=>config),
    "middleware": (()=>middleware)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/api/server.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware] (ecmascript)");
;
function middleware(req) {
    const token = req.cookies.get("token")?.value || null;
    const contact_verified = req.cookies.get("contact_no_verified")?.value || null;
    const curAddress = req.cookies.get("curAddress")?.value || null;
    const organizations = req.cookies.get("organizations")?.value || null;
    const first_org = req.cookies.get("first_organisation")?.value || null;
    const contact_verify_token = req.cookies.get("contact_no_verification_token")?.value || null;
    const email_verify_token = req.cookies.get("email_verification_token")?.value || null;
    const user = req.cookies.get("user")?.value || null;
    // Publicly accessible routes
    const publicRoutes = [
        "/signin",
        "/",
        "/forgotpassword",
        // "/reset-password",
        "/otpverify"
    ];
    // ✅ Allow dynamic reset-password route (e.g., `/reset-password/abc123`)
    const isResetPasswordRoute = /^\/reset-password\/[^/]+$/.test(req.nextUrl.pathname);
    // Case 0: If user is logged out and accesing otpverify, redirect to signin
    if (!token && !contact_verify_token && !email_verify_token && req.nextUrl.pathname === "/otpverify") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/signin", req.url));
    }
    // Case 1: If user is logged in but not verified, redirect to OTP verify
    if (token && contact_verified === "false" && req.nextUrl.pathname !== "/otpverify") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/otpverify", req.url));
    }
    // Case 2: If user has verification tokens but no auth token, allow "/otpverify"
    if (!token && contact_verify_token && email_verify_token && user && req.nextUrl.pathname !== "/otpverify") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/otpverify", req.url));
    }
    // Case 3: If user is logged in and verification is complete, handle profile setup
    if (token && contact_verified === "true") {
        if (!curAddress && first_org !== "true" && (!organizations || organizations === "0") && req.nextUrl.pathname !== "/organizationprofile") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/organizationprofile", req.url));
        }
    // if (
    //   !curAddress &&
    //   organizations !== "0" &&
    //   organizations !== "1" &&
    //   req.nextUrl.pathname !== "/select-organization-profile"
    // ) {
    //   return NextResponse.redirect(
    //     new URL("/select-organization-profile", req.url)
    //   );
    // }
    }
    // Case 4: If user is authenticated and tries to access public routes (except otpverify), redirect to dashboard
    if (token && publicRoutes.includes(req.nextUrl.pathname) && req.nextUrl.pathname !== "/otpverify") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/dashboard", req.url));
    }
    // Case 5: If user is NOT authenticated and is trying to access a protected route (except otpverify), redirect to login
    if (!token && !publicRoutes.includes(req.nextUrl.pathname) && !isResetPasswordRoute) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/signin", req.url));
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next(); // Allow request to proceed
}
const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|images|next.svg|vercel.svg).*)"
    ]
};
}}),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__d50270._.js.map