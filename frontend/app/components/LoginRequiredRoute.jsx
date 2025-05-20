// component that checks if the user is logged in and redirects to the login page if not
import { useEffect } from "react";
import { supabase_client } from "./supabase-client";
import { useNavigate } from "react-router-dom";

export default function LoginRequiredRoute({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase_client.auth.getSession();
            if (!session) {
                navigate("/login");
            }
        };

        checkUser();
    }, [navigate]);

    return children;
}