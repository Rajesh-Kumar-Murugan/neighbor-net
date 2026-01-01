import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

type ProtectedRouteProps = {
    children: ReactNode;
    redirectPath?: string;
};

export default function ProtectedRoute({
    children,
    redirectPath = "/",
}: ProtectedRouteProps) {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        // Redirect to login page if not logged in
        return <Navigate to={redirectPath} replace />;
    }

    return <>{children}</>;
}
