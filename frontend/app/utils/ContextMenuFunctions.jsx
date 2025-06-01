import { supabase_client } from "../components/supabase-client";

async function getAccessToken() {
    const { data, error } = await supabase_client.auth.getSession();
    if (error || !data.session) {
        throw new Error('User not authenticated');
    }
    return data.session.access_token;
}

export const GenerateChildrenNodes = async (parentId, graph) => {
    try {
        const accessToken = await getAccessToken();

        const response = await fetch(
            'https://xzsuetmvswxiawunyjil.supabase.co/functions/v1/Create-nodes',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ "node_id" : parentId })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Edge function call failed');
        }

        console.log('Edge function response:', result);

        return result;
    } catch (error) {
        console.error('Error calling edge function:', error);
        throw error;
    }
}