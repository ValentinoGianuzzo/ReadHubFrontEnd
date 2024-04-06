import { Outlet, Navigate} from "react-router-dom";
import { useState } from "react";
import {useAuthentication} from "../Authentication/AuthenticationProvider";

export default function ProtectedRoute() {
    const Authentication = useAuthentication()
    return Authentication.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}