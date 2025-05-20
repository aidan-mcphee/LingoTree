// logout from supabase

import { useEffect } from "react";
import { supabase_client } from "../components/supabase-client";
import { useNavigate } from "react-router-dom";


export default function Logout() {
    const Navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            await supabase_client.auth.signOut();
            Navigate("/login");
        };

        logout();
        // Redirect to login page after logout
    }, []);

    return <div>Logging you out...</div>;
}