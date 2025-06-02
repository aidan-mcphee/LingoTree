import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase_client } from "../components/supabase-client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        supabase_client.auth.getSession().then(({ data: { session } }) => {
            if (session) navigate("/");
        });
    }, [navigate]);

    // check for auth change
    useEffect(() => {
        const { data: { subscription } } = supabase_client.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN") {
                navigate("/");
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [navigate]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded shadow">
                <Auth
                    supabaseClient={supabase_client}
                    appearance={{ theme: ThemeSupa }}
                    providers={["google"]}
                />
            </div>
        </div>
    );
}