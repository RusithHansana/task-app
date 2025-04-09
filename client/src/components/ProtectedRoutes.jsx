import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
    const { user } = useSelector((state) => state.auth);

    return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoutes;