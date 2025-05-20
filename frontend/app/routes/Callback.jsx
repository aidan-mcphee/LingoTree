import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase_client } from "../components/supabase-client";

export default function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        // Supabase will automatically handle the session from the URL
        // Optionally, you can check if the user is authenticated and redirect
        supabase_client.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                // Session is set, user is logged in
                navigate("/"); // or wherever you want
            } else {
                // Not authenticated, maybe show an error or redirect to login
                navigate("/login");
            }
        });
    }, [navigate]);

    return <div>Signing you in...</div>;
}
