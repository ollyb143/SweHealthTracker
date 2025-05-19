import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRoute() {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      try {
        const res = await fetch("/api/auth/check", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          toast.error("Your session has expired. Please log in again.");
          navigate("/login", { replace: true });
          return;
        }
      } catch {
        toast.error("Network error. Please log in again.");
        navigate("/login", { replace: true });
        return;
      } finally {
        if (isMounted) setChecking(false);
      }
    }

    checkSession();
    const interval = setInterval(checkSession, 5000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [navigate]);

  if (checking) {
    return <p>Checking session…</p>;
  }
  return <Outlet />;
}
