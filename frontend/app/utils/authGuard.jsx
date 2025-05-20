// utils/authGuard.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase_client } from "../components/supabase-client";

export function useLoginRequired() {
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase_client.auth.getSession();
            if (!session) {
                navigate("/login", { replace: true });
            }
        };
        checkUser();
    }, [navigate]);
}
