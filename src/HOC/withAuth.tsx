// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// const withAuth = (WrappedComponent: React.ComponentType) => {
//   const ComponentWithAuth = (props: any) => {
//     const router = useRouter();
//     const [loading, setLoading] = useState(true);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       const curAddress =
//         localStorage.getItem("curAddress") ||
//         sessionStorage.getItem("curAddress");
//       const contactToken = localStorage.getItem(
//         "contact_no_verification_token"
//       );

//       if (!token) {
//         router.replace(contactToken ? "/otpverify" : "/signin");
//       } else if (token && curAddress) {
//         // router.replace("/dashboard");
//         setIsAuthenticated(true);
//       } else {
//         setIsAuthenticated(true);
//       }
//       setLoading(false);
//     }, []);

//     if (loading) {
//       return <p>Loading...</p>;
//     }

//     if (
//       !isAuthenticated &&
//       !localStorage.getItem("contact_no_verification_token")
//     ) {
//       return null; // ✅ Prevent unauthorized access without infinite loop
//     }

//     return <WrappedComponent {...props} />;
//   };

//   ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

//   return ComponentWithAuth;
// };

// export default withAuth;
