import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase_client } from "../supabase-client";

export default function login() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded shadow">
            <Auth
            supabaseClient={supabase_client}
            appearance={{ theme: ThemeSupa }}
            providers={["google", "github"]}
            />
        </div>
        </div>
    );
}