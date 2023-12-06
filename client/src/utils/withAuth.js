import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
// import { getFromLocalStorage } from "./localStorage";

const withAuth = (WrappedComponent, allowedRoles = []) => {
  return (props) => {
    const router = useRouter();

    // Check if running on the server (Next.js server-side rendering)
    if (typeof window === "undefined") {
      return null; // Don't do anything on the server side
    }

    // Get the token from local storage
    const token = localStorage.getItem("accessToken");
    // If no token is found, redirect to the login page
    if (!token) {
      router.replace("/login");
      return null;
    }
    // console.log("Token:", token);

    try {
      // Verify the token
      const decoded = jwt.verify(
        token,
      `${process.env.NEXT_PUBLIC_JWT_SECRET}`
      );
      console.log("Decoded:", decoded);

      if (!decoded || !decoded.role) {
        console.error("Invalid token structure");
        router.replace("/login");
        return null;
      }

      // Check if the user's role is allowed to access the component
      if (allowedRoles.includes(decoded.role)) {
        console.log("allowedRoles", allowedRoles);
        return <WrappedComponent {...props} />;
      } else {
        // Redirect to unauthorized page
        // router.replace("/unauthorized");
        router.back();
        return null;
      }
    } catch (error) {
      // If token verification fails, redirect to the login page
      console.error("Token verification failed", error);
      router.replace("/login");
      return null;
    }
  };
};

export default withAuth;
