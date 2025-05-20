// logout from supabase

import { useEffect } from "react";
import { supabase_client } from "../supabase-client";

export default function Logout() {

    useEffect(() => {
        const logout = async () => {
            await supabase_client.auth.signOut();
        };

        logout();
    }, []);

    return <div>Logging you out...</div>;
}